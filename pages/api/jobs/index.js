import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

export default async function handler(req, res) {
  // ── GET: List active jobs with optional filters ──
  if (req.method === "GET") {
    const supabase = supabaseAdmin();
    const { q, type, remote, salary_min, tags, page, limit } = req.query;

    let query = supabase
      .from("jobs")
      .select("*", { count: "exact" })
      .eq("status", "active");

    // Text search — title or company (sanitize input for .or() filter string)
    if (q) {
      const safeQ = q.replace(/[%_'"\\,().]/g, "");
      if (safeQ.length > 0) {
        query = query.or(`title.ilike.%${safeQ}%,company_name.ilike.%${safeQ}%`);
      }
    }

    // Job type filter
    if (type) {
      query = query.eq("job_type", type);
    }

    // Remote filter
    if (remote === "true") {
      query = query.ilike("location", "%remote%");
    }

    // Salary floor — show jobs where salary_max >= threshold
    if (salary_min) {
      const min = parseInt(salary_min);
      if (!isNaN(min)) {
        query = query.gte("salary_max", min);
      }
    }

    // Tag filter — job must contain this tag
    if (tags) {
      const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);
      if (tagList.length > 0) {
        query = query.contains("tags", tagList);
      }
    }

    // Ordering: featured first, then newest
    query = query
      .order("tier", { ascending: true })
      .order("posted_at", { ascending: false });

    // Pagination (optional — clients can still fetch all)
    const pageSize = Math.min(parseInt(limit) || 2000, 2000);
    const pageNum = Math.max(parseInt(page) || 1, 1);
    const from = (pageNum - 1) * pageSize;
    query = query.range(from, from + pageSize - 1);

    const { data, error, count } = await query;

    if (error) {
      return res.status(500).json({ error: "Failed to fetch jobs" });
    }

    // Include total count in response header for pagination
    res.setHeader("X-Total-Count", count || 0);
    return res.status(200).json(data || []);
  }

  // ── POST: Create a pending job (requires auth) ──
  if (req.method === "POST") {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const {
      title, company_name, company_logo, company_url,
      location, salary_min, salary_max, salary_currency,
      description, apply_url, tags, job_type, tier,
    } = req.body;

    // Validate required fields
    if (!title || !company_name || !apply_url) {
      return res.status(400).json({ error: "Missing required fields: title, company_name, apply_url" });
    }

    const admin = supabaseAdmin();
    const { data, error } = await admin
      .from("jobs")
      .insert({
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
        tags: tags || [],
        job_type: job_type || "full-time",
        tier: tier || "standard",
        status: "pending",
        posted_by: user.id,
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Failed to create job" });
    }

    return res.status(201).json(data);
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).end("Method Not Allowed");
}
