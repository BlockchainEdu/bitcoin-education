import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  // Verify cron secret
  const auth = req.headers.authorization?.replace("Bearer ", "");
  if (auth !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const supabase = supabaseAdmin();
  const now = new Date();
  const log = { alerts: 0, emails: 0, errors: [] };

  // 1. Get all active alerts
  const { data: alerts, error: alertErr } = await supabase
    .from("job_alerts")
    .select("*")
    .eq("active", true);

  if (alertErr || !alerts?.length) {
    return res.status(200).json({ ...log, message: "No active alerts" });
  }

  // Filter by frequency: daily alerts always, weekly only on Mondays
  const isMonday = now.getUTCDay() === 1;
  const dueAlerts = alerts.filter(
    (a) => a.frequency === "daily" || (a.frequency === "weekly" && isMonday)
  );

  if (dueAlerts.length === 0) {
    return res.status(200).json({ ...log, message: "No alerts due" });
  }

  // 2. Get jobs posted in last 24h (for daily) / 7 days (for weekly)
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000).toISOString();
  const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data: recentJobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "active")
    .gte("posted_at", oneWeekAgo)
    .order("posted_at", { ascending: false })
    .limit(500);

  if (!recentJobs?.length) {
    return res.status(200).json({ ...log, message: "No new jobs" });
  }

  // 3. Match jobs to each alert's filters
  const emailDigests = {}; // email -> { alerts: [{ label, jobs }] }

  for (const alert of dueAlerts) {
    const cutoff = alert.frequency === "weekly" ? oneWeekAgo : oneDayAgo;
    const sinceLast = alert.last_sent_at || cutoff;
    const sinceDate = new Date(Math.max(new Date(sinceLast), new Date(cutoff)));

    const matched = recentJobs.filter((job) => {
      if (new Date(job.posted_at) <= sinceDate) return false;
      return matchJobToFilters(job, alert.filters);
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
      jobs: matched.slice(0, 10), // Cap at 10 per alert
    });
  }

  // 4. Send digest emails
  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    return res.status(200).json({ ...log, message: "RESEND_API_KEY not set, skipping sends" });
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
        // Update last_sent_at for all alerts we included
        const alertIds = digest.alerts.map((a) => a.id);
        await supabase
          .from("job_alerts")
          .update({ last_sent_at: now.toISOString() })
          .in("id", alertIds);
      } else {
        const err = await resp.text();
        log.errors.push(`${email}: ${err}`);
      }
    } catch (e) {
      log.errors.push(`${email}: ${e.message}`);
    }
  }

  return res.status(200).json(log);
}

// ─── Filter matching (mirrors client-side logic) ─────────
function matchJobToFilters(job, filters) {
  if (!filters) return true;

  if (filters.search) {
    const q = filters.search.toLowerCase();
    const searchable = `${job.title} ${job.company_name} ${(job.tags || []).join(" ")} ${job.location || ""}`.toLowerCase();
    if (!searchable.includes(q)) return false;
  }

  if (filters.typeFilter) {
    if (job.job_type !== filters.typeFilter) return false;
  }

  if (filters.locationFilter === "remote") {
    if (!(job.location || "").toLowerCase().includes("remote")) return false;
  }

  if (filters.salaryFilter) {
    const max = job.salary_max || job.salary_min || 0;
    if (max < filters.salaryFilter) return false;
  }

  if (filters.tagFilter) {
    if (!(job.tags || []).some((t) => t.toLowerCase() === filters.tagFilter.toLowerCase())) {
      return false;
    }
  }

  return true;
}

// ─── HTML email builder ──────────────────────────────────
function buildDigestEmail(alerts, baseUrl, unsubToken) {
  const formatSalary = (min, max) => {
    if (!min && !max) return null;
    const fmt = (n) => (n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n}`);
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
    for (const job of alert.jobs) {
      const salary = formatSalary(job.salary_min, job.salary_max);
      jobRows += `
        <tr><td style="padding:16px 0;border-bottom:1px solid #f5f5f5;">
          <a href="${baseUrl}/jobs?post=false" style="text-decoration:none;">
            <div style="font-family:'Montserrat',Helvetica,Arial,sans-serif;font-size:16px;font-weight:700;color:#1d1d1f;line-height:1.3;">
              ${escHtml(job.title)}
            </div>
          </a>
          <div style="font-family:'Inter',Helvetica,Arial,sans-serif;font-size:14px;color:#424245;margin-top:4px;">
            ${escHtml(job.company_name)}
            <span style="color:#c7c7cc;margin:0 6px;">·</span>
            ${escHtml(job.location || "Remote")}
            ${salary ? `<span style="color:#c7c7cc;margin:0 6px;">·</span><strong style="color:#1d1d1f;">${salary}</strong>` : ""}
          </div>
          ${(job.tags || []).length > 0 ? `
            <div style="margin-top:8px;">
              ${job.tags.slice(0, 4).map((t) => `<span style="display:inline-block;font-family:'Inter',sans-serif;font-size:11px;padding:3px 10px;background:#f5f5f5;color:#86868b;border-radius:20px;margin-right:4px;">${escHtml(t)}</span>`).join("")}
            </div>
          ` : ""}
          <a href="${escHtml(job.apply_url)}" style="display:inline-block;margin-top:10px;font-family:'Inter',sans-serif;font-size:13px;font-weight:600;color:#FF872A;text-decoration:none;">
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

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#1a1b20,#202127);padding:32px 28px;">
    <div style="font-family:'Montserrat',Helvetica,Arial,sans-serif;font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.02em;">
      BEN <span style="color:#FF872A;">Jobs</span>
    </div>
    <div style="font-family:'Inter',Helvetica,Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.5);margin-top:6px;">
      New jobs matching your saved searches
    </div>
  </td></tr>

  <!-- Jobs -->
  <tr><td style="padding:0 28px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      ${jobRows}
    </table>
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding:28px;">
    <a href="${baseUrl}/jobs" style="display:block;text-align:center;font-family:'Inter',sans-serif;font-size:15px;font-weight:600;color:#fff;background:#FF872A;padding:14px 24px;border-radius:12px;text-decoration:none;">
      Browse all jobs on BEN
    </a>
  </td></tr>

  <!-- Footer -->
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

function escHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
