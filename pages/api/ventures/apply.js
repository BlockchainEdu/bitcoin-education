import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;

    // Validate required fields
    if (!body.founder_name || !body.email || !body.one_liner || !body.problem) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // All fields from the 7-step form
    const application = {
      // Step 1: Founders
      founder_name: body.founder_name,
      email: body.email,
      linkedin: body.linkedin || null,
      university: body.university || null,
      role: body.role || null,
      // Step 2: Team
      team_size: body.team_size || null,
      team_breakdown: body.team_breakdown || null,
      how_met: body.how_met || null,
      worked_together: body.worked_together || null,
      who_codes_who_sells: body.who_codes_who_sells || null,
      // Step 3: Idea
      one_liner: body.one_liner,
      problem: body.problem,
      insight: body.insight || null,
      how_it_works: body.how_it_works || null,
      // Step 4: Progress
      stage: body.stage || null,
      most_impressive: body.most_impressive || null,
      users_count: body.users_count || null,
      project_url: body.project_url || null,
      demo_url: body.demo_url || null,
      // Step 5: Market
      revenue_model: body.revenue_model || null,
      competitors: body.competitors || null,
      twelve_month_plan: body.twelve_month_plan || null,
      unfair_advantage: body.unfair_advantage || null,
      // Step 6: Ask
      raising_amount: body.raising_amount || null,
      use_of_funds: body.use_of_funds || null,
      raised_before: body.raised_before || null,
      why_ben: body.why_ben || null,
      // Step 7: Conviction
      ten_year_question: body.ten_year_question || null,
      contrarian_belief: body.contrarian_belief || null,
      anything_else: body.anything_else || null,
      referral_source: body.referral_source || null,
      // Internal
      status: "pending",
    };

    const { data, error } = await supabaseAdmin
      .from("venture_applications")
      .insert([application])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: "Failed to submit application" });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error("Venture apply error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
