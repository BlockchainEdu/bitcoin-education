import { db } from "../../../lib/db";
import { application } from "../../../lib/db/schema";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;

    if (!body.name || !body.email) {
      return res.status(400).json({ error: "Name and email required" });
    }

    const [data] = await db
      .insert(application)
      .values({
        type: body.type || "coliving",
        name: body.name,
        email: body.email,
        telegram: body.telegram || null,
        linkedin: body.linkedin || null,
        github: body.github || null,
        country: body.country || null,
        role: body.role || null,
        startup_name: body.startup_name || null,
        one_liner: body.one_liner || null,
        stage: body.stage || null,
        what_building: body.what_building || null,
        pitch_url: body.pitch_url || null,
        preferred_location: body.preferred_location || null,
        preferred_dates: body.preferred_dates || null,
        why_join: body.why_join || null,
        what_contribute: body.what_contribute || null,
        dietary: body.dietary || null,
        how_heard: body.how_heard || null,
        status: body.status || "pending",
      })
      .returning();

    return res.status(201).json({ success: true, id: data.id });
  } catch (err) {
    console.error("Coliving apply error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
