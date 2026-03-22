const OFFICIAL_LINKS = {
  Algorand: "https://algorand.foundation",
  "Alpha Blockchain": null,
  Augur: "https://augur.net",
  "Au Sum Ventures": "https://ausum.vc",
  Axelar: "https://axelar.network",
  Bitquick: "https://bitquick.com",
  BlockHack: "https://blockhack.io",
  Bolt: "https://bolt.com",
  CoinList: "https://coinlist.co",
  "Distributed ID": null,
  Eco: "https://eco.org",
  "GDA Capital": "https://gda.capital",
  Immuto: null,
  Iota: "https://iota.org",
  Metis: "https://metis.io",
  Optimism: "https://optimism.io",
  Qtum: "https://qtum.org",
};

function withHref(item) {
  const href = OFFICIAL_LINKS[item.name] || item.href || "#";
  return { ...item, href };
}

const FLOATING_ICONS = [
  { name: "CreatorBid", file: "CreatorBid.jpg", dir: "portfolio-companies" },
  { name: "SWAP", file: "SWAP.jpg", dir: "portfolio-companies" },
  {
    name: "Alpaca-Network",
    file: "Alpaca-Network.jpeg",
    dir: "portfolio-companies",
  },
  { name: "Algorand", file: "Algorand.png", dir: "companies-from-ben" },
  { name: "SatLayer", file: "SatLayer.png", dir: "portfolio-companies" },
  { name: "Injective", file: "Injective.png", dir: "companies-from-ben" },
  {
    name: "Unidentified Logo N",
    file: "Unidentified-Logo-N.png",
    dir: "network-of-universities/row-6",
  },
  { name: "Muba", file: "Muba.jpg", dir: "network-of-universities/row-6" },
  { name: "Metis", file: "Metis.png", dir: "companies-from-ben" },
  { name: "Vana", file: "Vana.jpg", dir: "portfolio-companies" },
  {
    name: "Algebra-Finance",
    file: "Algebra-Finance.jpg",
    dir: "portfolio-companies",
  },
  {
    name: "Unidentified Logo Q",
    file: "Unidentified-Logo-Q.jpg",
    dir: "network-of-universities/row-6",
  },
  { name: "DropSpaceNFT", file: "DropSpaceNFT.jpg", dir: "companies-from-ben" },
  {
    name: "Harvard Blockchain",
    file: "Harvard-Blockchain.jpg",
    dir: "network-of-universities/row-6",
  },
  { name: "Roll", file: "Roll.jpg", dir: "companies-from-ben" },
  { name: "Tenderize", file: "Tenderize.jpg", dir: "portfolio-companies" },
  {
    name: "Oxford Blockchain Society",
    file: "Oxford-Blockchain-Society.jpg",
    dir: "network-of-universities/row-1",
  },
  { name: "MUBC", file: "MUBC.jpg", dir: "network-of-universities/row-1" },
  { name: "G.A.M.E", file: "G.A.M.E.jpg", dir: "portfolio-companies" },
  {
    name: "Hackslash",
    file: "Hackslash.png",
    dir: "network-of-universities/row-6",
  },
  { name: "B.TECH", file: "B.TECH.png", dir: "network-of-universities/row-3" },
  { name: "GDA-Capital", file: "GDA-Capital.jpg", dir: "companies-from-ben" },
  {
    name: "Unidentified Logo R",
    file: "Unidentified-Logo-R.png",
    dir: "network-of-universities/row-6",
  },
  {
    name: "Kryptosphere",
    file: "Kryptosphere.png",
    dir: "network-of-universities/row-7",
  },
].map(withHref);

