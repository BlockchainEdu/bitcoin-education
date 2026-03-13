// ─── Job Ingestion Engine ───────────────────────────────
// Fetches jobs from ATS APIs + RSS feeds, deduplicates, upserts into Supabase.
// Designed for serverless (Vercel cron) — no VPS, no Redis, no SQLite.

import { createClient } from "@supabase/supabase-js";
import {
  GREENHOUSE_BOARDS,
  LEVER_BOARDS,
  ASHBY_BOARDS,
  RSS_FEEDS,
  JSON_APIS,
  isCryptoRelevant,
} from "../content/job-sources";

const supabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

// ─── Concurrency limiter ────────────────────────────────
function pLimit(concurrency) {
  let active = 0;
  const queue = [];
  const next = () => {
    if (active < concurrency && queue.length > 0) {
      active++;
      const { fn, resolve, reject } = queue.shift();
      fn().then(resolve, reject).finally(() => { active--; next(); });
    }
  };
  return (fn) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      next();
    });
}

// ─── Fetch with timeout + retry ─────────────────────────
async function fetchWithRetry(url, options = {}, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) {
        if (res.status === 429 && i < retries) {
          await new Promise((r) => setTimeout(r, 5000 * (i + 1)));
          continue;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      return res;
    } catch (err) {
      if (i === retries) return null;
      await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
    }
  }
  return null;
}

// ─── Greenhouse fetcher ─────────────────────────────────
async function fetchGreenhouseJobs(board) {
  const url = `https://boards-api.greenhouse.io/v1/boards/${board.token}/jobs?content=true`;
  const res = await fetchWithRetry(url);
  if (!res) return [];

  const data = await res.json();
  const jobs = data.jobs || [];

  return jobs.map((job) => ({
    title: job.title,
    company_name: board.company,
    company_url: `https://boards.greenhouse.io/${board.token}`,
    location: job.location?.name || "Remote",
    description: stripHtml(job.content || ""),
    apply_url: job.absolute_url,
    tags: extractTags(job.title, job.content || ""),
    job_type: inferJobType(job.title),
    posted_at: job.updated_at,
    source: "greenhouse",
  }));
}

// ─── Lever fetcher ──────────────────────────────────────
async function fetchLeverJobs(board) {
  const url = `https://api.lever.co/v0/postings/${board.token}?mode=json`;
  const res = await fetchWithRetry(url);
  if (!res) return [];

  const jobs = await res.json();
  if (!Array.isArray(jobs)) return [];

  return jobs.map((job) => ({
    title: job.text,
    company_name: board.company,
    company_url: `https://jobs.lever.co/${board.token}`,
    location: job.categories?.location || "Remote",
    description: stripHtml(job.descriptionPlain || job.description || ""),
    apply_url: job.hostedUrl || job.applyUrl,
    tags: extractTags(job.text, job.descriptionPlain || ""),
    job_type: mapCommitment(job.categories?.commitment),
    salary_min: job.salaryRange?.min || null,
    salary_max: job.salaryRange?.max || null,
    salary_currency: job.salaryRange?.currency || "USD",
    posted_at: job.createdAt ? new Date(job.createdAt).toISOString() : new Date().toISOString(),
    source: "lever",
  }));
}

// ─── Ashby fetcher ──────────────────────────────────────
async function fetchAshbyJobs(board) {
  const url = `https://api.ashbyhq.com/posting-api/job-board/${board.token}?includeCompensation=true`;
  const res = await fetchWithRetry(url);
  if (!res) return [];

  const data = await res.json();
  const jobs = data.jobs || [];

  return jobs.map((job) => ({
    title: job.title,
    company_name: board.company,
    company_url: null,
    location: job.location || (job.isRemote ? "Remote" : "On-site"),
    description: stripHtml(job.descriptionHtml || job.descriptionPlain || ""),
    apply_url: job.jobUrl || job.applyUrl,
    tags: extractTags(job.title, job.descriptionHtml || ""),
    job_type: job.employmentType?.toLowerCase() || "full-time",
    salary_min: parseCompensation(job.compensationTierSummary, "min"),
    salary_max: parseCompensation(job.compensationTierSummary, "max"),
    posted_at: job.publishedAt || new Date().toISOString(),
    source: "ashby",
  }));
}

