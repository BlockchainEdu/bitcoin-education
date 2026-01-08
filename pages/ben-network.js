import React, { useMemo } from "react";
import Head from "next/head";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import StandardButton from "../components/standardButton";

const BASE = "/images/ben-network";
const BENEVENTS_IMG = "/images/benevents.png";

function imgSrc(path) {
  return encodeURI(path);
}

function joinSrc(...parts) {
  const clean = parts
    .filter(Boolean)
    .map((p) => String(p).replace(/^\/+|\/+$/g, ""));
  return imgSrc("/" + clean.join("/"));
}

function setFallbackImage(e, candidates) {
  const img = e.currentTarget;
  if (!img) return;

  const tried = new Set(
    (img.dataset.fallbackTried || "")
      .split("|")
      .map((x) => x.trim())
      .filter(Boolean)
  );

  for (const next of candidates) {
    if (!next || tried.has(next)) continue;
    tried.add(next);
    img.dataset.fallbackTried = Array.from(tried).join("|");
    img.src = next;
    return;
  }
}

function LogoImage({
  primaryDir,
  file,
  alt,
  className,
  loading = "lazy",
  fallbackDirs = [],
}) {
  const primary = joinSrc(BASE, primaryDir, file);
  const fallbacks = fallbackDirs.map((d) => joinSrc(BASE, d, file));

  return (
    <img
      src={primary}
      onError={(e) => setFallbackImage(e, fallbacks)}
      alt={alt || ""}
      className={className}
      loading={loading}
    />
  );
}

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