const COMPANIES_FROM_BEN = [
  {
    name: "Algorand",
    tagline: "L1",
    file: "Algorand.png",
    dir: "companies-from-ben",
  },
  {
    name: "Alpha Blockchain",
    tagline: "Research",
    file: "Alpha-Blockchain.png",
    dir: "companies-from-ben",
  },
  {
    name: "Au Sum Ventures",
    tagline: "Venture",
    file: "Au-Sum-Ventures.png",
    dir: "companies-from-ben",
  },
  {
    name: "Augur",
    tagline: "Prediction markets",
    file: "Augur.png",
    dir: "companies-from-ben",
  },
  {
    name: "Axelar",
    tagline: "Interoperability",
    file: "Axelar.png",
    dir: "companies-from-ben",
  },
  {
    name: "Bitquick",
    tagline: "Exchange",
    file: "Bitquick.png",
    dir: "companies-from-ben",
  },
  {
    name: "BlockHack",
    tagline: "Hackathon",
    file: "BlockHack.png",
    dir: "companies-from-ben",
  },
  {
    name: "Bolt",
    tagline: "Payments",
    file: "Bolt.png",
    dir: "companies-from-ben",
  },
  {
    name: "CoinList",
    tagline: "Launchpad",
    file: "CoinList.jpg",
    dir: "companies-from-ben",
  },
  {
    name: "Distributed ID",
    tagline: "Identity",
    file: "Distributed-ID.jpg",
    dir: "companies-from-ben",
  },
  {
    name: "DropSpaceNFT",
    tagline: "NFT",
    file: "DropSpaceNFT.jpg",
    dir: "companies-from-ben",
    href: "#",
  },
  {
    name: "Eco",
    tagline: "Payments",
    file: "Eco.png",
    dir: "companies-from-ben",
  },
  {
    name: "GDA Capital",
    tagline: "Fund",
    file: "GDA-Capital.jpg",
    dir: "companies-from-ben",
  },
  {
    name: "Immuto",
    tagline: "Data integrity",
    file: "Immuto.jpg",
    dir: "companies-from-ben",
  },
  { name: "Iota", tagline: "DLT", file: "Iota.png", dir: "companies-from-ben" },
  {
    name: "Metaverse Group",
    tagline: "Metaverse",
    file: "Metaverse-Group.png",
    dir: "companies-from-ben",
    href: "#",
  },
  {
    name: "Metis",
    tagline: "L2",
    file: "Metis.png",
    dir: "companies-from-ben",
  },
  {
    name: "Optimism",
    tagline: "L2 infrastructure",
    file: "Optimism.png",
    dir: "companies-from-ben",
  },
  { name: "Qtum", tagline: "L1", file: "Qtum.png", dir: "companies-from-ben" },
  {
    name: "Roll",
    tagline: "Social tokens",
    file: "Roll.jpg",
    dir: "companies-from-ben",
    href: "#",
  },
  {
    name: "SecretNetwork",
    tagline: "Privacy",
    file: "SecretNetwork.jpg",
    dir: "companies-from-ben",
    href: "#",
  },
  {
    name: "Secure Digital Markets",
    tagline: "Markets",
    file: "Secure-Digital-Markets.png",
    dir: "companies-from-ben",
    href: "#",
  },
].map(withHref);

const FOUNDERS_AND_PROJECTS = [
  {
    name: "Optimism",
    desc: "Scaling Ethereum through Layer 2 infrastructure.",
    href: OFFICIAL_LINKS["Optimism"],
    logoFile: "Optimism.png",
  },
  {
    name: "Iota",
    desc: "Distributed ledger technology for IoT and beyond.",
    href: OFFICIAL_LINKS["Iota"],
    logoFile: "Iota.png",
  },
  {
    name: "CoinList",
    desc: "Token launch platform and compliant onboarding.",
    href: OFFICIAL_LINKS["CoinList"],
    logoFile: "CoinList.jpg",
  },
  {
    name: "Axelar",
    desc: "Cross-chain interoperability for apps and assets.",
    href: OFFICIAL_LINKS["Axelar"],
    logoFile: "Axelar.png",
  },
  {
    name: "Metis",
    desc: "Layer 2 ecosystem focused on scalable execution.",
    href: OFFICIAL_LINKS["Metis"],
    logoFile: "Metis.png",
  },
  {
    name: "Roll",
    desc: "Social tokens for creators and communities.",
    href: "#",
    logoFile: "Roll.jpg",
  },
];

const UNICORNS = [
  {
    name: "Augur",
    tagline: "Prediction markets",
    file: "Augur.png",
    dir: "unicorns",
  },
  { name: "Iota", tagline: "DLT", file: "Iota.png", dir: "unicorns" },
  { name: "Bolt", tagline: "Payments", file: "Bolt.png", dir: "unicorns" },
  {
    name: "Optimism",
    tagline: "L2 infrastructure",
    file: "Optimism.png",
    dir: "unicorns",
  },
  {
    name: "Injective",
    tagline: "L1 DeFi infrastructure",
    file: "Injective.png",
    dir: "unicorns",
  },
];

const USERS = [
  "/images/people/jelena-djuric.jpeg",
  "/images/people/matt-batsinelas.jpeg",
  "/images/people/michael-gord.jpeg",
  "/images/people/joey-krug.jpeg",
  "/images/people/jinglan-wang.jpeg",
  "/images/jeremygardner.webp",
  "/images/people/ryan-breslow.jpeg",
  "/images/stories/drew-cousin.jpeg",
];

const TESTIMONIALS = [
  {
    name: "Sonny Monroe",
    title: "Community member",
    img: "/images/stories/sonny-monroe.jpg",
    quote:
      "BEN is like a swiss army knife with crypto news, education, meetups, and even some tools.",
  },
  {
    name: "Sarah Roff",
    title: "Community member",
    img: "/images/Sarahroff.png",
    quote:
      "BEN gives the best blockchain education so that we can become the next generation of innovators!",
  },
  {
    name: "Dr. Marko Suvajdzic",
    title: "Researcher",
    img: "/images/stories/dr-marko-suvajdzic-square.jpg",
    quote:
      "In my work to promote blockchain technology, BEN has been an invaluable resource.",
  },
];

export {
  OFFICIAL_LINKS,
  FLOATING_ICONS,
  COMPANIES_FROM_BEN,
  FOUNDERS_AND_PROJECTS,
  UNICORNS,
  USERS,
  TESTIMONIALS,
};
