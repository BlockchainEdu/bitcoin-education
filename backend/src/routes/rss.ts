import { Router } from "express";
import Parser from "rss-parser";

const router = Router();

let cache: { data: any; timestamp: number } = { data: null, timestamp: 0 };
const CACHE_TTL_MS = 5 * 60 * 1000;

// GET /api/rss
router.get("/", async (req, res) => {
  try {
    const now = Date.now();
    if (cache.data && now - cache.timestamp < CACHE_TTL_MS) {
      res.setHeader("X-Cache", "HIT");
      return res.status(200).json(cache.data);
    }

    const parser = new Parser();
    const feed = await parser.parseURL(
      `https://rss.beehiiv.com/feeds/${process.env.NEXT_PUBLIC_BEEHIIV_RSS_ID || "gfjLR7z5O9"}.xml`
    );
    const sortedPosts = feed.items
      .sort((a, b) => new Date(b.pubDate!).getTime() - new Date(a.pubDate!).getTime())
      .slice(0, 6);

    cache = { data: sortedPosts, timestamp: now };

    res.setHeader("X-Cache", "MISS");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
    res.status(200).json(sortedPosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
});

export default router;
