import { db } from "../../lib/db";
import { lessonProgress } from "../../lib/db/schema";
import { getUserFromRequest } from "../../lib/auth-helpers";
import { eq, and } from "drizzle-orm";

export default async function handler(req, res) {
  const payload = getUserFromRequest(req);
  if (!payload) return res.status(401).json({ error: "Not authenticated" });

  if (req.method === "GET") {
    const rows = await db
      .select({
        lesson_id: lessonProgress.lesson_id,
        completed_at: lessonProgress.completed_at,
      })
      .from(lessonProgress)
      .where(eq(lessonProgress.user_id, payload.id));

    return res.json({ progress: rows });
  }

  if (req.method === "POST") {
    const { lesson_id, completed } = req.body;
    if (!lesson_id) return res.status(400).json({ error: "lesson_id required" });

    if (completed) {
      await db
        .insert(lessonProgress)
        .values({
          user_id: payload.id,
          lesson_id,
          completed_at: new Date(),
        })
        .onConflictDoUpdate({
          target: [lessonProgress.user_id, lessonProgress.lesson_id],
          set: { completed_at: new Date() },
        });
    } else {
      await db
        .delete(lessonProgress)
        .where(
          and(
            eq(lessonProgress.user_id, payload.id),
            eq(lessonProgress.lesson_id, lesson_id)
          )
        );
    }

    return res.json({ ok: true });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).end();
}
