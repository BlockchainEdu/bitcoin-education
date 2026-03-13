import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

export default async function handler(req, res) {
  // ── POST: Create a job alert ──
  if (req.method === "POST") {
    const { email, filters, label, frequency } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Valid email required" });
    }

    if (!label || !filters) {
      return res.status(400).json({ error: "Filters and label required" });
    }

    const freq = frequency === "weekly" ? "weekly" : "daily";

    const supabase = supabaseAdmin();

    // Upsert: if same email + label exists, update filters
    const { data, error } = await supabase
      .from("job_alerts")
      .upsert(
        {
          email: email.toLowerCase().trim(),
          filters,
          label,
          frequency: freq,
          active: true,
        },
        { onConflict: "email,label" }
      )
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: "Failed to create alert" });
    }

    return res.status(201).json({ id: data.id, label: data.label });
  }

  // ── DELETE: Unsubscribe via token ──
  if (req.method === "DELETE") {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Unsubscribe token required" });
    }

    const supabase = supabaseAdmin();
    const { error } = await supabase
      .from("job_alerts")
      .update({ active: false })
      .eq("unsubscribe_token", token);

    if (error) {
      return res.status(500).json({ error: "Failed to unsubscribe" });
    }

    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "POST, DELETE");
  return res.status(405).end("Method Not Allowed");
}
