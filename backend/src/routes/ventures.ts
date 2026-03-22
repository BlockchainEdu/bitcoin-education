import { Router } from "express";
import { db } from "../db";
import { ventureApplication } from "../db/schema";

const router = Router();

// POST /api/ventures/apply
router.post("/apply", async (req, res) => {
  try {
    const body = req.body;

    if (!body.founder_name || !body.email || !body.one_liner || !body.problem) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const application = {
      founder_name: body.founder_name,
      email: body.email,
      linkedin: body.linkedin || null,
      university: body.university || null,
      role: body.role || null,
      team_size: body.team_size || null,
      team_breakdown: body.team_breakdown || null,
      how_met: body.how_met || null,
      worked_together: body.worked_together || null,
      who_codes_who_sells: body.who_codes_who_sells || null,
      one_liner: body.one_liner,
      problem: body.problem,
      insight: body.insight || null,
      how_it_works: body.how_it_works || null,
      stage: body.stage || null,
      most_impressive: body.most_impressive || null,
      users_count: body.users_count || null,
      project_url: body.project_url || null,
      demo_url: body.demo_url || null,
      revenue_model: body.revenue_model || null,
      competitors: body.competitors || null,
      twelve_month_plan: body.twelve_month_plan || null,
      unfair_advantage: body.unfair_advantage || null,
      raising_amount: body.raising_amount || null,
      use_of_funds: body.use_of_funds || null,
      raised_before: body.raised_before || null,
      why_ben: body.why_ben || null,
      ten_year_question: body.ten_year_question || null,
      contrarian_belief: body.contrarian_belief || null,
      anything_else: body.anything_else || null,
      referral_source: body.referral_source || null,
      status: "pending" as const,
    };

    const [data] = await db
      .insert(ventureApplication)
      .values(application)
      .returning();

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error("Venture apply error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
