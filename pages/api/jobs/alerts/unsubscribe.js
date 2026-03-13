import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send(unsubPage("Missing token", false));
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data, error } = await supabase
    .from("job_alerts")
    .update({ active: false })
    .eq("unsubscribe_token", token)
    .select("email")
    .single();

  if (error || !data) {
    return res.status(200).send(unsubPage("Alert not found or already unsubscribed", false));
  }

  return res.status(200).send(unsubPage(data.email, true));
}

function unsubPage(emailOrMsg, success) {
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
  <p>${success
    ? `Job alerts for <strong>${emailOrMsg}</strong> have been turned off. You won't receive any more emails.`
    : emailOrMsg
  }</p>
  <a href="/jobs">Browse Jobs</a>
</div>
</body></html>`;
}