export default function BenNetwork() {
  const portfolioCompanies = useMemo(
    () => [
      {
        name: "Algebra Finance",
        tagline: "DeFi",
        file: "Algebra-Finance.jpg",
        dir: "portfolio-companies",
        href: "#",
      },
      {
        name: "Alpaca Network",
        tagline: "Infrastructure",
        file: "Alpaca-Network.jpeg",
        dir: "portfolio-companies",
        href: "#",
      },
      {
        name: "CreatorBid",
        tagline: "Creator economy",
        file: "CreatorBid.jpg",
        dir: "portfolio-companies",
        href: "#",
      },
      {
        name: "CWAP SWAP",
        tagline: "DEX / DeFi",
        file: "CWAP-SWAP.jpg",
        dir: "portfolio-companies",
        href: "#",
      },
      {
        name: "Flashy Cash",
        tagline: "Payments",
        file: "Flashy-Cash.jpg",
        dir: "portfolio-companies",
        href: "#",
      },
      {
        name: "G.A.M.E",
        tagline: "Gaming",
        file: "G.A.M.E.jpg",
        dir: "portfolio-companies",
        href: "#",
      },
      {
        name: "SatLayer",
        tagline: "Infrastructure",
        file: "SatLayer.png",
        dir: "portfolio-companies",
        href: "#",
      },
      {
        name: "Tenderize",
        tagline: "Staking",
        file: "Tenderize.jpg",
        dir: "portfolio-companies",
        href: "#",
      },
      {
        name: "Vana",
        tagline: "Data / AI",
        file: "Vana.jpg",
        dir: "portfolio-companies",
        href: "#",
      },
      {
        name: "YesNoError",
        tagline: "Dev tools",
        file: "YesNoError.png",
        dir: "portfolio-companies",
        href: "#",
      },
    ],
    []
  );

  const companiesFromBen = useMemo(
    () =>
      [
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
        {
          name: "Iota",
          tagline: "DLT",
          file: "Iota.png",
          dir: "companies-from-ben",
        },
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
        {
          name: "Qtum",
          tagline: "L1",
          file: "Qtum.png",
          dir: "companies-from-ben",
        },
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
      ].map(withHref),
    []
  );

  const universitiesByRow = useMemo(
    () => [
      {
        row: "row-1",
        items: [
          {
            name: "Alabama Blockchain Innovation Academy",
            file: "Alabama-Blockchain-Innovation-Academy.jpg",
          },
          {
            name: "Association of Cryptocurrency Education",
            file: "Association-of-Cryptocurrency-Education.png",
          },
          { name: "B and C GT", file: "B-and-C-GT.png" },
          {
            name: "Blockchain at Columbia",
            file: "Blockchain-at-Columbia.png",
          },
          { name: "Crypto Club", file: "Crypto-Club.png" },
          {
            name: "Marquette Blockchain Lab",
            file: "Marquette-Blockchain-Lab.jpg",
          },
          { name: "Middlebury College", file: "Middlebury-College.jpg" },
          { name: "MUBC", file: "MUBC.jpg" },
          { name: "OBC", file: "OBC.png" },
          {
            name: "Oxford Blockchain Society",
            file: "Oxford-Blockchain-Society.jpg",
          },
          { name: "Singapore Polytechnic", file: "Singapore-Polytechnic.png" },
          { name: "TBC", file: "TBC.png" },
          { name: "Unidentified Logo A", file: "Unidentified-Logo-A.png" },
          { name: "Unidentified Logo B", file: "Unidentified-Logo-B.png" },
          { name: "VCU", file: "VCU.jpg" },
        ],
      },
      {
        row: "row-2",
        items: [
          { name: "1848", file: "1848.png" },
          { name: "BC Blockchain", file: "BC-Blockchain.png" },
          {
            name: "BTC Istanbul Bilgi University",
            file: "BTC-Istanbul-Bilgi-University.jpg",
          },
          {
            name: "Harvard Business School",
            file: "Harvard-Business-School.png",
          },
          { name: "HLSBFI", file: "HLSBFI.png" },
          { name: "Knust Blockchain Hub", file: "Knust-Blockchain-Hub.jpg" },
          { name: "Link", file: "Link.png" },
          { name: "Luu Cabs", file: "Luu-Cabs.png" },
          {
            name: "Rutgers Business School Blockchain Hub",
            file: "Rutgers-Business-School-Blockchain-Hub.png",
          },
          { name: "Spartan Blockchain", file: "Spartan-Blockchain.png" },
          { name: "UB", file: "UB.png" },
          { name: "Unidentified Logo C", file: "Unidentified-Logo-C.png" },
          { name: "Unidentified Logo D", file: "Unidentified-Logo-D.png" },
          { name: "Unidentified Logo E", file: "Unidentified-Logo-E.png" },
          { name: "WSU Blockchain Club", file: "WSU-Blockchain-Club.png" },
        ],
      },
      {
        row: "row-3",
        items: [
          { name: "B.TECH", file: "B.TECH.png" },
          { name: "Blockchain at Mason", file: "Blockchain-at-Mason.png" },
          {
            name: "Blockchain at Michigan",
            file: "Blockchain-at-Michigan.png",
          },
          { name: "Blockchain Collective", file: "Blockchain-Collective.png" },
          { name: "Blockchain Lab at NYU", file: "Blockchain-Lab-at-NYU.jpg" },
          {
            name: "Blockchain Ryerson University",
            file: "Blockchain-Ryerson-University.png",
          },
          { name: "Bull", file: "Bull.png" },
          { name: "Drexel Blockchain", file: "Drexel-Blockchain.png" },
          {
            name: "Frankfurt School Blockchain Center",
            file: "Frankfurt-School-Blockchain-Center.png",
          },
          { name: "Itu Blockchain", file: "Itu-Blockchain.jpg" },
          { name: "Trojan Crypto", file: "Trojan-Crypto.png" },
          { name: "UNIC", file: "UNIC.png" },
          { name: "Unidentified Logo F", file: "Unidentified-Logo-F.png" },
          { name: "Unidentified Logo G", file: "Unidentified-Logo-G.png" },
          { name: "Unidentified Logo H", file: "Unidentified-Logo-H.png" },
        ],
      },
      {
        row: "row-4",
        items: [
          { name: "Blockchain Lab", file: "Blockchain-Lab.png" },
          { name: "CU Blockchain", file: "CU-Blockchain.png" },
          { name: "Fapa Tech", file: "Fapa-Tech.png" },
          {
            name: "Finance and Investment Club Uniandes",
            file: "Finance-and-Investment-Club-Uniandes.jpg",
          },
          { name: "Harding Hawks", file: "Harding-Hawks.png" },
          { name: "Minority Programmers", file: "Minority-Programmers.png" },
          {
            name: "Nova SouthEastern University",
            file: "Nova-SouthEastern-University.png",
          },
          {
            name: "Omaha Blockchain Initiative",
            file: "Omaha-Blockchain-Initiative.png",
          },
          { name: "Penn Blockchain", file: "Penn-Blockchain.png" },
          { name: "PVFO", file: "PVFO.png" },
          { name: "T", file: "T.png" },
          { name: "TIBA", file: "TIBA.png" },
          { name: "Unidentified Logo I", file: "Unidentified-Logo-I.jpg" },
          { name: "Unidentified Logo J", file: "Unidentified-Logo-J.jpg" },
          { name: "Unidentified Logo K", file: "Unidentified-Logo-K.png" },
        ],
      },
      {
        row: "row-5",
        items: [
          { name: "BaNSC", file: "BaNSC.jpg" },
          {
            name: "Birla Institute of Technology and Science Pilani",
            file: "Birla-Institute-of-Technology-and-Science-Pilani.png",
          },
          { name: "Blockchain at McGill", file: "Blockchain-at-McGill.jpg" },
          { name: "Blockchain Club", file: "Blockchain-Club.png" },
          {
            name: "Blockchain Society of Carleton",
            file: "Blockchain-Society-of-Carleton.png",
          },
          { name: "CMU Blockchain", file: "CMU-Blockchain.png" },
          { name: "Cornell Blockchain", file: "Cornell-Blockchain.png" },
          { name: "Elon Blockchain", file: "Elon-Blockchain.png" },
          { name: "IEEE Computer Society", file: "IEEE-Computer-Society.png" },
          { name: "IEEE", file: "IEEE.png" },
          {
            name: "Istanbul University Blockchain Technology Club",
            file: "Istanbul-University-Blockchain-Technology-Club.png",
          },
          {
            name: "Kocaeli University Blockchain Technology Club",
            file: "Kocaeli-University-Blockchain-Technology-Club.jpg",
          },
          { name: "MCC", file: "MCC.jpg" },
          { name: "Unidentified Logo L", file: "Unidentified-Logo-L.jpg" },
          { name: "Unidentified Logo M", file: "Unidentified-Logo-M.png" },
        ],
      },
      {
        row: "row-6",
        items: [
          { name: "Bennett University", file: "Bennett-University.png" },
          {
            name: "Blockchain at Berkeley",
            file: "Blockchain-at-Berkeley.png",
          },
          { name: "Blockchain Collective", file: "Blockchain-Collective.png" },
          { name: "Hackslash", file: "Hackslash.png" },
          { name: "Harvard Blockchain", file: "Harvard-Blockchain.jpg" },
          { name: "Muba", file: "Muba.jpg" },
          { name: "Stanford Blockchain", file: "Stanford-Blockchain.jpg" },
          { name: "Sup de Vinci", file: "Sup-de-Vinci.png" },
          { name: "Unidentified Logo N", file: "Unidentified-Logo-N.png" },
          { name: "Unidentified Logo O", file: "Unidentified-Logo-O.png" },
          { name: "Unidentified Logo P", file: "Unidentified-Logo-P.png" },
          { name: "Unidentified Logo Q", file: "Unidentified-Logo-Q.jpg" },
          { name: "Unidentified Logo R", file: "Unidentified-Logo-R.png" },
          { name: "Unidentified Logo S", file: "Unidentified-Logo-S.png" },
        ],
      },
      {
        row: "row-7",
        items: [
          { name: "Badger Blockchain", file: "Badger-Blockchain.jpg" },
          {
            name: "Blockchain Cleveland State",
            file: "Blockchain-Cleveland-State.png",
          },
          {
            name: "Financial Group Javeriana",
            file: "Financial-Group-Javeriana.png",
          },
          { name: "HUBG", file: "HUBG.png" },
          { name: "Kryptosphere", file: "Kryptosphere.png" },
          { name: "Ru", file: "Ru.jpg" },
          { name: "Subchain", file: "Subchain.jpg" },
          { name: "Unidentified Logo T", file: "Unidentified-Logo-T.jpg" },
          { name: "Unidentified Logo U", file: "Unidentified-Logo-U.png" },
        ],
      },
    ],
    []
  );

  const foundersAndProjects = useMemo(
    () => [
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
    ],
    []
  );

  const unicorns = useMemo(
    () => [
      {
        name: "Augur",
        tagline: "Prediction markets",
        file: "Augur.png",
        dir: "unicorns",
      },
      {
        name: "Iota",
        tagline: "DLT",
        file: "Iota.png",
        dir: "unicorns",
      },
      {
        name: "Bolt",
        tagline: "Payments",
        file: "Bolt.png",
        dir: "unicorns",
      },
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
    ],
    []
  );

  const alumni = useMemo(
    () => [
      {
        name: "Jeremy Gardner",
        role: "Founder",
        company: "Augur",
        subtitle: "University of Michigan",
        image: `${BASE}/alumni/Jeremy_Gardner.png`,
      },
      {
        name: "Michael Gord",
        role: "Founder",
        company: "GDA Capital",
        subtitle: "McGill University",
        image: `${BASE}/alumni/Michael_Gord.png`,
      },
      {
        name: "Ryan Breslow",
        role: "Founder",
        company: "Bolt",
        subtitle: "Stanford University",
        image: `${BASE}/alumni/Ryan_Breslow.png`,
      },
      {
        name: "Jinglan Wang",
        role: "Co-founder",
        company: "Optimism",
        subtitle: "Wellesley / MIT",
        image: `${BASE}/alumni/Jinglan_Wang.png`,
      },
      {
        name: "Joey Krug",
        role: "Founder",
        company: "Augur",
        subtitle: "Pomona Dropout",
        image: `${BASE}/alumni/Joey_Krug.png`,
      },
      {
        name: "Bradley Miles",
        role: "Co-founder",
        company: "Roll",
        subtitle: "Columbia University",
        image: `${BASE}/alumni/Bradley_Miles.png`,
      },
      {
        name: "Sid Ramesh",
        role: "Growth Advisor",
        company: "Notional",
        subtitle: "UW-Madison",
        image: `${BASE}/alumni/Sid_Ramesh.png`,
      },
      {
        name: "Eric Chen",
        role: "Founder",
        company: "Injective",
        subtitle: "New York University",
        image: `${BASE}/alumni/Eric_Chen.png`,
      },
      {
        name: "Dean Masley",
        role: "Founder",
        company: "NestEgg",
        subtitle: "University of Delaware",
        image: `${BASE}/alumni/Dean_Masley.png`,
      },
    ],
    []
  );

  const users = [
    "/images/people/jelena-djuric.jpeg",
    "/images/people/matt-batsinelas.jpeg",
    "/images/people/michael-gord.jpeg",
    "/images/people/joey-krug.jpeg",
    "/images/people/jinglan-wang.jpeg",
    "/images/jeremygardner.webp",
    "/images/people/ryan-breslow.jpeg",
    "/images/stories/drew-cousin.jpeg",
  ];

  const floating = useMemo(() => {
    const pick = [...portfolioCompanies, ...companiesFromBen].map(withHref);
    const uniq = [];
    const seen = new Set();

    for (const item of pick) {
      if (!item?.file) continue;
      const key = item.file.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      uniq.push(item);
    }

    return uniq.slice(0, 25);
  }, [portfolioCompanies, companiesFromBen]);

  return (
    <div className="bg-benwhite-500 min-h-screen text-benblack-500">
      <Head>
        <title>TESTE BEN Network | Blockchain Education Network</title>
        <meta
          name="description"
          content="BEN Network: a global network of student founders, alumni and companies built through the Blockchain Education Network"
        />
      </Head>

      <HeaderWithLogoDark />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-benorange-100 opacity-90" />
        <div className="hero-vignette" aria-hidden="true" />

        {/* Floating logos */}
        <div className="floating-layer absolute inset-0">
          {floating.map((l, idx) => {
            const sizeVariant =
              idx % 9 === 0
                ? "xl"
                : idx % 5 === 0
                ? "lg"
                : idx % 3 === 0
                ? "sm"
                : "md";

            const positions = [
              { top: 10, left: 8 },
              { top: 14, left: 18 },
              { top: 8, left: 26 },
              { top: 8, left: 95 },
              { top: 10, left: 74 },
              { top: 12, left: 84 },
              { top: 26, left: 10 },
              { top: 30, left: 24 },
              { top: 75, left: 20 },
              { top: 80, left: 83 },
              { top: 29, left: 77 },
              { top: 26, left: 90 },
              { top: 46, left: 6 },
              { top: 44, left: 18 },
              { top: 80, left: 30 },
              { top: 82, left: 71 },
              { top: 48, left: 82 },
              { top: 41, left: 95 },
              { top: 65, left: 12 },
              { top: 60, left: 28 },
              { top: 86, left: 10 },
              { top: 88, left: 92 },
              { top: 62, left: 76 },
              { top: 60, left: 90 },
            ];

            const p = positions[idx % positions.length];
            const sizeClass =
              idx % 7 === 0
                ? "floating-chip lg"
                : idx % 5 === 0
                ? "floating-chip sm"
                : "floating-chip";

            const v = `floatv${(idx % 3) + 1}`;
            const href = l.href || "#";
            const clickable = href && href !== "#";

            return (
              <a
                key={`${l.name}-${idx}`}
                href={href}
                target={clickable ? "_blank" : undefined}
                rel={clickable ? "noopener noreferrer" : undefined}
                aria-label={clickable ? `Abrir site de ${l.name}` : l.name}
                title={clickable ? `Abrir ${l.name}` : l.name}
                className={`${sizeClass} ${v} size-${sizeVariant} ${
                  clickable ? "is-clickable" : "is-disabled"
                }`}
                style={{ top: `${p.top}%`, left: `${p.left}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!clickable) e.preventDefault();
                }}
              >
                <div className="floating-chip-inner">
                  <LogoImage
                    primaryDir={l.dir || "companies-from-ben"}
                    fallbackDirs={["companies-from-ben", "portfolio-companies"]}
                    file={l.file}
                    className="floating-img"
                    alt={l.name}
                  />
                </div>
              </a>
            );
          })}
        </div>

        <div className="relative container mx-auto pt-24 pb-16 px-6 hero-content">
          <div className="hero-badge inline-flex items-center gap-4 rounded-full bg-white/70 backdrop-blur border border-black/5 px-4 py-2 text-xs mb-6 shadow-sm">
            <span className="font-semibold">Proof of impact</span>
            <span className="opacity-70">
              $20B+ in value created, 160+ chapters in 35+ countries and 2.2M
              impressions on X
            </span>
          </div>

          <div className="max-w-xl mx-auto text-center hero-glass">
            <div className="hero-glass-content">
              <h1 className="flex items-center justify-center gap-3 lg:gap-4 leading-none">
                <img
                  src="/images/ben-network/ben-network-logo.png"
                  alt="BEN"
                  className="h-20 w-auto sm:h-12 lg:h-auto drop-shadow-[0_10px_18px_rgba(0,0,0,0.12)]"
                  loading="eager"
                  decoding="async"
                />
              </h1>

              <p className="mt-5 text-base md:text-lg text-benblack-500/80 max-w-2xl mx-auto">
                A global network of student founders, alumni and companies built
                through the Blockchain Education Network
              </p>

              <div className="hero-media mt-8">
                <div className="benevents-card">
                  <div className="benevents-frame">
                    <img
                      src={BENEVENTS_IMG}
                      alt="BEN Events"
                      className="benevents-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3">
                <a
                  className="btn-premium"
                  href="/opportunities"
                  onClick={(e) => e.stopPropagation()}
                >
                  Apply <span className="arrow">→</span>
                </a>
              </div>

              <div className="mt-8 text-center">
                <div className="flex justify-center">
                  {users.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`User ${i + 1}`}
                      className="w-10 h-10 rounded-full border-2 border-benorange -ml-2 object-cover"
                    />
                  ))}
                </div>

                <p className="mt-2 text-sm text-bengrey-500">
                  📡 Followed by 25k+ in Web3
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNICORNS / MAJOR */}
      <section id="unicorns" className="bg-gray-50 py-16 mb-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Unicorns and major companies 🦄
              </h2>
              <p className="mt-2 text-sm text-benblack-500/70">
                A selection of well-known companies connected to the BEN
                ecosystem
              </p>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
              {unicorns.map((c) => (
                <div key={c.name} className="logo-card reveal">
                  <div className="logo-wrap">
                    <LogoImage
                      primaryDir={c.dir}
                      fallbackDirs={["companies-from-ben"]}
                      file={c.file}
                      alt={c.name}
                      className="logo-img"
                    />
                  </div>
                  <div className="mt-3">
                    <div className="text-sm font-semibold">{c.name}</div>
                    {c.tagline ? (
                      <div className="text-xs text-benblack-500/60">
                        {c.tagline}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NOTABLE ALUMNI */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-black/5 px-2 py-2 text-xs shadow-sm mb-6">
                <span className="font-semibold">Notable Alumni</span>
                <span className="opacity-70">
                  Founders and leaders from the BEN network
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight font-mont">
                <span className="text-benorange-500">Our</span>{" "}
                <span className="text-benblack-500">Alumni</span>
              </h2>
              <p className="mt-2 text-sm text-benblack-500/70">
                Proof of builders. Names you can recognize, work you can measure
              </p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {alumni.map((a) => (
                <div key={a.name} className="alumni-card alumni-glow reveal">
                  <div className="alumni-avatar-wrap alumni-icon-glow">
                    <div className="alumni-avatar">
                      <img
                        src={imgSrc(a.image)}
                        alt={a.name}
                        className="alumni-avatar-img"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="alumni-body">
                    <div className="alumni-name">{a.name}</div>
                    <div className="alumni-title">
                      {a.role},{" "}
                      <span className="alumni-company">{a.company}</span>
                    </div>
                    <div className="alumni-subtitle">{a.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLASS OF 2025 */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Class of 2025
              </h2>
              <p className="mt-2 text-sm text-benblack-500/70">
                Current builders and projects coming out of the network
              </p>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {companiesFromBen.slice(0, 18).map((c) => (
                <div key={c.name} className="mini-logo reveal">
                  <LogoImage
                    primaryDir={c.dir}
                    fallbackDirs={["portfolio-companies"]}
                    file={c.file}
                    alt={c.name}
                    className="mini-logo-img"
                  />
                  <div className="mt-2 text-xs font-semibold text-center">
                    {c.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS & PROJECTS */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                BEN founders and projects
              </h2>
              <p className="mt-2 text-sm text-benblack-500/70">
                A curated set of founders and projects shaped by the BEN
                community
              </p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {foundersAndProjects.map((p) => {
                const href = p.href || "#";
                const clickable = href && href !== "#";

                return (
                  <div key={p.name} className="card-premium reveal">
                    <div className="flex items-start gap-4">
                      {p.logoFile ? (
                        <a
                          href={href}
                          target={clickable ? "_blank" : undefined}
                          rel={clickable ? "noopener noreferrer" : undefined}
                          aria-label={
                            clickable ? `Abrir site de ${p.name}` : p.name
                          }
                          title={clickable ? `Abrir ${p.name}` : p.name}
                          className={`project-logo ${
                            clickable ? "cursor-pointer" : "cursor-default"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!clickable) e.preventDefault();
                          }}
                        >
                          <LogoImage
                            primaryDir="companies-from-ben"
                            fallbackDirs={["portfolio-companies"]}
                            file={p.logoFile}
                            alt={p.name}
                            className="project-logo-img"
                          />
                        </a>
                      ) : null}

                      <div>
                        <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
                        <p className="text-sm text-benblack-500/70">{p.desc}</p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section id="universities" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Universities
              </h2>
              <p className="mt-2 text-sm text-benblack-500/70">
                A global footprint across campuses and student-led organizations
              </p>
            </header>

            <div className="university-row reveal">
              <div className="row-grid">
                {universitiesByRow
                  .flatMap((row) =>
                    row.items.map((u) => ({ ...u, row: row.row }))
                  )
                  .map((u) => (
                    <div
                      key={`${u.row}-${u.name}-${u.file}`}
                      className="uni-logo"
                      title={u.name}
                    >
                      <img
                        src={imgSrc(
                          `${BASE}/network-of-universities/${u.row}/${u.file}`
                        )}
                        onError={(e) =>
                          setFallbackImage(e, [
                            imgSrc(
                              `${BASE}/network-of-universities/${u.row}/${u.file}`
                            ),
                            imgSrc(
                              `${BASE}/network-of-universities/row-1/${u.file}`
                            ),
                            imgSrc(
                              `${BASE}/network-of-universities/row-2/${u.file}`
                            ),
                            imgSrc(
                              `${BASE}/network-of-universities/row-3/${u.file}`
                            ),
                            imgSrc(
                              `${BASE}/network-of-universities/row-4/${u.file}`
                            ),
                            imgSrc(
                              `${BASE}/network-of-universities/row-5/${u.file}`
                            ),
                            imgSrc(
                              `${BASE}/network-of-universities/row-6/${u.file}`
                            ),
                            imgSrc(
                              `${BASE}/network-of-universities/row-7/${u.file}`
                            ),
                          ])
                        }
                        alt={u.name}
                        className="uni-logo-img"
                        loading="lazy"
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <a
                className="btn-ghost"
                href="/ben-network#unicorns"
                onClick={(e) => e.stopPropagation()}
              >
                Back to top companies <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .btn-premium,
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 999px;
          font-weight: 600;
          transition: background 180ms ease, color 180ms ease,
            transform 120ms ease, box-shadow 180ms ease, border-color 180ms ease;
          user-select: none;
          text-decoration: none;
        }
        .btn-premium {
          background: #111;
          color: #fff;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
        .btn-premium:hover {
          background: #fff;
          color: #111;
          transform: translateY(-1px);
        }
        .btn-premium:active {
          transform: translateY(0px) scale(0.99);
        }
        .btn-ghost {
          background: rgba(255, 255, 255, 0.7);
          color: #111;
          border: 1px solid rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(8px);
        }
        .btn-ghost:hover {
          background: #111;
          color: #fff;
          transform: translateY(-1px);
          border-color: rgba(0, 0, 0, 0.14);
        }
        .arrow {
          transition: transform 180ms ease;
        }
        .btn-premium:hover .arrow,
        .btn-ghost:hover .arrow {
          transform: translateX(3px);
        }

        .logo-card {
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 18px;
          padding: 16px;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
          transition: transform 160ms ease, box-shadow 180ms ease,
            border-color 180ms ease;
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        .logo-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 4px;
          background: linear-gradient(
            135deg,
            #a855f7,
            #22d3ee,
            #60a5fa,
            #fb7185,
            #f59e0b
          );
          opacity: 0;
          transition: opacity 180ms ease, filter 180ms ease;
          pointer-events: none;
          -webkit-mask: linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .logo-card span,
        .logo-card .logo-wrap {
          position: relative;
          z-index: 1;
        }

        .logo-card::after {
          content: "";
          position: absolute;
          inset: -14px;
          border-radius: inherit;
          pointer-events: none;
          z-index: -1;
          opacity: 0;
          filter: blur(14px);
          transition: opacity 180ms ease;
          background: radial-gradient(
              180px 100px at 10% 12%,
              rgba(168, 85, 247, 0.2),
              transparent 62%
            ),
            radial-gradient(
              180px 140px at 92% 14%,
              rgba(34, 211, 238, 0.22),
              transparent 60%
            ),
            radial-gradient(
              120px 190px at 12% 90%,
              rgba(96, 165, 250, 0.18),
              transparent 60%
            ),
            radial-gradient(
              185px 120px at 92% 90%,
              rgba(251, 113, 133, 0.32),
              transparent 62%
            );
        }

        .logo-card:hover {
          transform: translateY(-1px);

          box-shadow: 15px 10px 25px 20px rgba(255, 255, 255, 1),
            0 0 10px rgba(255, 255, 255, 0.95),
            0 0 22px rgba(255, 255, 255, 0.8),
            0 0 40px rgba(173, 216, 255, 0.66),
            0 15px 70px rgba(255, 200, 150, 0.35),
            -10px -10px 45px rgba(0, 0, 0, 0.1);
        }

        .logo-card:hover::before {
          opacity: 1;
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.65))
            drop-shadow(0 0 14px rgba(255, 255, 255, 0.35))
            drop-shadow(0 0 22px rgba(168, 85, 247, 0.25))
            drop-shadow(0 0 28px rgba(34, 211, 238, 0.22));
        }

        .logo-card:hover::after {
          opacity: 1;
        }

        @media (prefers-reduced-motion: no-preference) {
          .logo-card:hover::before {
            background-size: 200% 200%;
            animation: unicornShift 2.2s ease-in-out infinite;
          }
          @keyframes unicornShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        }

        .logo-wrap {
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo-img {
          max-height: 56px;
          max-width: 100%;
          object-fit: contain;
        }

        .card-premium {
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
          transition: transform 160ms ease, box-shadow 180ms ease,
            border-color 180ms ease;
        }
        .card-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 46px rgba(0, 0, 0, 0.1);
          border-color: rgba(0, 0, 0, 0.1);
        }

        .project-logo {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: rgba(0, 0, 0, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          overflow: hidden;
        }
        .project-logo-img {
          width: 34px;
          height: 34px;
          object-fit: contain;
        }

        .mini-logo {
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 18px;
          padding: 14px;
          transition: transform 160ms ease, box-shadow 180ms ease;
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.05);
        }
        .mini-logo:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.09);
        }
        .mini-logo-img {
          width: 100%;
          height: 44px;
          object-fit: contain;
        }

        .university-row {
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 14px;
          background: #fff;
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.04);
        }
        .row-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }
        @media (min-width: 640px) {
          .row-grid {
            grid-template-columns: repeat(5, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .row-grid {
            grid-template-columns: repeat(8, minmax(0, 1fr));
          }
        }

        .uni-logo {
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          background: rgba(0, 0, 0, 0.02);
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 160ms ease, background 180ms ease,
            box-shadow 180ms ease;
        }
        .uni-logo:hover {
          transform: translateY(-2px);
          background: rgba(0, 0, 0, 0.03);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
        }
        .uni-logo-img {
          max-height: 44px;
          max-width: 90%;
          object-fit: contain;
        }

        .floating-layer {
          z-index: 5;
          pointer-events: none;
        }

        .floating-chip {
          position: absolute;
          width: 62px;
          height: 62px;
          border-radius: 18px;
          transform: translate(-50%, -50%);
          opacity: 0.9;
          filter: drop-shadow(0 14px 30px rgba(0, 0, 0, 0.12));
          pointer-events: auto;
          text-decoration: none;
          cursor: pointer;
          z-index: 60;
          will-change: transform, filter;
        }

        .floating-chip:focus-visible {
          outline: 2px solid rgba(0, 0, 0, 0.35);
          outline-offset: 3px;
        }

        .floating-chip-inner {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(8px);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 160ms ease;
        }

        .floating-chip:hover .floating-chip-inner {
          transform: translateY(-1px);
        }

        .floating-img {
          width: 70%;
          height: 70%;
          object-fit: contain;
          pointer-events: none;
        }

        .hero-content {
          z-index: 20;
          pointer-events: none;
        }

        .hero-content a,
        .hero-content button,
        .hero-content [role="button"] {
          pointer-events: auto;
        }

        .hero-badge {
          position: absolute;
          top: 75px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 30;
          pointer-events: auto;
          width: min(87vw, 575px);
          justify-content: center;
        }

        .hero-badge > span:first-child {
          white-space: nowrap;
          flex: 0 0 auto;
        }

        .hero-badge > span:last-child {
          flex: 1 1 auto;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 640px) {
          .hero-badge {
            top: 64px;
            padding: 10px 14px;
            gap: 10px;
            font-size: 12px;
          }
        }

        .hero-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
              circle at 50% 45%,
              rgba(255, 255, 255, 0.92),
              rgba(255, 255, 255, 0) 60%
            ),
            linear-gradient(
              to right,
              rgba(255, 255, 255, 0.65),
              rgba(255, 255, 255, 0) 30%,
              rgba(255, 255, 255, 0) 70%,
              rgba(255, 255, 255, 0.65)
            );
          z-index: 0;
        }

        .hero-glass {
          position: relative;
          padding: 22px 18px;
          border-radius: 28px;
          overflow: visible;
          isolation: isolate;
          z-index: 0;
        }

        .hero-glass-content {
          position: relative;
          z-index: 2;
          transform: translateZ(0);
        }

        .hero-glass::before {
          content: "";
          position: absolute;
          inset: -80px;
          border-radius: inherit;
          pointer-events: none;
          z-index: 0;
          background: rgba(255, 255, 255, 0.66);
          filter: blur(80px);
          -webkit-mask-image: radial-gradient(
            70% 65% at 50% 45%,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.95) 38%,
            rgba(0, 0, 0, 0.55) 62%,
            rgba(0, 0, 0, 0) 100%
          );
          mask-image: radial-gradient(
            70% 65% at 50% 45%,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.95) 38%,
            rgba(0, 0, 0, 0.55) 62%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        .hero-glass::after {
          content: "";
          position: absolute;
          inset: -80px;
          border-radius: inherit;
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(
              70% 65% at 50% 45%,
              rgba(255, 255, 255, 0.55) 0%,
              rgba(255, 255, 255, 0.22) 45%,
              rgba(255, 255, 255, 0) 75%
            ),
            radial-gradient(rgba(0, 0, 0, 0.025) 1px, transparent 0) 0 0 / 3px
              3px;
          -webkit-mask-image: radial-gradient(
            70% 65% at 50% 45%,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.9) 40%,
            rgba(0, 0, 0, 0.45) 65%,
            rgba(0, 0, 0, 0) 100%
          );
          mask-image: radial-gradient(
            70% 65% at 50% 45%,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.9) 40%,
            rgba(0, 0, 0, 0.45) 65%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        .hero-media {
          display: flex;
          justify-content: center;
          pointer-events: auto;
        }
        .benevents-card {
          width: min(520px, 92%);
          border-radius: 22px;
          border: 1px solid rgba(0, 0, 0, 0.06);
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          box-shadow: 0 18px 46px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: transform 160ms ease, box-shadow 180ms ease,
            border-color 180ms ease;
        }
        .benevents-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 26px 70px rgba(0, 0, 0, 0.12);
          border-color: rgba(0, 0, 0, 0.1);
        }
        .benevents-frame {
          position: relative;
          width: 100%;
          background: radial-gradient(
              260px 120px at 12% 12%,
              rgba(255, 135, 42, 0.18),
              transparent 58%
            ),
            radial-gradient(
              260px 120px at 92% 18%,
              rgba(34, 211, 238, 0.14),
              transparent 60%
            ),
            rgba(255, 255, 255, 0.55);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }
        .benevents-img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          transform: translateZ(0);
        }
        .benevents-caption {
          padding: 12px 14px 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .benevents-pill {
          font-size: 12px;
          font-weight: 700;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.75);
        }
        .benevents-text {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.65);
        }

        .alumni-card {
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
          transition: transform 160ms ease, box-shadow 180ms ease,
            border-color 180ms ease;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .alumni-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 46px rgba(0, 0, 0, 0.1);
          border-color: rgba(0, 0, 0, 0.1);
        }
        .alumni-avatar {
          width: 70px;
          height: 70px;
          border-radius: 999px;
          overflow: hidden;
          flex: 0 0 auto;
          background: rgba(0, 0, 0, 0.02);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
          overflow: hidden !important;
        }

        .alumni-avatar-wrap {
          position: relative;
        }

        .alumni-icon-glow {
          overflow: visible;
        }

        .alumni-avatar {
          overflow: hidden;
          border-radius: 999px;
          width: 70px;
          height: 70px;
        }

        .alumni-avatar-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform 220ms ease;
        }
        .alumni-card:hover .alumni-avatar-img {
          transform: scale(1.06);
        }
        .alumni-body {
          min-width: 0;
        }
        .alumni-name {
          font-weight: 700;
          font-size: 16px;
          line-height: 1.2;
        }
        .alumni-title {
          margin-top: 6px;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.72);
        }
        .alumni-subtitle {
          margin-top: 2px;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.55);
        }
        .alumni-company {
          font-weight: 700;
          color: #ff872a;
        }

        @keyframes floatY2 {
          0% {
            transform: translate(-50%, -50%) translate3d(0, 0, 0) rotate(0deg)
              scale(1);
          }
          50% {
            transform: translate(-50%, -50%) translate3d(0, -18px, 0)
              rotate(3deg) scale(1.03);
          }
          100% {
            transform: translate(-50%, -50%) translate3d(0, 0, 0) rotate(0deg)
              scale(1);
          }
        }
        @keyframes driftX2 {
          0% {
            transform: translate(-50%, -50%) translate3d(0, 0, 0);
          }
          50% {
            transform: translate(-50%, -50%) translate3d(14px, 0, 0);
          }
          100% {
            transform: translate(-50%, -50%) translate3d(0, 0, 0);
          }
        }
        @keyframes bobShadow {
          0% {
            filter: drop-shadow(0 14px 30px rgba(0, 0, 0, 0.12));
          }
          50% {
            filter: drop-shadow(0 22px 46px rgba(0, 0, 0, 0.16));
          }
          100% {
            filter: drop-shadow(0 14px 30px rgba(0, 0, 0, 0.12));
          }
        }

        .floatv1 {
          animation: floatY2 5.8s ease-in-out infinite,
            bobShadow 5.8s ease-in-out infinite;
        }
        .floatv2 {
          animation: floatY2 7.2s ease-in-out infinite,
            driftX2 9.4s ease-in-out infinite,
            bobShadow 7.2s ease-in-out infinite;
        }
        .floatv3 {
          animation: floatY2 6.4s ease-in-out infinite,
            driftX2 12s ease-in-out infinite,
            bobShadow 6.4s ease-in-out infinite;
        }

        .reveal {
          transform: translateY(10px);
          opacity: 0.001;
          animation: revealIn 520ms ease forwards;
        }

        @keyframes revealIn {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-chip,
          .floatv1,
          .floatv2,
          .floatv3,
          .logo-card,
          .card-premium,
          .mini-logo,
          .uni-logo,
          .btn-premium,
          .btn-ghost,
          .arrow {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            filter: none !important;
          }

          .reveal {
            opacity: 1 !important;
          }
        }

        @media (prefers-reduced-motion: no-preference) {
          .alumni-glow::before {
            background-size: 220% 220%;
            animation: alumniOrangeShift 3.2s ease-in-out infinite;
          }

          @keyframes alumniOrangeShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        }

        .alumni-icon-glow::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 999px;
          padding: 3px;
          pointer-events: none;
          z-index: 1;

          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95),
            #ff5900cc,
            #f7c9a1d5,
            rgba(255, 255, 255, 0.95)
          );

          -webkit-mask: linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;

          opacity: 0.95;
          filter: drop-shadow(0 0 6px rgba(255, 135, 42, 0.22));
        }

        @media (prefers-reduced-motion: no-preference) {
          .alumni-icon-glow::before {
            background-size: 220% 220%;
            animation: alumniOrangeShift 3.2s ease-in-out infinite;
          }
        }
        .size-sm {
          width: 92px;
          height: 92px;
        }
        .size-md {
          width: 76px;
          height: 76px;
        }
        .size-lg {
          width: 93px;
          height: 93px;
        }
        .size-xl {
          width: 98px;
          height: 98px;
        }
      `}</style>
    </div>
  );
}
