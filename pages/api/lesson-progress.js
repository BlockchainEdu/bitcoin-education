import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // Get user from auth token
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return res.status(401).json({ error: "Invalid token" });

  if (req.method === "GET") {
    // Fetch all progress for this user
    const { data } = await supabaseAdmin
      .from("lesson_progress")
      .select("lesson_id, completed_at")
      .eq("user_id", user.id);

    return res.json({ progress: data || [] });
  }

  if (req.method === "POST") {
    const { lesson_id, completed } = req.body;
    if (!lesson_id) return res.status(400).json({ error: "lesson_id required" });

    if (completed) {
      // Upsert completion
      const { error } = await supabaseAdmin
        .from("lesson_progress")
        .upsert(
          { user_id: user.id, lesson_id, completed_at: new Date().toISOString() },
          { onConflict: "user_id,lesson_id" }
        );
      if (error) return res.status(500).json({ error: error.message });
    } else {
      // Remove completion
      await supabaseAdmin
        .from("lesson_progress")
        .delete()
        .eq("user_id", user.id)
        .eq("lesson_id", lesson_id);
    }

    return res.json({ ok: true });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).end();
}