// ─── RSS fetcher ────────────────────────────────────────
async function fetchRSSJobs(feed) {
  const res = await fetchWithRetry(feed.url);
  if (!res) return [];

  const xml = await res.text();
  // Simple RSS parser — no npm dependency needed in serverless
  const items = parseRSSItems(xml);

  return items
    .filter((item) => {
      // For general boards, filter to crypto-relevant
      if (feed.source === "RemoteOK") {
        return isCryptoRelevant(item.title || "", item.description || "");
      }
      return true;
    })
    .map((item) => ({
      title: item.title || "",
      company_name: item.company || extractCompanyFromTitle(item.title) || feed.source,
      company_url: null,
      location: item.location || "Remote",
      description: stripHtml(item.description || item.content || ""),
      apply_url: item.link || item.guid,
      tags: extractTags(item.title || "", item.description || ""),
      job_type: "full-time",
      posted_at: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
      source: feed.source.toLowerCase(),
    }));
}

// ─── JSON API fetcher (RemoteOK, Jobicy) ────────────────
async function fetchJSONApiJobs(api) {
  const res = await fetchWithRetry(api.url, {
    headers: { "User-Agent": "BEN-JobBoard/1.0" },
  });
  if (!res) return [];

  const data = await res.json();
  let jobs = api.dataPath ? data[api.dataPath] : data;
  if (!Array.isArray(jobs)) return [];
  if (api.skipFirst) jobs = jobs.slice(1);

  return jobs
    .filter((job) => {
      if (api.source === "RemoteOK") {
        return isCryptoRelevant(
          job.position || "",
          job.description || ""
        );
      }
      return true;
    })
    .map((job) => {
      if (api.source === "RemoteOK") {
        return {
          title: job.position || "",
          company_name: job.company || "Unknown",
          company_logo: job.company_logo || null,
          company_url: job.company_url || null,
          location: job.location || "Remote",
          description: stripHtml(job.description || ""),
          apply_url: job.url || job.apply_url,
          tags: (job.tags || []).slice(0, 5),
          job_type: "full-time",
          salary_min: job.salary_min || null,
          salary_max: job.salary_max || null,
          posted_at: job.date ? new Date(job.date).toISOString() : new Date().toISOString(),
          source: "remoteok",
        };
      }
      // Jobicy format
      return {
        title: job.jobTitle || "",
        company_name: job.companyName || "Unknown",
        company_logo: job.companyLogo || null,
        company_url: null,
        location: job.jobGeo || "Remote",
        description: stripHtml(job.jobDescription || job.jobExcerpt || ""),
        apply_url: job.url,
        tags: extractTags(job.jobTitle || "", job.jobDescription || ""),
        job_type: (job.jobType || ["full-time"])[0]?.toLowerCase() || "full-time",
        salary_min: parseSalaryString(job.annualSalaryMin),
        salary_max: parseSalaryString(job.annualSalaryMax),
        posted_at: job.pubDate ? new Date(job.pubDate).toISOString() : new Date().toISOString(),
        source: "jobicy",
      };
    });
}

