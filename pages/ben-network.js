import React, { useMemo } from "react";
import Head from "next/head";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import StandardButton from "../components/standardButton";

const BASE = "/images/ben-network";

function imgSrc(path) {
  return encodeURI(path);
}

export default function BenNetwork() {
  const portfolioCompanies = useMemo(
    () => [
      { name: "Algebra Finance", tagline: "DeFi", file: "Algebra-Finance.jpg" },
      {
        name: "Alpaca Network",
        tagline: "Infrastructure",
        file: "Alpaca-Network.jpeg",
      },
      {
        name: "CreatorBid",
        tagline: "Creator economy",
        file: "CreatorBid.jpg",
      },
      { name: "CWAP SWAP", tagline: "DEX / DeFi", file: "CWAP-SWAP.jpg" },
      { name: "Flashy Cash", tagline: "Payments", file: "Flashy-Cash.jpg" },
      { name: "G.A.M.E", tagline: "Gaming", file: "G.A.M.E.jpg" },
      { name: "SatLayer", tagline: "Infrastructure", file: "SatLayer.png" },
      { name: "Tenderize", tagline: "Staking", file: "Tenderize.jpg" },
      { name: "Vana", tagline: "Data / AI", file: "Vana.jpg" },
      { name: "YesNoError", tagline: "Dev tools", file: "YesNoError.png" },
    ],
    []
  );

  const companiesFromBen = useMemo(
    () => [
      { name: "Algorand", tagline: "L1", file: "Algorand.png" },
      {
        name: "Alpha Blockchain",
        tagline: "Research",
        file: "Alpha-Blockchain.png",
      },
      {
        name: "Au Sum Ventures",
        tagline: "Venture",
        file: "Au-Sum-Ventures.png",
      },
      { name: "Augur", tagline: "Prediction markets", file: "Augur.png" },
      { name: "Axelar", tagline: "Interoperability", file: "Axelar.png" },
      { name: "Bitquick", tagline: "Exchange", file: "Bitquick.png" },
      { name: "BlockHack", tagline: "Hackathon", file: "BlockHack.png" },
      { name: "Bolt", tagline: "Payments", file: "Bolt.png" },
      { name: "CoinList", tagline: "Launchpad", file: "CoinList.jpg" },
      {
        name: "Distributed ID",
        tagline: "Identity",
        file: "Distributed-ID.jpg",
      },
      { name: "DropSpaceNFT", tagline: "NFT", file: "DropSpaceNFT.jpg" },
      { name: "Eco", tagline: "Payments", file: "Eco.png" },
      { name: "GDA Capital", tagline: "Fund", file: "GDA-Capital.jpg" },
      { name: "Immuto", tagline: "Data integrity", file: "Immuto.jpg" },
      { name: "Iota", tagline: "DLT", file: "Iota.png" },
      {
        name: "Metaverse Group",
        tagline: "Metaverse",
        file: "Metaverse-Group.png",
      },
      { name: "Metis", tagline: "L2", file: "Metis.png" },
      { name: "Optimism", tagline: "L2 infrastructure", file: "Optimism.png" },
      { name: "Qtum", tagline: "L1", file: "Qtum.png" },
      { name: "Roll", tagline: "Social tokens", file: "Roll.jpg" },
      { name: "SecretNetwork", tagline: "Privacy", file: "SecretNetwork.jpg" },
      {
        name: "Secure Digital Markets",
        tagline: "Markets",
        file: "Secure-Digital-Markets.png",
      },
    ],
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
          { name: "VCU", file: "VCU.png" },
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
        href: "#",
        logoFile: "Optimism.png",
      },
      {
        name: "IOTA",
        desc: "Distributed ledger technology for IoT and beyond.",
        href: "#",
        logoFile: "Iota.png",
      },
      {
        name: "CoinList",
        desc: "Token launch platform and compliant onboarding.",
        href: "#",
        logoFile: "CoinList.jpg",
      },
      {
        name: "Axelar",
        desc: "Cross-chain interoperability for apps and assets.",
        href: "https://www.axelar.network/",
        logoFile: "Axelar.png",
      },
      {
        name: "Metis",
        desc: "Layer 2 ecosystem focused on scalable execution.",
        href: "#",
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

  const alumni = useMemo(
    () => [
      {
        name: "Jeremy Gardner",
        role: "Founder",
        company: "Augur",
        subtitle: "University of Michigan",
        image: "/images/ben-network/alumni/Jeremy_Gardner.png",
      },
      {
        name: "Michael Gord",
        role: "Founder",
        company: "GDA Capital",
        subtitle: "McGill University",
        image: "/images/ben-network/alumni/Michael_Gord.png",
      },
      {
        name: "Ryan Breslow",
        role: "Founder",
        company: "Bolt",
        subtitle: "Stanford University",
        image: "/images/ben-network/alumni/Ryan_Breslow.png",
      },
      {
        name: "Jinglan Wang",
        role: "Co-founder",
        company: "Optimism",
        subtitle: "Wellesley / MIT",
        image: "/images/ben-network/alumni/Jinglan_Wang.png",
      },
      {
        name: "Joey Krug",
        role: "Founder",
        company: "Augur",
        subtitle: "Pomona Dropout",
        image: "/images/ben-network/alumni/Joey_Krug.png",
      },
      {
        name: "Bradley Miles",
        role: "Co-founder",
        company: "Roll",
        subtitle: "Columbia University",
        image: "/images/ben-network/alumni/Bradley_Miles.png",
      },
      {
        name: "Sid Ramesh",
        role: "Growth Advisor",
        company: " Notional",
        subtitle: "UW-Madison",
        image: "/images/ben-network/alumni/Sid_Ramesh.png",
      },
      {
        name: "Eric Chen",
        role: "Founder",
        company: "Injective",
        subtitle: "New York University",
        image: "/images/ben-network/alumni/Eric_Chen.png",
      },
      {
        name: "Dean Masley",
        role: "Founder",
        company: "NestEgg",
        subtitle: "University of Delaware",
        image: "/images/ben-network/alumni/Dean_Masley.png",
      },
    ],
    []
  );

  const floating = useMemo(() => {
    const pick = [...portfolioCompanies, ...companiesFromBen];
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
        <title>BEN Network | Blockchain Education Network</title>
        <meta
          name="description"
          content="BEN Network: a global network of student founders, alumni and companies built through the Blockchain Education Network."
        />
      </Head>

      <HeaderWithLogoDark />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-benorange-100 opacity-90" />
        <div className="hero-vignette" aria-hidden="true" />

        {/* Floating logos */}
        <div className="pointer-events-none absolute inset-0">
          {floating.map((l, idx) => {
            const positions = [
              { top: 10, left: 8 },
              { top: 14, left: 22 },
              { top: 12, left: 33 },
              { top: 12, left: 52 },
              { top: 16, left: 68 },
              { top: 12, left: 84 },
              { top: 26, left: 10 },
              { top: 30, left: 24 },
              { top: 28, left: 40 },
              { top: 26, left: 58 },
              { top: 30, left: 74 },
              { top: 26, left: 90 },
              { top: 42, left: 6 },
              { top: 44, left: 18 },
              { top: 46, left: 34 },
              { top: 42, left: 50 },
              { top: 46, left: 66 },
              { top: 44, left: 82 },
              { top: 42, left: 94 },
              { top: 58, left: 12 },
              { top: 60, left: 28 },
              { top: 62, left: 44 },
              { top: 58, left: 60 },
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

            return (
              <div
                key={`${l.name}-${idx}`}
                className={`${sizeClass} ${v}`}
                style={{ top: `${p.top}%`, left: `${p.left}%` }}
                aria-hidden="true"
              >
                <div className="floating-chip-inner">
                  <img
                    src={imgSrc(`${BASE}/portfolio-companies/${l.file}`)}
                    onError={(e) => {
                      e.currentTarget.src = imgSrc(
                        `${BASE}/companies-from-ben/${l.file}`
                      );
                    }}
                    alt=""
                    className="floating-img"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative container mx-auto pt-24 pb-16 px-6">
          <div className="hero-badge inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-black/5 px-4 py-2 text-xs mb-6 shadow-sm">
            <span className="font-semibold">Proof of impact</span>
            <span className="opacity-70">
              10B+ total project value supported
            </span>
          </div>

          <div className="max-w-xl mx-auto text-center hero-glass">
            <h1 className="text-4xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1.05]">
              <span className="text-benorange-500">BEN</span>{" "}
              <span className="text-benblack-500">Network</span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-benblack-500/80 max-w-2xl mx-auto">
              A global network of student founders, alumni and companies built
              through the Blockchain Education Network.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <a
                className="btn-premium"
                href="/ben-network#unicorns"
                onClick={(e) => e.stopPropagation()}
              >
                Explore companies <span className="arrow">→</span>
              </a>

              <a
                className="btn-ghost"
                href="/ben-network#universities"
                onClick={(e) => e.stopPropagation()}
              >
                View universities <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* UNICORNS / MAJOR */}
      <section id="unicorns" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Unicorns and major companies
              </h2>
              <p className="mt-2 text-sm text-benblack-500/70">
                A selection of well-known companies connected to the BEN
                ecosystem.
              </p>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
              {portfolioCompanies.map((c) => (
                <div key={c.name} className="logo-card reveal">
                  <div className="logo-wrap">
                    <img
                      src={imgSrc(`${BASE}/portfolio-companies/${c.file}`)}
                      alt={c.name}
                      className="logo-img"
                      loading="lazy"
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
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-black/5 px-2 py-2 text-xs shadow-sm mb-6">
                <span className="font-semibold">Notable Alumni</span>
                <span className="opacity-70">
                  Founders and leaders from the BEN network
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Our Alumni
              </h2>
              <p className="mt-2 text-sm text-benblack-500/70">
                Proof of builders. Names you can recognize, work you can
                measure.
              </p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {alumni.map((a) => (
                <div key={a.name} className="alumni-card reveal">
                  <div className="alumni-avatar">
                    <img
                      src={a.image}
                      alt={a.name}
                      className="alumni-avatar-img"
                      loading="lazy"
                    />
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
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Class of 2025
              </h2>
              <p className="mt-2 text-sm text-benblack-500/70">
                Current builders and projects coming out of the network.
              </p>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {companiesFromBen.slice(0, 18).map((c) => (
                <div key={c.name} className="mini-logo reveal">
                  <img
                    src={imgSrc(`${BASE}/companies-from-ben/${c.file}`)}
                    alt={c.name}
                    className="mini-logo-img"
                    loading="lazy"
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
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                BEN founders and projects
              </h2>
              <p className="mt-2 text-sm text-benblack-500/70">
                A curated set of founders and projects shaped by the BEN
                community.
              </p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {foundersAndProjects.map((p) => (
                <div key={p.name} className="card-premium reveal">
                  <div className="flex items-start gap-4">
                    {p.logoFile ? (
                      <div className="project-logo">
                        <img
                          src={imgSrc(
                            `${BASE}/companies-from-ben/${p.logoFile}`
                          )}
                          onError={(e) => {
                            e.currentTarget.src = imgSrc(
                              `${BASE}/portfolio-companies/${p.logoFile}`
                            );
                          }}
                          alt={p.name}
                          className="project-logo-img"
                          loading="lazy"
                        />
                      </div>
                    ) : null}

                    <div>
                      <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
                      <p className="text-sm text-benblack-500/70">{p.desc}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <StandardButton
                      text="Learn more"
                      link={p.href || "#"}
                      styling="w-fit"
                    />
                  </div>
                </div>
              ))}
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
                A global footprint across campuses and student-led
                organizations.
              </p>
            </header>

            <div className="university-row reveal">
              <div className="row-grid">
                {universitiesByRow
                  .flatMap((row) =>
                    row.items.map((u) => ({
                      ...u,
                      row: row.row,
                    }))
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
                        alt={u.name}
                        className="uni-logo-img"
                        loading="lazy"
                      />
                    </div>
                  ))}

                {universitiesByRow.every((r) => r.items.length === 0) ? (
                  <div className="text-sm text-benblack-500/50 py-4">
                    Add university logos.
                  </div>
                ) : null}
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
        }
        .logo-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.1);
          border-color: rgba(0, 0, 0, 0.1);
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
        .row-label {
          font-size: 12px;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.55);
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
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

        .floating-chip {
          position: absolute;
          width: 62px;
          height: 62px;
          border-radius: 18px;
          transform: translate(-50%, -50%);
          opacity: 0.9;
          filter: drop-shadow(0 14px 30px rgba(0, 0, 0, 0.12));
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
        }
        .floating-img {
          width: 70%;
          height: 70%;
          object-fit: contain;
        }
        .hero-badge {
          position: absolute;
          top: 75px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
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
          overflow: hidden;
        }

        .hero-glass::before {
          content: "";
          position: absolute;
          inset: -12px -128px -18px -18px;
          border-radius: inherit;

          /* glass layer */
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);

          -webkit-mask-image: radial-gradient(
            circle at 50% 52%,
            rgba(0, 0, 0, 0.9) 60%,
            rgba(0, 0, 0, 0.35) 78%,
            rgba(0, 0, 0, 0) 100%
          );
          mask-image: radial-gradient(
            circle at 50% 52%,
            rgba(0, 0, 0, 0.9) 60%,
            rgba(0, 0, 0, 0.35) 78%,
            rgba(0, 0, 0, 0) 100%
          );

          z-index: 0;
          pointer-events: none;
        }

        .hero-glass > * {
          position: relative;
          z-index: 1;
        }

        .hero-glass::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background-image: radial-gradient(
            rgba(0, 0, 0, 0.04) 1px,
            transparent 0
          );
          background-size: 3px 3px;
          opacity: 0.08;
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
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(0, 0, 0, 0.02);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
        }
        .alumni-avatar-img {
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
          color: #000;
        }

        @keyframes floatY {
          0% {
            transform: translate(-50%, -50%) translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -50%) translate3d(0, -12px, 0)
              rotate(2deg);
          }
          100% {
            transform: translate(-50%, -50%) translate3d(0, 0, 0) rotate(0deg);
          }
        }
        @keyframes driftX {
          0% {
            transform: translate(-50%, -50%) translate3d(0, 0, 0);
          }
          50% {
            transform: translate(-50%, -50%) translate3d(10px, 0, 0);
          }
          100% {
            transform: translate(-50%, -50%) translate3d(0, 0, 0);
          }
        }

        .floatv1 {
          animation: floatY 6.6s ease-in-out infinite;
        }
        .floatv2 {
          animation: floatY 7.8s ease-in-out infinite,
            driftX 9.2s ease-in-out infinite;
        }
        .floatv3 {
          animation: floatY 6.9s ease-in-out infinite,
            driftX 11s ease-in-out infinite;
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
          .reveal,
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
          }
        }
      `}</style>
    </div>
  );
}
