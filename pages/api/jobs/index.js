import { db } from "../../../lib/db";
import { job } from "../../../lib/db/schema";
import { getUserFromRequest } from "../../../lib/auth-helpers";
import { eq, ilike, gte, sql, asc, desc, and, or } from "drizzle-orm";

export default async function handler(req, res) {
  // ── GET: List active jobs with optional filters ──
  if (req.method === "GET") {
    const { q, type, remote, salary_min, tags, page, limit } = req.query;

    const conditions = [eq(job.status, "active")];

    // Text search
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

    // Job type filter
    if (type) {
      conditions.push(eq(job.job_type, type));
    }

    // Remote filter
    if (remote === "true") {
      conditions.push(ilike(job.location, "%remote%"));
    }

    // Salary floor
    if (salary_min) {
      const min = parseInt(salary_min);
      if (!isNaN(min)) {
        conditions.push(gte(job.salary_max, min));
      }
    }

    // Tag filter
    if (tags) {
      const tagList = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      if (tagList.length > 0) {
        conditions.push(sql`${job.tags} @> ${JSON.stringify(tagList)}::jsonb`);
      }
    }

    const pageSize = Math.min(parseInt(limit) || 2000, 2000);
    const pageNum = Math.max(parseInt(page) || 1, 1);
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
    res.setHeader("X-Total-Count", count);
    return res.status(200).json(data || []);
  }

  // ── POST: Create a pending job (requires auth) ──
  if (req.method === "POST") {
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
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).end("Method Not Allowed");
}
