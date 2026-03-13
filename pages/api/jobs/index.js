import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

export default async function handler(req, res) {
  // ── GET: List active jobs ──
  if (req.method === "GET") {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("status", "active")
      .order("tier", { ascending: true }) // featured (f) before standard (s)
      .order("posted_at", { ascending: false })
      .limit(2000);

    if (error) {
      return res.status(500).json({ error: "Failed to fetch jobs" });
    }
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
