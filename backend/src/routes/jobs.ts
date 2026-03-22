import { Router } from "express";
import { db } from "../db";
import { job, jobAlert } from "../db/schema";
import { getUserFromRequest } from "../auth-helpers";
import { eq, ilike, gte, sql, asc, desc, and, or, inArray } from "drizzle-orm";

const router = Router();

// GET /api/jobs
router.get("/", async (req, res) => {
  const { q, type, remote, salary_min, tags, page, limit } = req.query as Record<string, string | undefined>;

  const conditions: any[] = [eq(job.status, "active")];

  if (q) {
    const safeQ = q.replace(/[%_'"\\,().]/g, "");
    if (safeQ.length > 0) {
      conditions.push(
        or(
          ilike(job.title, `%${safeQ}%`),
          ilike(job.company_name, `%${safeQ}%`)
        )
      );
    }
  }

  if (type) {
    conditions.push(eq(job.job_type, type));
  }

  if (remote === "true") {
    conditions.push(ilike(job.location, "%remote%"));
  }

  if (salary_min) {
    const min = parseInt(salary_min);
    if (!isNaN(min)) {
      conditions.push(gte(job.salary_max, min));
    }
  }

  if (tags) {
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (tagList.length > 0) {
      conditions.push(sql`${job.tags} @> ${JSON.stringify(tagList)}::jsonb`);
    }
  }

  const pageSize = Math.min(parseInt(limit || "") || 2000, 2000);
  const pageNum = Math.max(parseInt(page || "") || 1, 1);
  const offset = (pageNum - 1) * pageSize;

  const where = and(...conditions);

  const [data, countResult] = await Promise.all([
    db
      .select()
      .from(job)
      .where(where)
      .orderBy(asc(job.tier), desc(job.posted_at))
      .limit(pageSize)
      .offset(offset),
    db
      .select({ count: sql`count(*)::int` })
      .from(job)
      .where(where),
  ]);

  const count = countResult[0]?.count || 0;
  res.setHeader("X-Total-Count", String(count));
  return res.status(200).json(data || []);
});

// POST /api/jobs
router.post("/", async (req, res) => {
  const payload = getUserFromRequest(req);
  if (!payload) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const {
    title,
    company_name,
    company_logo,
    company_url,
    location,
    salary_min,
    salary_max,
    salary_currency,
    description,
    apply_url,
    tags: jobTags,
    job_type,
    tier,
  } = req.body;

  if (!title || !company_name || !apply_url) {
    return res
      .status(400)
      .json({ error: "Missing required fields: title, company_name, apply_url" });
  }

  const [created] = await db
    .insert(job)
    .values({
      title,
      company_name,
      company_logo: company_logo || null,
      company_url: company_url || null,
      location: location || "Remote",
      salary_min: salary_min || null,
      salary_max: salary_max || null,
      salary_currency: salary_currency || "USD",
      description: description || null,
      apply_url,
      tags: jobTags || [],
      job_type: job_type || "full-time",
      tier: tier || "standard",
      status: "pending",
      posted_by: payload.id,
    })
    .returning();

  return res.status(201).json(created);
});

// POST /api/jobs/alerts
router.post("/alerts", async (req, res) => {
  const { email, filters, label, frequency } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required" });
  }

  if (!label || !filters) {
    return res.status(400).json({ error: "Filters and label required" });
  }

  const freq = frequency === "weekly" ? "weekly" : "daily";

  const [data] = await db
    .insert(jobAlert)
    .values({
      email: email.toLowerCase().trim(),
      filters,
      label,
      frequency: freq,
      active: true,
    })
    .onConflictDoUpdate({
      target: [jobAlert.email, jobAlert.label],
      set: { filters, frequency: freq, active: true },
    })
    .returning();

  return res.status(201).json({ id: data.id, label: data.label });
});

// DELETE /api/jobs/alerts
router.delete("/alerts", async (req, res) => {
  const token = req.query.token as string | undefined;

  if (!token) {
    return res.status(400).json({ error: "Unsubscribe token required" });
  }

  await db
    .update(jobAlert)
    .set({ active: false })
    .where(eq(jobAlert.unsubscribe_token, token));

  return res.status(200).json({ ok: true });
});

// GET /api/jobs/alerts/unsubscribe
router.get("/alerts/unsubscribe", async (req, res) => {
  const token = req.query.token as string | undefined;

  if (!token) {
    return res.status(400).send(unsubPage("Missing token", false));
  }

  const [data] = await db
    .update(jobAlert)
    .set({ active: false })
    .where(eq(jobAlert.unsubscribe_token, token))
    .returning({ email: jobAlert.email });

  if (!data) {
    return res
      .status(200)
      .send(unsubPage("Alert not found or already unsubscribed", false));
  }

  return res.status(200).send(unsubPage(data.email, true));
});

// POST /api/jobs/alerts/send
router.post("/alerts/send", async (req, res) => {
  const auth = req.headers.authorization?.replace("Bearer ", "");
  if (auth !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const now = new Date();
  const log: any = { alerts: 0, emails: 0, errors: [] };

  const alerts = await db
    .select()
    .from(jobAlert)
    .where(eq(jobAlert.active, true));

  if (!alerts.length) {
    return res.status(200).json({ ...log, message: "No active alerts" });
  }

  const isMonday = now.getUTCDay() === 1;
  const dueAlerts = alerts.filter(
    (a) => a.frequency === "daily" || (a.frequency === "weekly" && isMonday)
  );

  if (dueAlerts.length === 0) {
    return res.status(200).json({ ...log, message: "No alerts due" });
  }

  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const recentJobs = await db
    .select()
    .from(job)
    .where(and(eq(job.status, "active"), gte(job.posted_at, new Date(oneWeekAgo))))
    .orderBy(job.posted_at)
    .limit(500);

  if (!recentJobs.length) {
    return res.status(200).json({ ...log, message: "No new jobs" });
  }

  const emailDigests: Record<string, { alerts: any[] }> = {};

  for (const alert of dueAlerts) {
    const cutoff = alert.frequency === "weekly" ? oneWeekAgo : oneDayAgo;
    const sinceLast = alert.last_sent_at || cutoff;
    const sinceDate = new Date(
      Math.max(new Date(sinceLast as any).getTime(), new Date(cutoff).getTime())
    );

    const matched = recentJobs.filter((j) => {
      if (new Date(j.posted_at!) <= sinceDate) return false;
      return matchJobToFilters(j, alert.filters);
    });

    if (matched.length === 0) continue;

    log.alerts++;
    if (!emailDigests[alert.email]) {
      emailDigests[alert.email] = { alerts: [] };
    }
    emailDigests[alert.email].alerts.push({
      id: alert.id,
      label: alert.label,
      frequency: alert.frequency,
      unsubscribe_token: alert.unsubscribe_token,
      jobs: matched.slice(0, 10),
    });
  }

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    return res
      .status(200)
      .json({ ...log, message: "RESEND_API_KEY not set, skipping sends" });
  }

  const BASE_URL = "https://www.blockchainedu.org";

  for (const [email, digest] of Object.entries(emailDigests)) {
    const totalJobs = digest.alerts.reduce((n, a) => n + a.jobs.length, 0);
    const firstToken = digest.alerts[0].unsubscribe_token;

    const html = buildDigestEmail(digest.alerts, BASE_URL, firstToken);
    const subject = `${totalJobs} new Web3 job${totalJobs > 1 ? "s" : ""} matching your alerts`;

    try {
      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_KEY}`,
        },
        body: JSON.stringify({
          from: "BEN Jobs <jobs@blockchainedu.org>",
          to: email,
          subject,
          html,
        }),
      });

      if (resp.ok) {
        log.emails++;
        const alertIds = digest.alerts.map((a) => a.id);
        await db
          .update(jobAlert)
          .set({ last_sent_at: now })
          .where(inArray(jobAlert.id, alertIds));
      } else {
        const err = await resp.text();
        log.errors.push(`${email}: ${err}`);
      }
    } catch (e: any) {
      log.errors.push(`${email}: ${e.message}`);
    }
  }

  return res.status(200).json(log);
});

function matchJobToFilters(j: any, filters: any) {
  if (!filters) return true;
  if (filters.search) {
    const q = filters.search.toLowerCase();
    const searchable =
      `${j.title} ${j.company_name} ${(j.tags || []).join(" ")} ${j.location || ""}`.toLowerCase();
    if (!searchable.includes(q)) return false;
  }
  if (filters.typeFilter) {
    if (j.job_type !== filters.typeFilter) return false;
  }
  if (filters.locationFilter === "remote") {
    if (!(j.location || "").toLowerCase().includes("remote")) return false;
  }
  if (filters.salaryFilter) {
    const max = j.salary_max || j.salary_min || 0;
    if (max < filters.salaryFilter) return false;
  }
  if (filters.tagFilter) {
    if (
      !(j.tags || []).some(
        (t: string) => t.toLowerCase() === filters.tagFilter.toLowerCase()
      )
    )
      return false;
  }
  return true;
}

function escHtml(str: string) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function unsubPage(emailOrMsg: string, success: boolean) {
  return `<!DOCTYPE html><html><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Unsubscribe - BEN Jobs</title>
<style>
  body { font-family: Inter, -apple-system, sans-serif; background: #f8f8fa; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
  .card { background: #fff; border-radius: 20px; padding: 48px; text-align: center; max-width: 400px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
  h1 { font-family: Montserrat, sans-serif; font-size: 22px; color: #1d1d1f; margin: 0 0 12px; }
  p { font-size: 15px; color: #86868b; line-height: 1.6; margin: 0 0 24px; }
  a { display: inline-block; padding: 12px 28px; background: #FF872A; color: #fff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 14px; }
</style></head><body>
<div class="card">
  <h1>${success ? "Unsubscribed" : "Oops"}</h1>
  <p>${
    success
      ? `Job alerts for <strong>${emailOrMsg}</strong> have been turned off. You won't receive any more emails.`
      : emailOrMsg
  }</p>
  <a href="/jobs">Browse Jobs</a>
</div>
</body></html>`;
}

function buildDigestEmail(alerts: any[], baseUrl: string, unsubToken: string) {
  const formatSalary = (min: number, max: number) => {
    if (!min && !max) return null;
    const fmt = (n: number) => (n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n}`);
    if (min && max) return `${fmt(min)} - ${fmt(max)}`;
    if (min) return `${fmt(min)}+`;
    return `Up to ${fmt(max)}`;
  };

  let jobRows = "";
  for (const alert of alerts) {
    jobRows += `
      <tr><td style="padding:20px 0 8px;font-family:'Montserrat',Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;color:#FF872A;border-bottom:1px solid #f0f0f0;">
        ${escHtml(alert.label)} (${alert.jobs.length} new)
      </td></tr>
    `;
    for (const j of alert.jobs) {
      const salary = formatSalary(j.salary_min, j.salary_max);
      jobRows += `
        <tr><td style="padding:16px 0;border-bottom:1px solid #f5f5f5;">
          <a href="${baseUrl}/jobs?post=false" style="text-decoration:none;">
            <div style="font-family:'Montserrat',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;color:#1d1d1f;line-height:1.3;">
              ${escHtml(j.title)}
            </div>
          </a>
          <div style="font-family:'Inter',Helvetica,Arial,sans-serif;font-size:14px;color:#424245;margin-top:4px;">
            ${escHtml(j.company_name)}
            <span style="color:#c7c7cc;margin:0 6px;">·</span>
            ${escHtml(j.location || "Remote")}
            ${salary ? `<span style="color:#c7c7cc;margin:0 6px;">·</span><strong style="color:#1d1d1f;">${salary}</strong>` : ""}
          </div>
          ${
            (j.tags || []).length > 0
              ? `<div style="margin-top:8px;">
              ${j.tags
                .slice(0, 4)
                .map(
                  (t: string) =>
                    `<span style="display:inline-block;font-family:'Inter',sans-serif;font-size:11px;padding:3px 10px;background:#f5f5f5;color:#86868b;border-radius:20px;margin-right:4px;">${escHtml(t)}</span>`
                )
                .join("")}
            </div>`
              : ""
          }
          <a href="${escHtml(j.apply_url)}" style="display:inline-block;margin-top:10px;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#FF872A;text-decoration:none;">
            Apply now &#8594;
          </a>
        </td></tr>
      `;
    }
  }

  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@700;800&display=swap');</style>
</head><body style="margin:0;padding:0;background-color:#f8f8fa;-webkit-font-smoothing:antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f8fa;padding:32px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
  <tr><td style="background:linear-gradient(135deg,#1a1b20,#202127);padding:32px 28px;">
    <div style="font-family:'Montserrat',Helvetica,Arial,sans-serif;font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.02em;">
      BEN <span style="color:#FF872A;">Jobs</span>
    </div>
    <div style="font-family:'Inter',Helvetica,Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.5);margin-top:6px;">
      New jobs matching your saved searches
    </div>
  </td></tr>
  <tr><td style="padding:0 28px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      ${jobRows}
    </table>
  </td></tr>
  <tr><td style="padding:28px;">
    <a href="${baseUrl}/jobs" style="display:block;text-align:center;font-family:'Inter',sans-serif;font-size:15px;font-weight:600;color:#fff;background:#FF872A;padding:14px 24px;border-radius:12px;text-decoration:none;">
      Browse all jobs on BEN
    </a>
  </td></tr>
  <tr><td style="padding:20px 28px 28px;border-top:1px solid #f0f0f0;">
    <div style="font-family:'Inter',sans-serif;font-size:12px;color:#c7c7cc;text-align:center;">
      You're receiving this because you set up a job alert on BEN.<br>
      <a href="${baseUrl}/api/jobs/alerts/unsubscribe?token=${unsubToken}" style="color:#86868b;text-decoration:underline;">Unsubscribe</a>
      <span style="margin:0 6px;">·</span>
      <a href="${baseUrl}/jobs" style="color:#86868b;text-decoration:underline;">Manage alerts</a>
    </div>
  </td></tr>
</table>
</td></tr></table>
</body></html>
  `.trim();
}

export default router;
