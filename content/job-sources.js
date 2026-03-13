// ─── Crypto Company ATS Registry ────────────────────────
// Each entry maps a crypto company to its ATS board token.
// These are FREE, unauthenticated, public JSON APIs.
// Source: crypto-jobs-fyi/crawler + manual verification.

// ── Greenhouse boards ───────────────────────────────────
// API: GET https://boards-api.greenhouse.io/v1/boards/{token}/jobs?content=true
export const GREENHOUSE_BOARDS = [
  // Tier 1 — Major exchanges & infra
  { token: "coinbase", company: "Coinbase" },
  { token: "chainalysis", company: "Chainalysis" },
  { token: "circle", company: "Circle" },
  { token: "ripple", company: "Ripple" },
  { token: "ledger", company: "Ledger" },
  { token: "fireblocks", company: "Fireblocks" },
  { token: "blockdaemon", company: "Blockdaemon" },
  { token: "figment", company: "Figment" },
  { token: "bitgo", company: "BitGo" },
  { token: "anchorage", company: "Anchorage Digital" },
  { token: "paxos", company: "Paxos" },

  // Tier 2 — DeFi & protocols
  { token: "uniswaplabs", company: "Uniswap Labs" },
  { token: "aave", company: "Aave" },
  { token: "makerdao", company: "MakerDAO" },
  { token: "dydx", company: "dYdX" },
  { token: "chainlinklabs", company: "Chainlink Labs" },
  { token: "consensys", company: "ConsenSys" },
  { token: "polygon", company: "Polygon" },
  { token: "solanafoundation", company: "Solana Foundation" },
  { token: "penumbralabs", company: "Penumbra Labs" },

  // Tier 3 — Infrastructure & tooling
  { token: "alchemy", company: "Alchemy" },
  { token: "thegraph", company: "The Graph" },
  { token: "quicknode", company: "QuickNode" },
  { token: "biconomy", company: "Biconomy" },
  { token: "forta", company: "Forta" },
  { token: "tenderly", company: "Tenderly" },
  { token: "nethermind", company: "Nethermind" },
  { token: "offchainlabs", company: "Offchain Labs" },
  { token: "celestia", company: "Celestia" },

  // Tier 4 — Wallets, NFT, gaming
  { token: "phantom", company: "Phantom" },
  { token: "magiceden", company: "Magic Eden" },
  { token: "opensea", company: "OpenSea" },
  { token: "immutable", company: "Immutable" },
  { token: "mythicalgames", company: "Mythical Games" },
];

// ── Lever boards ────────────────────────────────────────
// API: GET https://api.lever.co/v0/postings/{company}?mode=json
export const LEVER_BOARDS = [
  { token: "paradigm", company: "Paradigm" },
  { token: "protocol", company: "Protocol Labs" },
  { token: "Aptos", company: "Aptos" },
  { token: "eigenlabs", company: "Eigen Labs" },
  { token: "starkware", company: "StarkWare" },
  { token: "araboricul", company: "Arbitrum Foundation" },
  { token: "optimism", company: "Optimism" },
  { token: "matterlabs", company: "Matter Labs (zkSync)" },
  { token: "scroll-zkp", company: "Scroll" },
  { token: "layerzerolabs", company: "LayerZero Labs" },
  { token: "wormhole", company: "Wormhole" },
  { token: "nansen2", company: "Nansen" },
  { token: "aztecnetwork", company: "Aztec" },
];

// ── Ashby boards ────────────────────────────────────────
// API: GET https://api.ashbyhq.com/posting-api/job-board/{company}?includeCompensation=true
export const ASHBY_BOARDS = [
  { token: "kraken.com", company: "Kraken" },
  { token: "OpenSea", company: "OpenSea" },
  { token: "cointracker", company: "CoinTracker" },
  { token: "NobleConnect", company: "Noble" },
  { token: "gauntlet", company: "Gauntlet" },
  { token: "worldcoin", company: "Worldcoin" },
  { token: "EigenLabs", company: "Eigen Labs" },
  { token: "Privy", company: "Privy" },
  { token: "Monad", company: "Monad" },
  { token: "berachain", company: "Berachain" },
];

// ── RSS Feeds ───────────────────────────────────────────
export const RSS_FEEDS = [
  {
    url: "https://api.cryptojobslist.com/jobs.rss",
    source: "CryptoJobsList",
  },
  // RemoteOK RSS removed — JSON API below gives same data with better structure
];

// ── Free JSON APIs (token-based or open) ────────────────
export const JSON_APIS = [
  {
    url: "https://remoteok.com/remote-web3-jobs.json",
    source: "RemoteOK",
    // First item in array is metadata, skip it
    skipFirst: true,
  },
  {
    url: "https://jobicy.com/api/v2/remote-jobs?count=50&tag=crypto",
    source: "Jobicy",
    dataPath: "jobs", // response.jobs[]
  },
];

// ── Tags to auto-classify jobs ──────────────────────────
export const CRYPTO_KEYWORDS = [
  "blockchain", "crypto", "web3", "defi", "nft", "smart contract",
  "solidity", "ethereum", "bitcoin", "token", "dao", "dapp",
  "layer 2", "l2", "zk", "zero knowledge", "consensus", "validator",
  "staking", "wallet", "custody", "exchange", "trading",
];

// Check if a job title/description is crypto-relevant
// (for general boards like RemoteOK where not all results are crypto)
export function isCryptoRelevant(title, description) {
  const text = `${title} ${description || ""}`.toLowerCase();
  return CRYPTO_KEYWORDS.some((kw) => text.includes(kw));
}
