import Parser from 'rss-parser';

// Cache RSS results for 5 minutes to prevent hammering external API
let cache = { data: null, timestamp: 0 };
const CACHE_TTL_MS = 5 * 60 * 1000;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const now = Date.now();
    if (cache.data && now - cache.timestamp < CACHE_TTL_MS) {
      res.setHeader("X-Cache", "HIT");
      return res.status(200).json(cache.data);
    }

    const parser = new Parser();
    const feed = await parser.parseURL(`https://rss.beehiiv.com/feeds/${process.env.NEXT_PUBLIC_BEEHIIV_RSS_ID || "gfjLR7z5O9"}.xml`);
    const sortedPosts = feed.items
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
      .slice(0, 6);

    cache = { data: sortedPosts, timestamp: now };

    res.setHeader("X-Cache", "MISS");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
    res.status(200).json(sortedPosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch RSS feed" });
  }
}