// ─── Main ingestion orchestrator ────────────────────────
export async function ingestAllJobs() {
  const limit = pLimit(5); // 5 concurrent fetches
  const log = { sources: {}, total: 0, inserted: 0, skipped: 0, errors: [] };
  const allJobs = [];

  // Fetch from all sources in parallel (with concurrency limit)
  const tasks = [
    // Greenhouse — highest value
    ...GREENHOUSE_BOARDS.map((board) =>
      limit(async () => {
        try {
          const jobs = await fetchGreenhouseJobs(board);
          log.sources[`greenhouse:${board.token}`] = jobs.length;
          return jobs;
        } catch (e) {
          log.errors.push(`greenhouse:${board.token}: ${e.message}`);
          return [];
        }
      })
    ),
    // Lever
    ...LEVER_BOARDS.map((board) =>
      limit(async () => {
        try {
          const jobs = await fetchLeverJobs(board);
          log.sources[`lever:${board.token}`] = jobs.length;
          return jobs;
        } catch (e) {
          log.errors.push(`lever:${board.token}: ${e.message}`);
          return [];
        }
      })
    ),
    // Ashby
    ...ASHBY_BOARDS.map((board) =>
      limit(async () => {
        try {
          const jobs = await fetchAshbyJobs(board);
          log.sources[`ashby:${board.token}`] = jobs.length;
          return jobs;
        } catch (e) {
          log.errors.push(`ashby:${board.token}: ${e.message}`);
          return [];
        }
      })
    ),
    // RSS feeds
    ...RSS_FEEDS.map((feed) =>
      limit(async () => {
        try {
          const jobs = await fetchRSSJobs(feed);
          log.sources[`rss:${feed.source}`] = jobs.length;
          return jobs;
        } catch (e) {
          log.errors.push(`rss:${feed.source}: ${e.message}`);
          return [];
        }
      })
    ),
    // JSON APIs
    ...JSON_APIS.map((api) =>
      limit(async () => {
        try {
          const jobs = await fetchJSONApiJobs(api);
          log.sources[`api:${api.source}`] = jobs.length;
          return jobs;
        } catch (e) {
          log.errors.push(`api:${api.source}: ${e.message}`);
          return [];
        }
      })
    ),
  ];

  const results = await Promise.all(tasks);
  results.forEach((jobs) => allJobs.push(...jobs));
  log.total = allJobs.length;

  // Deduplicate by apply_url
  const seen = new Set();
  const uniqueJobs = [];
  for (const job of allJobs) {
    if (!job.apply_url || !job.title) continue;
    const key = job.apply_url.toLowerCase().replace(/\/$/, "");
    if (seen.has(key)) continue;
    seen.add(key);
    uniqueJobs.push(job);
  }

  // Secondary dedup by title+company (catches same job from multiple sources)
  const titleSeen = new Set();
  const dedupedJobs = [];
  for (const job of uniqueJobs) {
    const titleKey = `${job.company_name}::${job.title}`.toLowerCase().trim();
    if (titleSeen.has(titleKey)) continue;
    titleSeen.add(titleKey);
    dedupedJobs.push(job);
  }

  log.afterDedup = dedupedJobs.length;

  // Get existing jobs from Supabase to separate new vs seen
  const db = supabase();
  const { data: existing } = await db
    .from("jobs")
    .select("id, apply_url")
    .in("status", ["active", "pending"]);

  const existingMap = new Map(
    (existing || []).map((j) => [j.apply_url?.toLowerCase().replace(/\/$/, ""), j.id])
  );

  const newJobs = [];
  const seenIds = []; // IDs of existing jobs still present in sources

  for (const j of dedupedJobs) {
    const key = j.apply_url.toLowerCase().replace(/\/$/, "");
    if (existingMap.has(key)) {
      seenIds.push(existingMap.get(key));
    } else {
      newJobs.push(j);
    }
  }

  log.new = newJobs.length;
  log.refreshed = seenIds.length;

  // Refresh expires_at on existing jobs still present in sources (heartbeat)
  // Push forward 7 days — jobs removed from source stop getting refreshed
  // and the daily pg_cron expire check catches them
  if (seenIds.length > 0) {
    const BATCH = 100;
    const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    for (let i = 0; i < seenIds.length; i += BATCH) {
      const batch = seenIds.slice(i, i + BATCH);
      await db
        .from("jobs")
        .update({ expires_at: newExpiry })
        .in("id", batch)
        .is("stripe_subscription_id", null); // Never touch paid listings
    }
  }

  // Insert new jobs in batches of 50
  if (newJobs.length > 0) {
    const BATCH = 50;
    const defaultExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    for (let i = 0; i < newJobs.length; i += BATCH) {
      const batch = newJobs.slice(i, i + BATCH).map((job) => ({
        title: job.title.slice(0, 200),
        company_name: job.company_name.slice(0, 100),
        company_logo: job.company_logo || null,
        company_url: job.company_url || null,
        location: (job.location || "Remote").slice(0, 100),
        description: (job.description || "").slice(0, 5000),
        apply_url: job.apply_url,
        tags: (job.tags || []).slice(0, 5),
        job_type: job.job_type || "full-time",
        salary_min: job.salary_min || null,
        salary_max: job.salary_max || null,
        salary_currency: job.salary_currency || "USD",
        tier: "standard",
        status: "active",
        posted_at: job.posted_at || new Date().toISOString(),
        expires_at: defaultExpiry,
      }));

      const { error } = await db.from("jobs").insert(batch);
      if (error) {
        log.errors.push(`insert batch ${i}: ${error.message}`);
      } else {
        log.inserted += batch.length;
      }
    }
  }

  log.skipped = log.afterDedup - log.new;

  // Backfill: set expires_at on any active jobs that still have null
  // (from before the heartbeat system was added)
  const backfillExpiry = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
  await db
    .from("jobs")
    .update({ expires_at: backfillExpiry })
    .eq("status", "active")
    .is("stripe_subscription_id", null)
    .is("expires_at", null);

  return log;
}

