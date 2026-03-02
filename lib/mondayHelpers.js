export function safeJsonParse(value) {
  if (!value || typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function col(item, id) {
  return item?.column_values?.find((c) => c.id === id) ?? null;
}

export function buildTitleToId(columns = []) {
  const map = new Map();
  columns.forEach((c) => {
    if (c?.id && c?.title) map.set(c.title.trim().toLowerCase(), c.id);
  });
  return map;
}

export function pickId(map, titles) {
  for (const t of titles) {
    const id = map.get(String(t).toLowerCase());
    if (id) return id;
  }
  return null;
}

export function extractUrlFromMondayValue(cv) {
  const raw = cv?.value ?? cv?.text;
  const parsed = safeJsonParse(raw);

  const url =
    parsed?.url ||
    parsed?.link?.url ||
    parsed?.link?.url?.url ||
    parsed?.files?.[0]?.url ||
    parsed?.files?.[0]?.public_url ||
    parsed?.files?.[0]?.publicUrl ||
    parsed?.files?.[0]?.publicURL ||
    null;

  return url || null;
}

export function extractAssetIdFromFilesColumn(cv) {
  const parsed = safeJsonParse(cv?.value);
  const id = parsed?.files?.[0]?.assetId;
  return id ? String(id) : null;
}

export function buildAssetsById(assets = []) {
  const m = new Map();
  assets.forEach((a) => {
    if (a?.id && a?.public_url) m.set(String(a.id), a.public_url);
  });
  return m;
}

export function parseTitleToRoleCompany(titleText) {
  const t = (titleText || "").trim();
  if (!t) return { role: "", company: "" };

  const parts = t
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

  if (parts.length <= 1) return { role: t, company: "" };
  return { role: parts[0], company: parts.slice(1).join(", ") };
}

export function parseNumberFromMonday(cv) {
  const parsed = safeJsonParse(cv?.value);
  if (typeof parsed === "number") return parsed;
  if (parsed?.number != null) return Number(parsed.number) || 0;

  const n = Number(String(cv?.text || "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function imgSrc(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return encodeURI(path);
}

export function initialsFromName(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const a = parts[0]?.[0] || "?";
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (a + b).toUpperCase();
}
