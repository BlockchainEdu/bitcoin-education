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
