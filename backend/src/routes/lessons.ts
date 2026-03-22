import { Router } from "express";
import { db } from "../db";
import { lessonProgress } from "../db/schema";
import { getUserFromRequest } from "../auth-helpers";
import { eq, and } from "drizzle-orm";
import Anthropic from "@anthropic-ai/sdk";

const router = Router();

// GET /api/lesson-progress
router.get("/lesson-progress", async (req, res) => {
  const payload = getUserFromRequest(req);
  if (!payload) return res.status(401).json({ error: "Not authenticated" });

  const rows = await db
    .select({
      lesson_id: lessonProgress.lesson_id,
      completed_at: lessonProgress.completed_at,
    })
    .from(lessonProgress)
    .where(eq(lessonProgress.user_id, payload.id));

  return res.json({ progress: rows });
});

// POST /api/lesson-progress
router.post("/lesson-progress", async (req, res) => {
  const payload = getUserFromRequest(req);
  if (!payload) return res.status(401).json({ error: "Not authenticated" });

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
});

// POST /api/lesson-chat
router.post("/lesson-chat", async (req, res) => {
  const { messages, lessonTitle, moduleName, track } = req.body;
  if (!messages || !lessonTitle) {
    return res.status(400).json({ error: "messages and lessonTitle required" });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const systemPrompt = `You are a coding tutor for the BEN Builder Academy. You are helping a student with the lesson "${lessonTitle}" in the ${moduleName || "course"} module (${track === "solidity" ? "Solidity Engineering" : "Full-Stack Development"} track).

Your role:
- Answer questions about this lesson's topic clearly and concisely
- Give code examples when helpful, using markdown code blocks
- If the student is stuck, guide them step by step rather than giving the full answer
- Keep responses focused and practical
- If asked about topics outside this lesson, briefly answer but redirect to the current lesson
- Be encouraging but direct. No filler.

Keep responses under 300 words unless the student asks for a detailed explanation.`;

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.slice(-10),
    });

    const block = response.content[0];
    const text = block && "text" in block ? block.text : "";
    return res.json({ reply: text });
  } catch (err: any) {
    console.error("Chat error:", err.message);
    return res.status(500).json({ error: "AI tutor is temporarily unavailable." });
  }
});

export default router;
