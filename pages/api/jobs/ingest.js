// ─── Job Ingestion Cron Endpoint ────────────────────────
// Called by Vercel Cron every 6 hours.
// Fetches from 50+ ATS boards, RSS feeds, and JSON APIs.
// Deduplicates and upserts into Supabase `jobs` table.
//
// Security: requires CRON_SECRET header to prevent abuse.
// Vercel automatically sends this header for cron invocations.

export const config = {
  maxDuration: 60, // Allow up to 60s for Pro plan
};

export default async function handler(req, res) {
  // Only allow GET (Vercel cron) or POST (manual trigger)
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).end("Method Not Allowed");
  }

  // Verify cron secret (Vercel sends this automatically for cron jobs)
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Dynamic import to keep cold starts fast
    const { ingestAllJobs } = await import("../../../lib/job-ingestion");
    const result = await ingestAllJobs();

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      timestamp: new Date().toISOString(),
    });
  }
}
