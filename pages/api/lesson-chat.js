import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  const { messages, lessonTitle, moduleName, track } = req.body;
  if (!messages || !lessonTitle) {
    return res.status(400).json({ error: "messages and lessonTitle required" });
  }

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
      messages: messages.slice(-10), // Keep last 10 messages for context
    });

    const text = response.content[0]?.text || "";
    return res.json({ reply: text });
  } catch (err) {
    console.error("Chat error:", err.message);
    return res.status(500).json({ error: "AI tutor is temporarily unavailable." });
  }
}
