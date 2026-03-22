import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/db";
import { jobAlert } from "../../../lib/db/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    const [data] = await db
      .insert(jobAlert)
      .values({
        email: email.toLowerCase().trim(),
        filters,
        label,
        frequency: freq,
        active: true,
      })
      .onConflictDoUpdate({
        target: [jobAlert.email, jobAlert.label],
        set: { filters, frequency: freq, active: true },
      })
      .returning();

    return res.status(201).json({ id: data.id, label: data.label });
  }

  // ── DELETE: Unsubscribe via token ──
  if (req.method === "DELETE") {
    const token = req.query.token as string | undefined;

    if (!token) {
      return res.status(400).json({ error: "Unsubscribe token required" });
    }

    await db
      .update(jobAlert)
      .set({ active: false })
      .where(eq(jobAlert.unsubscribe_token, token));

    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "POST, DELETE");
  return res.status(405).end("Method Not Allowed");
}
