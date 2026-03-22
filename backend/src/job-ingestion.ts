// Job Ingestion Engine — fetches jobs from ATS APIs + RSS feeds, deduplicates, upserts into DB.

import { db } from "./db";
import { job } from "./db/schema";
import { inArray, eq, isNull, and } from "drizzle-orm";
import {
  GREENHOUSE_BOARDS,
  LEVER_BOARDS,
  ASHBY_BOARDS,
  RSS_FEEDS,
  JSON_APIS,
  isCryptoRelevant,
} from "./job-sources";

// Concurrency limiter
function pLimit(concurrency: number) {
  let active = 0;
  const queue: any[] = [];
  const next = () => {
    if (active < concurrency && queue.length > 0) {
      active++;
      const { fn, resolve, reject } = queue.shift();
      fn().then(resolve, reject).finally(() => { active--; next(); });
    }
  };
  return (fn: () => Promise<any>) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      next();
    });
}

async function fetchWithRetry(url: string, options: any = {}, retries = 2) {
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

async function fetchGreenhouseJobs(board: any) {
  const url = `https://boards-api.greenhouse.io/v1/boards/${board.token}/jobs?content=true`;
  const res = await fetchWithRetry(url);
  if (!res) return [];
  const data = await res.json();
  return (data.jobs || []).map((j: any) => ({
    title: j.title,
    company_name: board.company,
    company_url: `https://boards.greenhouse.io/${board.token}`,
    location: j.location?.name || "Remote",
    description: stripHtml(j.content || ""),
    apply_url: j.absolute_url,
    tags: extractTags(j.title, j.content || ""),
    job_type: inferJobType(j.title),
    posted_at: j.updated_at,
    source: "greenhouse",
  }));
}

async function fetchLeverJobs(board: any) {
  const url = `https://api.lever.co/v0/postings/${board.token}?mode=json`;
  const res = await fetchWithRetry(url);
  if (!res) return [];
  const jobs = await res.json();
  if (!Array.isArray(jobs)) return [];
  return jobs.map((j: any) => ({
    title: j.text,
    company_name: board.company,
    company_url: `https://jobs.lever.co/${board.token}`,
    location: j.categories?.location || "Remote",
    description: stripHtml(j.descriptionPlain || j.description || ""),
    apply_url: j.hostedUrl || j.applyUrl,
    tags: extractTags(j.text, j.descriptionPlain || ""),
    job_type: mapCommitment(j.categories?.commitment),
    salary_min: j.salaryRange?.min || null,
    salary_max: j.salaryRange?.max || null,
    salary_currency: j.salaryRange?.currency || "USD",
    posted_at: j.createdAt ? new Date(j.createdAt).toISOString() : new Date().toISOString(),
    source: "lever",
  }));
}

async function fetchAshbyJobs(board: any) {
  const url = `https://api.ashbyhq.com/posting-api/job-board/${board.token}?includeCompensation=true`;
  const res = await fetchWithRetry(url);
  if (!res) return [];
  const data = await res.json();
  return (data.jobs || []).map((j: any) => ({
    title: j.title,
    company_name: board.company,
    company_url: null,
    location: j.location || (j.isRemote ? "Remote" : "On-site"),
    description: stripHtml(j.descriptionHtml || j.descriptionPlain || ""),
    apply_url: j.jobUrl || j.applyUrl,
    tags: extractTags(j.title, j.descriptionHtml || ""),
    job_type: j.employmentType?.toLowerCase() || "full-time",
    salary_min: parseCompensation(j.compensationTierSummary, "min"),
    salary_max: parseCompensation(j.compensationTierSummary, "max"),
    posted_at: j.publishedAt || new Date().toISOString(),
    source: "ashby",
  }));
}

async function fetchRSSJobs(feed: any) {
  const res = await fetchWithRetry(feed.url);
  if (!res) return [];
  const xml = await res.text();
  const items = parseRSSItems(xml);
  return items
    .filter((item: any) => {
      if (feed.source === "RemoteOK") {
        return isCryptoRelevant(item.title || "", item.description || "");
      }
      return true;
    })
    .map((item: any) => ({
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

async function fetchJSONApiJobs(api: any) {
  const res = await fetchWithRetry(api.url, {
    headers: { "User-Agent": "BEN-JobBoard/1.0" },
  });
  if (!res) return [];
  const data = await res.json();
  let jobs = api.dataPath ? data[api.dataPath] : data;
  if (!Array.isArray(jobs)) return [];
  if (api.skipFirst) jobs = jobs.slice(1);
  return jobs
    .filter((j: any) => {
      if (api.source === "RemoteOK") {
        return isCryptoRelevant(j.position || "", j.description || "");
      }
      return true;
    })
    .map((j: any) => {
      if (api.source === "RemoteOK") {
        return {
          title: j.position || "",
          company_name: j.company || "Unknown",
          company_logo: j.company_logo || null,
          company_url: j.company_url || null,
          location: j.location || "Remote",
          description: stripHtml(j.description || ""),
          apply_url: j.url || j.apply_url,
          tags: (j.tags || []).slice(0, 5),
          job_type: "full-time",
          salary_min: j.salary_min || null,
          salary_max: j.salary_max || null,
          posted_at: j.date ? new Date(j.date).toISOString() : new Date().toISOString(),
          source: "remoteok",
        };
      }
      return {
        title: j.jobTitle || "",
        company_name: j.companyName || "Unknown",
        company_logo: j.companyLogo || null,
        company_url: null,
        location: j.jobGeo || "Remote",
        description: stripHtml(j.jobDescription || j.jobExcerpt || ""),
        apply_url: j.url,
        tags: extractTags(j.jobTitle || "", j.jobDescription || ""),
        job_type: (j.jobType || ["full-time"])[0]?.toLowerCase() || "full-time",
        salary_min: parseSalaryString(j.annualSalaryMin),
        salary_max: parseSalaryString(j.annualSalaryMax),
        posted_at: j.pubDate ? new Date(j.pubDate).toISOString() : new Date().toISOString(),
        source: "jobicy",
      };
    });
}

export async function ingestAllJobs() {
  const limit = pLimit(5);
  const log: any = { sources: {}, total: 0, inserted: 0, skipped: 0, errors: [] };
  const allJobs: any[] = [];

  const tasks = [
    ...GREENHOUSE_BOARDS.map((board: any) =>
      limit(async () => {
        try {
          const jobs = await fetchGreenhouseJobs(board);
          log.sources[`greenhouse:${board.token}`] = jobs.length;
          return jobs;
        } catch (e: any) {
          log.errors.push(`greenhouse:${board.token}: ${e.message}`);
          return [];
        }
      })
    ),
    ...LEVER_BOARDS.map((board: any) =>
      limit(async () => {
        try {
          const jobs = await fetchLeverJobs(board);
          log.sources[`lever:${board.token}`] = jobs.length;
          return jobs;
        } catch (e: any) {
          log.errors.push(`lever:${board.token}: ${e.message}`);
          return [];
        }
      })
    ),
    ...ASHBY_BOARDS.map((board: any) =>
      limit(async () => {
        try {
          const jobs = await fetchAshbyJobs(board);
          log.sources[`ashby:${board.token}`] = jobs.length;
          return jobs;
        } catch (e: any) {
          log.errors.push(`ashby:${board.token}: ${e.message}`);
          return [];
        }
      })
    ),
    ...RSS_FEEDS.map((feed: any) =>
      limit(async () => {
        try {
          const jobs = await fetchRSSJobs(feed);
          log.sources[`rss:${feed.source}`] = jobs.length;
          return jobs;
        } catch (e: any) {
          log.errors.push(`rss:${feed.source}: ${e.message}`);
          return [];
        }
      })
    ),
    ...JSON_APIS.map((api: any) =>
      limit(async () => {
        try {
          const jobs = await fetchJSONApiJobs(api);
          log.sources[`api:${api.source}`] = jobs.length;
          return jobs;
        } catch (e: any) {
          log.errors.push(`api:${api.source}: ${e.message}`);
          return [];
        }
      })
    ),
  ];

  const results = await Promise.all(tasks) as any[][];
  results.forEach((jobs) => allJobs.push(...jobs));
  log.total = allJobs.length;

  const seen = new Set();
  const uniqueJobs: any[] = [];
  for (const j of allJobs) {
    if (!j.apply_url || !j.title) continue;
    const key = j.apply_url.toLowerCase().replace(/\/$/, "");
    if (seen.has(key)) continue;
    seen.add(key);
    uniqueJobs.push(j);
  }

  const titleSeen = new Set();
  const dedupedJobs: any[] = [];
  for (const j of uniqueJobs) {
    const titleKey = `${j.company_name}::${j.title}`.toLowerCase().trim();
    if (titleSeen.has(titleKey)) continue;
    titleSeen.add(titleKey);
    dedupedJobs.push(j);
  }

  log.afterDedup = dedupedJobs.length;

  const existing = await db
    .select({ id: job.id, apply_url: job.apply_url })
    .from(job)
    .where(inArray(job.status, ["active", "pending"]));

  const existingMap = new Map(
    (existing || []).map((j) => [j.apply_url?.toLowerCase().replace(/\/$/, ""), j.id])
  );

  const newJobs: any[] = [];
  const seenIds: string[] = [];

  for (const j of dedupedJobs) {
    const key = j.apply_url.toLowerCase().replace(/\/$/, "");
    if (existingMap.has(key)) {
      seenIds.push(existingMap.get(key)!);
    } else {
      newJobs.push(j);
    }
  }

  log.new = newJobs.length;
  log.refreshed = seenIds.length;

  if (seenIds.length > 0) {
    const BATCH = 100;
    const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    for (let i = 0; i < seenIds.length; i += BATCH) {
      const batch = seenIds.slice(i, i + BATCH);
      await db
        .update(job)
        .set({ expires_at: newExpiry })
        .where(and(inArray(job.id, batch), isNull(job.stripe_subscription_id)));
    }
  }

  if (newJobs.length > 0) {
    const BATCH = 50;
    const defaultExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    for (let i = 0; i < newJobs.length; i += BATCH) {
      const batch = newJobs.slice(i, i + BATCH).map((j) => ({
        title: j.title.slice(0, 200),
        company_name: j.company_name.slice(0, 100),
        company_logo: j.company_logo || null,
        company_url: j.company_url || null,
        location: (j.location || "Remote").slice(0, 100),
        description: (j.description || "").slice(0, 5000),
        apply_url: j.apply_url,
        tags: (j.tags || []).slice(0, 5),
        job_type: j.job_type || "full-time",
        salary_min: j.salary_min || null,
        salary_max: j.salary_max || null,
        salary_currency: j.salary_currency || "USD",
        tier: "standard",
        status: "active",
        posted_at: j.posted_at ? new Date(j.posted_at) : new Date(),
        expires_at: defaultExpiry,
      }));

      try {
        await db.insert(job).values(batch);
        log.inserted += batch.length;
      } catch (error: any) {
        log.errors.push(`insert batch ${i}: ${error.message}`);
      }
    }
  }

  log.skipped = log.afterDedup - log.new;

  const backfillExpiry = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  await db
    .update(job)
    .set({ expires_at: backfillExpiry })
    .where(
      and(
        eq(job.status, "active"),
        isNull(job.stripe_subscription_id),
        isNull(job.expires_at)
      )
    );

  return log;
}

function stripHtml(html: string) {
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

const TAG_KEYWORDS: Record<string, RegExp> = {
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

function extractTags(title: string, description: string) {
  const text = `${title} ${description}`;
  const tags: string[] = [];
  for (const [tag, regex] of Object.entries(TAG_KEYWORDS)) {
    if (regex.test(text)) tags.push(tag);
    if (tags.length >= 5) break;
  }
  return tags;
}

function inferJobType(title: string) {
  const t = title.toLowerCase();
  if (/\bintern\b/.test(t)) return "internship";
  if (/\bcontract\b|\bfreelance\b/.test(t)) return "contract";
  if (/\bpart[\s-]time\b/.test(t)) return "part-time";
  return "full-time";
}

function mapCommitment(commitment: string | undefined) {
  if (!commitment) return "full-time";
  const c = commitment.toLowerCase();
  if (c.includes("intern")) return "internship";
  if (c.includes("contract")) return "contract";
  if (c.includes("part")) return "part-time";
  return "full-time";
}

function parseCompensation(summary: string | undefined, which: string) {
  if (!summary) return null;
  const matches = summary.match(/\$[\d,.]+[Kk]?/g);
  if (!matches || matches.length === 0) return null;
  const parse = (s: string) => {
    let n = parseFloat(s.replace(/[$,]/g, ""));
    if (/[Kk]/.test(s)) n *= 1000;
    return Math.round(n);
  };
  if (which === "min") return parse(matches[0]);
  if (which === "max" && matches.length > 1) return parse(matches[1]);
  if (which === "max") return parse(matches[0]);
  return null;
}

function parseSalaryString(str: string | undefined) {
  if (!str) return null;
  const n = parseInt(str.replace(/[^0-9]/g, ""));
  return isNaN(n) ? null : n;
}

function parseRSSItems(xml: string) {
  const items: any[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const get = (tag: string) => {
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

function extractCompanyFromTitle(title: string | undefined) {
  const match = title?.match(/\bat\s+([A-Z][A-Za-z0-9\s.&]+)$/);
  return match ? match[1].trim() : null;
}
