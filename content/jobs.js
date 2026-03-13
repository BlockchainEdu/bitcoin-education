// ─── Job Board Constants & Seed Data ────────────────────
// Matches Supabase `jobs` table schema:
// id, company_name, company_logo, company_url, title, description, location,
// salary_min, salary_max, salary_currency, job_type, tags, apply_url,
// tier (standard|featured), stripe_subscription_id, posted_by, status
// (pending|active|expired), ai_score, posted_at, expires_at

export const JOB_TYPES = [
  { id: "full-time", label: "Full-time" },
  { id: "part-time", label: "Part-time" },
  { id: "contract", label: "Contract" },
  { id: "internship", label: "Internship" },
  { id: "freelance", label: "Freelance" },
];

export const JOB_TIERS = [
  { id: "standard", label: "Standard", price: 29900 },
  { id: "featured", label: "Featured", price: 49900 },
];

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
export const JOB_POST_PRICE = 29900; // $299/month
export const JOB_POST_FEATURED_PRICE = 49900; // $499/month

// ─── Seed Jobs (static fallback / demo data) ───────────
// Shown when Supabase has no active jobs yet.
// Fields match the Supabase `jobs` table exactly.
export const SEED_JOBS = [
  {
    id: "seed-1",
    title: "Senior Solidity Engineer",
    company_name: "Uniswap Labs",
    company_logo: null,
    company_url: "https://uniswap.org",
    location: "Remote (Global)",
    job_type: "full-time",
    salary_min: 180000,
    salary_max: 250000,
    salary_currency: "USD",
    description: "Build and maintain core smart contracts for the largest DEX in crypto. Work on V4 hooks, cross-chain deployments, and gas optimization. You will be part of a small protocol team with outsized impact on the entire DeFi ecosystem.",
    apply_url: "https://boards.greenhouse.io/uniswaplabs",
    tags: ["Solidity", "DeFi", "Ethereum", "Smart Contracts", "Security"],
    tier: "featured",
    status: "active",
    posted_at: "2026-03-10T00:00:00Z",
  },
  {
    id: "seed-2",
    title: "Rust Protocol Developer",
    company_name: "Solana Foundation",
    company_logo: null,
    company_url: "https://solana.org",
    location: "Remote (US/EU)",
    job_type: "full-time",
    salary_min: 160000,
    salary_max: 220000,
    salary_currency: "USD",
    description: "Work on the Solana runtime, transaction processing pipeline, and validator client. Deep systems programming in Rust with a focus on performance and reliability at massive scale.",
    apply_url: "https://jobs.solana.com",
    tags: ["Rust", "Solana", "Protocol", "Backend", "DevOps"],
    tier: "standard",
    status: "active",
    posted_at: "2026-03-09T00:00:00Z",
  },
  {
    id: "seed-3",
    title: "Product Designer",
    company_name: "Phantom",
    company_logo: null,
    company_url: "https://phantom.app",
    location: "San Francisco, CA",
    job_type: "full-time",
    salary_min: 140000,
    salary_max: 190000,
    salary_currency: "USD",
    description: "Design the wallet experience for millions of crypto users. Own end-to-end product design for swaps, staking, NFT browsing, and multi-chain features. High bar for craft and polish.",
    apply_url: "https://phantom.app/careers",
    tags: ["UI/UX", "Mobile", "Web3", "Brand", "Frontend"],
    tier: "standard",
    status: "active",
    posted_at: "2026-03-08T00:00:00Z",
  },
  {
    id: "seed-4",
    title: "Growth Lead",
    company_name: "Aave",
    company_logo: null,
    company_url: "https://aave.com",
    location: "Remote (Global)",
    job_type: "full-time",
    salary_min: 120000,
    salary_max: 170000,
    salary_currency: "USD",
    description: "Drive user acquisition and retention for the leading lending protocol. Own growth strategy across chains, coordinate with ecosystem partners, and build data-driven campaigns that bring the next wave of DeFi users.",
    apply_url: "https://aave.com/careers",
    tags: ["Growth", "DeFi", "Data", "Content", "Social Media"],
    tier: "standard",
    status: "active",
    posted_at: "2026-03-07T00:00:00Z",
  },
  {
    id: "seed-5",
    title: "Smart Contract Auditor",
    company_name: "OpenZeppelin",
    company_logo: null,
    company_url: "https://openzeppelin.com",
    location: "Remote (Global)",
    job_type: "full-time",
    salary_min: 150000,
    salary_max: 230000,
    salary_currency: "USD",
    description: "Audit smart contracts across Ethereum, L2s, and alt-L1s. Review Solidity and Vyper code for security vulnerabilities. Write detailed audit reports and work with top protocols to secure billions in TVL.",
    apply_url: "https://openzeppelin.com/jobs",
    tags: ["Solidity", "Security", "Audit", "Ethereum", "Smart Contracts"],
    tier: "featured",
    status: "active",
    posted_at: "2026-03-06T00:00:00Z",
  },
  {
    id: "seed-6",
    title: "Developer Relations Engineer",
    company_name: "Chainlink Labs",
    company_logo: null,
    company_url: "https://chain.link",
    location: "Remote (Global)",
    job_type: "full-time",
    salary_min: 130000,
    salary_max: 180000,
    salary_currency: "USD",
    description: "Be the bridge between Chainlink and the developer community. Create tutorials, sample code, and documentation. Speak at conferences, run workshops, and help builders integrate oracles and CCIP.",
    apply_url: "https://chainlinklabs.com/careers",
    tags: ["Web3", "Content", "Solidity", "TypeScript"],
    tier: "standard",
    status: "active",
    posted_at: "2026-03-05T00:00:00Z",
  },
  {
    id: "seed-7",
    title: "Full Stack Engineer",
    company_name: "Coinbase",
    company_logo: null,
    company_url: "https://coinbase.com",
    location: "Remote (US)",
    job_type: "full-time",
    salary_min: 155000,
    salary_max: 210000,
    salary_currency: "USD",
    description: "Build consumer-facing products at the largest US crypto exchange. React/Next.js frontend with Go microservices. Work on trading, staking, and wallet features used by 100M+ verified users.",
    apply_url: "https://coinbase.com/careers",
    tags: ["React", "Go", "Full Stack", "TypeScript", "Backend"],
    tier: "standard",
    status: "active",
    posted_at: "2026-03-04T00:00:00Z",
  },
  {
    id: "seed-8",
    title: "Head of Tokenomics",
    company_name: "Arbitrum Foundation",
    company_logo: null,
    company_url: "https://arbitrum.foundation",
    location: "Remote (Global)",
    job_type: "full-time",
    salary_min: 200000,
    salary_max: 300000,
    salary_currency: "USD",
    description: "Design and iterate on token economics for the leading Ethereum L2. Model incentive mechanisms, analyze on-chain data, coordinate with governance, and publish research on ARB token utility and distribution.",
    apply_url: "https://arbitrum.foundation/careers",
    tags: ["Tokenomics", "DeFi", "Layer 2", "Data"],
    tier: "standard",
    status: "active",
    posted_at: "2026-03-03T00:00:00Z",
  },
  {
    id: "seed-9",
    title: "Compliance Manager",
    company_name: "Kraken",
    company_logo: null,
    company_url: "https://kraken.com",
    location: "New York, NY",
    job_type: "full-time",
    salary_min: 130000,
    salary_max: 175000,
    salary_currency: "USD",
    description: "Lead regulatory compliance for a top-5 global crypto exchange. Manage licensing, AML/KYC programs, and regulatory reporting. Work directly with legal counsel and the C-suite on policy strategy.",
    apply_url: "https://kraken.com/careers",
    tags: ["Security", "DeFi"],
    tier: "standard",
    status: "active",
    posted_at: "2026-03-02T00:00:00Z",
  },
  {
    id: "seed-10",
    title: "Frontend Engineer (React/Next.js)",
    company_name: "Magic Eden",
    company_logo: null,
    company_url: "https://magiceden.io",
    location: "Remote (Global)",
    job_type: "full-time",
    salary_min: 140000,
    salary_max: 195000,
    salary_currency: "USD",
    description: "Build the cross-chain NFT marketplace used by millions. Performance-critical React/Next.js frontend with real-time data from multiple blockchains. Strong focus on UX and speed.",
    apply_url: "https://magiceden.io/careers",
    tags: ["React", "TypeScript", "NFT", "Frontend", "Web3"],
    tier: "standard",
    status: "active",
    posted_at: "2026-03-01T00:00:00Z",
  },
];
