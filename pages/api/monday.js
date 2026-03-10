// ─── Security: Allowlisted Monday.com GraphQL Proxy ────────────────
// Only permits read-only queries against specific board IDs.
// Blocks all mutations, introspection, and arbitrary queries.

const ALLOWED_BOARD_IDS = new Set([
  "1983862095",   // Projects / Map
  "1383021348",   // Team members
  "1452150315",   // Clubs
  "18392867276",  // Opportunities - events
  "5775320038",   // Opportunities - scholarships
  "18394872099",  // Universities
  "5642546206",   // Impact
  "1515443648",   // Feature slider
  "1897479716",   // Individual programs
]);

// Rate limiting: simple in-memory sliding window (per Vercel instance)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 30;           // max requests per window

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    // Evict stale entries to prevent memory leak
    if (rateLimitMap.size > 1000) {
      for (const [key, val] of rateLimitMap) {
        if (now - val.start > RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(key);
      }
    }
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function validateQuery(body) {
  const query = body?.query;
  if (!query || typeof query !== "string") return false;

  const normalized = query.toLowerCase().replace(/\s+/g, " ").trim();

  // Block mutations, subscriptions, and introspection
  if (/^\s*(mutation|subscription)/i.test(normalized)) return false;
  if (normalized.includes("__schema") || normalized.includes("__type")) return false;

  // Block dangerous operations: create, update, delete, archive, move, duplicate
  const dangerousOps = [
    "create_item", "change_column_value", "change_multiple_column_values",
    "delete_item", "archive_item", "move_item_to_group", "duplicate_item",
    "create_board", "delete_board", "archive_board",
    "create_group", "delete_group", "archive_group",
    "create_webhook", "delete_webhook",
    "add_file_to_column", "create_notification",
  ];
  for (const op of dangerousOps) {
    if (normalized.includes(op)) return false;
  }

  // Allow individual item lookups: items (ids: [...])
  const itemLookupMatch = normalized.match(/items\s*\(\s*ids\s*:\s*\[([^\]]+)\]\s*\)/);
  if (itemLookupMatch) {
    // Verify all IDs are numeric
    const ids = itemLookupMatch[1].split(",").map(s => s.trim());
    if (ids.every(id => /^\d+$/.test(id))) return true;
    return false;
  }

  // Verify query only accesses allowed board IDs
  const boardIdMatches = normalized.match(/boards\s*\(\s*ids\s*:\s*(\d+)\s*\)/g);
  if (!boardIdMatches || boardIdMatches.length === 0) return false;

  for (const match of boardIdMatches) {
    const id = match.match(/(\d+)/)?.[1];
    if (!id || !ALLOWED_BOARD_IDS.has(id)) return false;
  }

  // Block variables (prevent injection via parameterized queries)
  if (body.variables && Object.keys(body.variables).length > 0) return false;

  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  // Rate limit by IP
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip))
    return res.status(429).json({ error: "Too many requests" });

  // Validate the query
  if (!validateQuery(req.body))
    return res.status(403).json({ error: "Query not permitted" });

  try {
    const mondayRes = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.MONDAY_API_KEY,
      },
      body: JSON.stringify({ query: req.body.query }),
    });

    const data = await mondayRes.json();
    return res.status(mondayRes.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: "Proxy error" });
  }
}