// ─── Helper functions ───────────────────────────────────

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const TAG_KEYWORDS = {
  Solidity: /\bsolidity\b/i,
  Rust: /\brust\b/i,
  TypeScript: /\btypescript\b/i,
  Python: /\bpython\b/i,
  Go: /\bgo(lang)?\b/i,
  React: /\breact\b/i,
  "Node.js": /\bnode\.?js\b/i,
  DeFi: /\bdefi\b/i,
  NFT: /\bnft\b/i,
  Ethereum: /\bethereum\b/i,
  Bitcoin: /\bbitcoin\b/i,
  Solana: /\bsolana\b/i,
  "Smart Contracts": /\bsmart\s*contracts?\b/i,
  Web3: /\bweb3\b/i,
  Security: /\bsecurity\b|audit/i,
  "Layer 2": /\b(layer\s*2|l2|rollup)\b/i,
  "AI/ML": /\b(ai|machine learning|ml)\b/i,
  DevOps: /\b(devops|sre|infrastructure)\b/i,
  Frontend: /\bfrontend|front-end\b/i,
  Backend: /\bbackend|back-end\b/i,
  "Full Stack": /\bfull[\s-]stack\b/i,
  Mobile: /\b(mobile|ios|android)\b/i,
  Data: /\bdata\s*(engineer|scien|analy)/i,
  Protocol: /\bprotocol\b/i,
  DAO: /\bdao\b/i,
  Tokenomics: /\btokenomics?\b/i,
};

function extractTags(title, description) {
  const text = `${title} ${description}`;
  const tags = [];
  for (const [tag, regex] of Object.entries(TAG_KEYWORDS)) {
    if (regex.test(text)) tags.push(tag);
    if (tags.length >= 5) break;
  }
  return tags;
}

function inferJobType(title) {
  const t = title.toLowerCase();
  if (/\bintern\b/.test(t)) return "internship";
  if (/\bcontract\b|\bfreelance\b/.test(t)) return "contract";
  if (/\bpart[\s-]time\b/.test(t)) return "part-time";
  return "full-time";
}

function mapCommitment(commitment) {
  if (!commitment) return "full-time";
  const c = commitment.toLowerCase();
  if (c.includes("intern")) return "internship";
  if (c.includes("contract")) return "contract";
  if (c.includes("part")) return "part-time";
  return "full-time";
}

function parseCompensation(summary, which) {
  if (!summary) return null;
  // Formats: "$81K – $87K", "$150,000 - $200,000"
  const matches = summary.match(/\$[\d,.]+[Kk]?/g);
  if (!matches || matches.length === 0) return null;
  const parse = (s) => {
    let n = parseFloat(s.replace(/[$,]/g, ""));
    if (/[Kk]/.test(s)) n *= 1000;
    return Math.round(n);
  };
  if (which === "min") return parse(matches[0]);
  if (which === "max" && matches.length > 1) return parse(matches[1]);
  if (which === "max") return parse(matches[0]);
  return null;
}

function parseSalaryString(str) {
  if (!str) return null;
  const n = parseInt(str.replace(/[^0-9]/g, ""));
  return isNaN(n) ? null : n;
}

// Minimal RSS parser (avoids npm dependency in serverless)
function parseRSSItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const get = (tag) => {
      const m = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
      return m ? (m[1] || m[2] || "").trim() : "";
    };
    items.push({
      title: get("title"),
      link: get("link"),
      guid: get("guid"),
      description: get("description"),
      content: get("content:encoded") || get("content"),
      pubDate: get("pubDate"),
      company: get("dc:creator") || get("company") || get("author") || get("source"),
      location: get("location") || get("region"),
    });
  }
  return items;
}

function extractCompanyFromTitle(title) {
  // Only match "Job Title at Company" — the "at" pattern is reliable.
  // Avoid matching dashes/dots as they're often part of the job title itself.
  const match = title?.match(/\bat\s+([A-Z][A-Za-z0-9\s.&]+)$/);
  return match ? match[1].trim() : null;
}
