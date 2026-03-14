import { createClient } from "@supabase/supabase-js";

// Handles OAuth callback (Google sign-in redirect)
export default async function handler(req, res) {
  const { code, next } = req.query;
  const redirectTo = next || "/dashboard";

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      // Ensure member row exists (for OAuth users who skip signup form)
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      const { data: existing } = await supabaseAdmin
        .from("members")
        .select("id")
        .eq("id", data.user.id)
        .single();

      if (!existing) {
        await supabaseAdmin.from("members").insert({
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || "",
          role: "free",
          is_paid: false,
        });
      }
    }
  }

  res.redirect(redirectTo);
}
