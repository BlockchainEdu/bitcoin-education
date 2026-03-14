// ─── Job Board Constants ────────────────────────────────
// Matches Supabase `jobs` table schema:
// id, company_name, company_logo, company_url, title, description, location,
// salary_min, salary_max, salary_currency, job_type, tags, apply_url,
// tier (standard|boosted|featured), stripe_subscription_id, posted_by,
// status (pending|active|expired), ai_score, posted_at, expires_at

export const JOB_TYPES = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "contract", label: "Contract" },
  { id: "internship", label: "Internship" },
  { id: "freelance", label: "Freelance" },
];

export const JOB_TIERS = [
  { id: "standard", label: "Standard", price: 29900, rank: 3 },
  { id: "boosted", label: "Boosted", price: 44900, rank: 2 },
  { id: "featured", label: "Featured", price: 59900, rank: 1 },
];

// Tier sort rank — lower = higher placement (featured on top)
export const TIER_RANK = { featured: 1, boosted: 2, standard: 3 };

export function getTierConfig(tierId) {
  return JOB_TIERS.find((t) => t.id === tierId) || JOB_TIERS[0];
}

export const LOCATION_TYPES = [
  { id: "remote", label: "Remote", icon: "🌍" },
  { id: "hybrid", label: "Hybrid", icon: "🏢" },
  { id: "onsite", label: "On-site", icon: "📍" },
];

export const EXPERIENCE_LEVELS = [
  { id: "entry", label: "Entry Level" },
  { id: "mid", label: "Mid Level" },
  { id: "senior", label: "Senior" },
  { id: "lead", label: "Lead / Principal" },
  { id: "executive", label: "Executive" },
];

export const JOB_CATEGORIES = [
  { id: "engineering", label: "Engineering", color: "#3b82f6" },
  { id: "design", label: "Design", color: "#ec4899" },
  { id: "product", label: "Product", color: "#8b5cf6" },
  { id: "marketing", label: "Marketing", color: "#f97316" },
  { id: "operations", label: "Operations", color: "#10b981" },
  { id: "research", label: "Research", color: "#6366f1" },
  { id: "legal", label: "Legal & Compliance", color: "#64748b" },
  { id: "community", label: "Community", color: "#06b6d4" },
];

const DEFAULT_CATEGORY = { id: "other", label: "Other", color: "#86868b" };

export function getCategoryConfig(categoryId) {
  return JOB_CATEGORIES.find((c) => c.id === categoryId) || DEFAULT_CATEGORY;
}

export const JOB_TAGS = [
  "Solidity", "Rust", "TypeScript", "Python", "Go",
  "DeFi", "NFT", "Layer 2", "Bitcoin", "Ethereum",
  "Solana", "Smart Contracts", "Web3", "dApp",
  "DevOps", "Security", "Audit", "Frontend", "Backend",
  "Full Stack", "Data", "AI/ML", "Mobile", "React",
  "Node.js", "Tokenomics", "DAO", "Protocol",
  "Content", "Growth", "Social Media", "PR",
  "UI/UX", "Brand", "Illustration",
];

// Tag → color mapping for visual variety
const TAG_COLORS = {
  "Solidity": "#3b82f6", "Rust": "#f97316", "TypeScript": "#3178c6",
  "Python": "#fbbf24", "Go": "#00add8", "DeFi": "#8b5cf6",
  "NFT": "#ec4899", "Bitcoin": "#f7931a", "Ethereum": "#627eea",
  "Solana": "#14f195", "Web3": "#6366f1", "Security": "#ef4444",
  "Frontend": "#06b6d4", "Backend": "#10b981", "Full Stack": "#8b5cf6",
  "React": "#61dafb", "AI/ML": "#a855f7",
};

export function getTagColor(tag) {
  return TAG_COLORS[tag] || "#86868b";
}

export function formatSalary(min, max, currency = "USD") {
  if (!min && !max) return null;
  const fmt = (n) => {
    if (n >= 1000) return `${Math.round(n / 1000)}k`;
    return n.toString();
  };
  const sym = currency === "USD" ? "$" : currency;
  if (min && max) return `${sym}${fmt(min)} – ${sym}${fmt(max)}`;
  if (min) return `${sym}${fmt(min)}+`;
  return `Up to ${sym}${fmt(max)}`;
}

// Price for posting a job (monthly subscription)
export const JOB_POST_PRICE = 29900; // $299/month (standard)
export const JOB_POST_BOOSTED_PRICE = 44900; // $449/month (boosted)
export const JOB_POST_FEATURED_PRICE = 59900; // $599/month (featured)
