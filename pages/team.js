import Footer from "../components/footer";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import NationalTeamCard from "../components/nationalTeamCard";
import AlumniCard from "../components/alumniCard";
import { TeamMember } from "../services";
import Head from "next/head";
import Link from "next/link";

import { useState } from "react";

export default function About() {
  const [globalClick, setGlobalClick] = useState(false);
  const [teamMembers, setTeamMembers] = useState({
    "BEN Team": [
      new TeamMember(
        "/images/team/antonio-photo.jpg",
        "Antonio Gomes",
        "President & Head of Ecosystem Growth, BEN",
        "UF Warrington grad and past president of the Gator Blockchain Club. Worked at Oracle before going full-time on BEN, where he leads ecosystem growth, strategic partnerships, and network expansion across 10,000+ students in 35+ countries. Also at GDA Capital, helping Web3 founders raise and scale. Based in San Francisco.",
        "",
        "",
        "",
        "https://www.youtube.com/live/geBcmjzpqVY"
      ),
      new TeamMember(
        "/images/team/zsofia-kerekes.jpg",
        "Zsofia Kerekes",
        "Chief Marketing Officer, BEN",
        "Studied in Budapest. Former finance lead at Morgan Stanley, where she managed a team across financial operations. Now Chief Marketing Officer at BEN, driving brand strategy, campaigns, and growth for the network.",
        "",
        ""
      ),
      new TeamMember(
        "/images/team/filipe-lucas.jpg",
        "Filipe Lucas Inês",
        "Head of AI & Product, BEN",
        "Instituto Superior Técnico grad. Leads AI and product development at BEN, building autonomous agents and AI-powered tools at the intersection of artificial intelligence and blockchain. Also a consultant at Efficio.",
        "",
        ""
      ),
      new TeamMember(
        "/images/team/gabriela-almeida.jpg",
        "Gabriela de Almeida",
        "Lead Software Engineer, BEN",
        "Universidade Metodista de São Paulo grad, now based in Lisbon. Lead software engineer at BEN, building and maintaining the network's web platform. Previously a software engineer at IBM.",
        "",
        ""
      ),
      new TeamMember(
        "/images/team/ashton-barger.jpg",
        "Ashton Barger",
        "Advisor, Events & Partnerships, BEN",
        "Miami University grad and former president of its Blockchain Club. Runs the annual Zebu Live conference in London and advises BEN on events strategy and partnerships. Also at Onchain Foundation.",
        "",
        ""
      ),
      new TeamMember(
        "/images/team/dean-masley.jpg",
        "Dean Masley",
        "Executive Director & Head of Partnerships, BEN",
        "Last Executive Director of BEN before going full-time founder. Building NestEgg — blockchain-powered investing in real-world infrastructure like solar. Deep experience in blockchain partnerships and network strategy.",
        "",
        "",
        "",
        "https://www.youtube.com/watch?v=kktID_s-KWo"
      ),
      new TeamMember(
        "/images/team/reynaldo-darit.jpg",
        "Reynaldo Darit",
        "Operations & Research Analyst, BEN",
        "University of Mindanao grad. Manages data operations, research workflows, and intelligence gathering across BEN's global network. Supports leadership with structured analysis and operational insights across BEN's 10,000+ student network.",
        "",
        ""
      ),
      new TeamMember(
        "/images/team/erick-photo.jpg",
        "Erick Pinos",
        "Board Director & Head of Strategy, BEN",
        "MIT grad and former president of the MIT Bitcoin Club. Researched with the MIT Digital Currency Initiative. Oversees strategic direction at BEN while serving as Ecosystem Lead at Nibiru Chain.",
        "",
        "",
        "",
        "https://youtu.be/RH7_-Fs8ze4"
      ),
      new TeamMember(
        "/images/team/mel-vera-new.jpeg",
        "Mel Vera",
        "Advisor, Operations & Community, BEN",
        "Babson College grad and Colombia native raised in New York City. Founder of Vera Ventures. Advises BEN on global operations, community strategy, and cross-border growth initiatives.",
        "",
        "",
        "",
        "https://youtu.be/SwaZWpL0fqg"
      ),
    ],
    Alumni: [
      new TeamMember(
        "/images/team/jeremy-gardner-new.jpeg",
        "Jeremy Gardner",
        "Co-Founder, Augur & BEN",
        "Founded BEN at the University of Michigan in 2014, then co-founded Augur — the first decentralized prediction market on Ethereum and first utility token ICO. Also founded SAAVHA and was EIR at Blockchain Capital.",
        "",
        "",
        "",
        "https://youtu.be/J7VXIAp9Sy8"
      ),
      new TeamMember(
        "/images/people/jinglan-wang.jpeg",
        "Jinglan Wang",
        "Co-Founder, Optimism",
        "Co-founded Optimism, the Ethereum L2. Started in crypto at the MIT Bitcoin Club, then went to Nasdaq as blockchain PM and co-founded Eximchain before building Optimism.",
        "",
        "",
        "",
        "https://www.youtube.com/watch?v=yeyEVvZyuLQ&t=31s"
      ),
      new TeamMember(
        "/images/people/dominik-schiener.jpeg",
        "Dominik Schiener",
        "Co-Founder, IOTA",
        "Co-founded IOTA, the distributed ledger for the Internet of Things, which reached a peak market cap of over $14 billion. Won his first hackathon at 16 and has been building in crypto since 2011. Based in Berlin.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/paul-veradittakit.jpg",
        "Paul Veradittakit",
        "Managing Partner, Pantera Capital",
        "Managing Partner at Pantera Capital, one of the first and largest crypto-focused investment firms. BEN Advisory Board Member since 2017, helping with corporate engagement and fundraising.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/ryan-breslow.jpeg",
        "Ryan Breslow",
        "Founder & CEO, Bolt",
        "Dropped out of Stanford at 19 to build Bolt, now valued at over $11 billion. Returned as CEO in 2025 to turn it into a super app across e-commerce, financial services, and crypto.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/andy-bromberg.jpeg",
        "Andy Bromberg",
        "CEO & Co-Founder, Eco; Co-Founder, CoinList",
        "Founding CEO of CoinList ($1.5B) — ran token sales for Solana, Filecoin, and Near. Started the Stanford Bitcoin Group as a student.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/eric-chen.jpeg",
        "Eric Chen",
        "Co-Founder & CEO, Injective",
        "Left NYU at 19 to co-found Injective, now a $1.3B DeFi chain backed by Mark Cuban. Deutsche Telekom runs a validator on the network.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/joey-krug.jpeg",
        "Joey Krug",
        "Partner, Founders Fund",
        "Co-founded Augur, the first decentralized prediction market, in 2014 — dropped out of college to do it. Now at Founders Fund and an early backer of Polymarket.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/jelena-djuric.jpeg",
        "Jelena Djuric",
        "Co-Founder & CEO, Noble",
        "Co-founded Noble, the chain that brought native USDC to the Cosmos ecosystem. Previously Head of DevRel at the Interchain Foundation.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/michael-gord.jpeg",
        "Michael Gord",
        "Co-Founder & CEO, GDA Capital",
        "Been in crypto since 2013 — 3 exits, 4 acquisitions, 70+ portfolio companies. Founded Bitcoin Canada and MLG Blockchain before building GDA Capital.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/gal-stern.jpeg",
        "Gal Stern",
        "Head of BD, deBridge",
        "Leads BD at deBridge, the cross-chain interoperability protocol. In crypto since 2017 — previously at Orbs and Kyber Network.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/bradley-miles.jpeg",
        "Bradley Miles",
        "Co-Founder & CEO, Roll",
        "Co-founded Roll, bringing social tokens to social networks. Previously led research at CoinDesk and wrote the bestseller '#BreakIntoVC'.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/roshan-mirajkar.jpeg",
        "Roshan Mirajkar",
        "Coinbase",
        "Now at Coinbase. Previously VP of Marketing & Web3 Strategy at MouseBelt. Co-founded the Geeks Of The Valley podcast.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/matt-batsinelas.jpeg",
        "Matt Batsinelas",
        "Founder, Glass Markets",
        "Built Glass Markets for institutional crypto traders. Previously at Flow Traders in crypto BD and co-founded Triblock.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/alec-shaw.jpeg",
        "Alec Shaw",
        "CEO, Tenderize",
        "Runs Tenderize, a liquid staking protocol on Arbitrum for networks like The Graph and Livepeer.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/dev-bharel.jpeg",
        "Dev Bharel",
        "Founder, Seedplex",
        "Building Seedplex. Has worked on decentralized systems for over a decade — previously DevRel at Anagram, Developer Advocate at Jump Crypto. Co-founded DistributedID and ran BEN's Chicago region.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/robert-klages.jpeg",
        "Robert Klages",
        "Co-Founder, The Rollup",
        "UF grad. Co-founded The Rollup and The Rollup Ventures. 75+ angel investments in seed-stage crypto startups. Previously in crypto strategy at TradeStation.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/andy-rollup.jpg",
        "Andy",
        "Co-Founder, The Rollup",
        "UF dropout turned entrepreneur. Co-founded The Rollup and The Rollup Ventures in 2020. 50+ investments, 1,000+ podcast episodes, and events across 40+ countries.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/scott-spiegel.jpeg",
        "Scott Spiegel",
        "Founder & CEO, BitBasel",
        "Runs BitBasel — Web3 art events during Miami Art Week every year. Co-founded the Miami Blockchain Center.",
        "",
        ""
      ),
      new TeamMember(
        "/images/team/buse-kaya-new.jpeg",
        "Buse Kaya",
        "BEN Alumni & Founder",
        "BEN alumna based in Istanbul. Active in Web3 marketing and community building across the Turkish crypto ecosystem.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/aybars-dorman.jpg",
        "Aybars Dorman",
        "Founder, ATH Partners",
        "Based in Istanbul. Founded ATH Partners, focused on blockchain investment and interchain innovation. Active in the Turkish and global Web3 ecosystem.",
        "",
        ""
      ),
      new TeamMember(
        "/images/people/magda-tavkhelidze.jpg",
        "Magda Tavkhelidze",
        "Founder, Women in Cyber Georgia",
        "Tbilisi State University grad. Founded Women in Cyber Georgia, championing cybersecurity and blockchain education across the Caucasus region. Based in Tbilisi.",
        "",
        ""
      ),
    ],
  });

  // Monday.com API disabled — leadership is hardcoded above with
  // real LinkedIn photos and updated bios. Re-enable if Monday.com
  // board photos are updated from DALL-E cartoons to real headshots.

  return (
    <div
      id="team-page"
      onClick={(e) => {
        if (e.target.getAttribute("flip-card-container") == "true") {
          setGlobalClick(true);
        } else {
          setGlobalClick(false);
        }
      }}
    >
      <HeaderWithLogoDark />
      <Head>
        <title>Team — Leadership &amp; Notable Alumni | Blockchain Education Network</title>
        <meta
          name="description"
          content="Meet the BEN leadership team led by Antonio Gomes (President & Head of Ecosystem Growth) and notable alumni who founded Augur, Optimism, Bolt, CoinList, Injective, and more. The world's largest university blockchain network since 2014."
        />
        <link rel="canonical" href="https://www.blockchainedu.org/team" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.blockchainedu.org/team" />
        <meta
          property="og:title"
          content="Team — Leadership & Notable Alumni | Blockchain Education Network"
        />
        <meta
          property="og:description"
          content="Led by Antonio Gomes (President & Head of Ecosystem Growth). Meet the BEN leadership team and notable alumni who founded Augur, Optimism, Bolt, CoinList, Injective, and more."
        />
        <meta property="og:image" content="https://www.blockchainedu.org/images/og-team.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Team — Leadership & Notable Alumni | BEN" />
        <meta name="twitter:description" content="Meet the people behind BEN and the alumni who built billion-dollar companies." />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Blockchain Education Network",
  "url": "https://www.blockchainedu.org",
  "foundingDate": "2014",
  "description": "The world's largest university blockchain network, spanning 10,000+ students across 35+ countries.",
  "member": [
    {"@type": "Person", "name": "Antonio Gomes", "jobTitle": "President & Head of Ecosystem Growth"},
    {"@type": "Person", "name": "Erick Pinos", "jobTitle": "Board Director & Head of Strategy"},
    {"@type": "Person", "name": "Zsofia Kerekes", "jobTitle": "Chief Marketing Officer"},
    {"@type": "Person", "name": "Filipe Lucas Ines", "jobTitle": "Head of AI & Product"},
    {"@type": "Person", "name": "Gabriela de Almeida", "jobTitle": "Lead Software Engineer"},
    {"@type": "Person", "name": "Ashton Barger", "jobTitle": "Advisor, Events & Partnerships"},
    {"@type": "Person", "name": "Jeremy Gardner", "jobTitle": "Co-Founder, Augur & BEN"},
    {"@type": "Person", "name": "Paul Veradittakit", "jobTitle": "Managing Partner, Pantera Capital"},
    {"@type": "Person", "name": "Jinglan Wang", "jobTitle": "Co-Founder, Optimism"},
    {"@type": "Person", "name": "Ryan Breslow", "jobTitle": "Founder & CEO, Bolt"},
    {"@type": "Person", "name": "Andy Bromberg", "jobTitle": "Co-Founder, CoinList"},
    {"@type": "Person", "name": "Eric Chen", "jobTitle": "Co-Founder & CEO, Injective"},
    {"@type": "Person", "name": "Joey Krug", "jobTitle": "Partner, Founders Fund"}
  ]
}`
        }}
      />

      <main>
      {/* ── Hero Section ── */}
      <section aria-label="Team introduction" className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Subtle orange glow */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.07,
            backgroundImage:
              "radial-gradient(ellipse at 30% 20%, #FF872A 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #FF872A 0%, transparent 50%)",
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.02,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 py-20 md:py-28 text-center">
          <span
            className="inline-block text-xs font-semibold uppercase px-4 py-1 rounded-full border mb-6"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.5)",
              borderColor: "rgba(255,255,255,0.08)",
              letterSpacing: "0.18em",
              fontSize: "10px",
            }}
          >
            Est. 2014 &mdash; 10,000+ Students &mdash; 35+ Countries
          </span>

          <h1 className="font-mont text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight" style={{ lineHeight: 1.08 }}>
            Built by the people
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400">
              who built the industry.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-inter" style={{ color: "rgba(255,255,255,0.45)" }}>
            Ten years of turning college students into founders,
            <br className="hidden sm:block" />
            operators, and protocol builders.
          </p>

          {/* Stats row */}
          <div className="mt-10 flex flex-wrap justify-center" style={{ gap: "2rem 2.5rem" }}>
            {[
              { value: "$20B+", label: "Alumni company value" },
              { value: "10K+", label: "Students worldwide" },
              { value: "4,000+", label: "Students & alumni" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-white font-mont">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-inter" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-10 flex justify-center">
            <div className="w-5 h-8 rounded-full flex items-start justify-center pt-2" style={{ border: "1.5px solid rgba(255,255,255,0.15)" }}>
              <div className="w-1 rounded-full animate-bounce" style={{ height: "8px", backgroundColor: "rgba(255,255,255,0.3)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Leadership Section ── */}
      <section aria-label="Leadership team" className="py-16 md:py-20" style={{ backgroundColor: "#FFFBF2" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          {/* Section header */}
          <div className="text-center mb-12">
            <div
              className="inline-block text-benorange-500 font-bold uppercase px-3 rounded-full mb-4"
              style={{
                backgroundColor: "rgba(255, 135, 42, 0.08)",
                letterSpacing: "0.15em",
                fontSize: "10px",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              The Team
            </div>
            <h2 className="font-mont font-black text-3xl md:text-4xl text-black mb-3">
              Leadership
            </h2>
            <p className="text-bengrey-500 text-sm md:text-base max-w-md mx-auto font-inter leading-relaxed">
              The people running BEN today.
            </p>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {teamMembers["BEN Team"].length > 0 &&
              teamMembers["BEN Team"].map((member, idx) => (
                <NationalTeamCard
                  key={member.name || idx}
                  image={member.image}
                  name={member.name}
                  title={member.title}
                  bio={member.bio}
                  linkedin={member.linkedin}
                  twitter={member.twitter}
                  email={member.email}
                  video={member.video}
                />
              ))}
          </div>
        </div>
      </section>

      {/* ── Notable Alumni Section ── */}
      <section aria-label="Notable alumni" className="py-16 md:py-20" style={{ backgroundColor: "#f5f7f7", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-12">
            <div
              className="inline-block text-benorange-500 font-bold uppercase px-3 rounded-full mb-4"
              style={{
                backgroundColor: "rgba(255, 135, 42, 0.08)",
                letterSpacing: "0.15em",
                fontSize: "10px",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              Our Network
            </div>
            <h2 className="font-mont font-black text-3xl md:text-4xl text-black mb-3">
              Notable Alumni
            </h2>
            <p className="text-bengrey-500 text-sm md:text-base max-w-md mx-auto font-inter leading-relaxed">
              They started as students. Now they run companies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {teamMembers["Alumni"].length > 0 &&
              teamMembers["Alumni"].map((member, idx) => (
                <NationalTeamCard
                  key={member.name || idx}
                  image={member.image}
                  name={member.name}
                  title={member.title}
                  bio={member.bio}
                  linkedin={member.linkedin}
                  twitter={member.twitter}
                  video={member.video}
                  email={member.email}
                />
              ))}
          </div>
        </div>
      </section>

      {/* ── What They Built ── */}
      <section aria-label="Companies built by BEN alumni" className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: "#0a0a0b" }}>
        {/* Ambient glow */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.06,
            backgroundImage:
              "radial-gradient(ellipse at 50% 30%, #FF872A 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 sm:px-10">
          {/* Headline */}
          <div className="text-center mb-16 md:mb-20">
            <h2
              className="font-mont font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight"
              style={{ lineHeight: 1.05 }}
            >
              $20B+
            </h2>
            <p
              className="mt-3 text-base sm:text-lg font-inter"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              in companies founded by people from this network.
            </p>
          </div>

          {/* Company list — typography-driven */}
          <div className="space-y-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { company: "Augur", person: "Jeremy Gardner & Joey Krug", detail: "First decentralized prediction market on Ethereum. First utility token ICO." },
              { company: "IOTA", person: "Dominik Schiener", detail: "Distributed ledger for the Internet of Things. $14B peak market cap." },
              { company: "Bolt", person: "Ryan Breslow", detail: "Payments super app. $11B+ valuation." },
              { company: "Optimism", person: "Jinglan Wang", detail: "Leading Ethereum Layer 2. Powers thousands of apps onchain." },
              { company: "Injective", person: "Eric Chen", detail: "DeFi infrastructure chain. $1.3B valuation. Backed by Mark Cuban." },
              { company: "CoinList", person: "Andy Bromberg", detail: "Token launch platform. Ran sales for Solana, Filecoin, and Near." },
              { company: "Noble", person: "Jelena Djuric", detail: "Brought native USDC to the Cosmos ecosystem." },
              { company: "GDA Capital", person: "Michael Gord", detail: "Took Tron ($20B peak) and Loopring to capital markets. 70+ portfolio companies." },
            ].map((item) => (
              <div
                key={item.company}
                className="flex flex-col sm:flex-row sm:items-baseline py-5 sm:py-6"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  gap: "0.25rem 0",
                }}
              >
                <div className="sm:w-44 shrink-0">
                  <span className="font-mont font-black text-lg sm:text-xl text-white">
                    {item.company}
                  </span>
                </div>
                <div className="flex-1 sm:pl-4">
                  <span
                    className="text-sm font-inter font-medium"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {item.person}
                  </span>
                  <span
                    className="hidden sm:inline text-sm font-inter"
                    style={{ color: "rgba(255,255,255,0.22)" }}
                  >
                    {" — "}{item.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Backed-by line */}
          <div className="mt-14 md:mt-16 text-center">
            <p
              className="text-xs font-inter font-medium uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" }}
            >
              Alumni also at
            </p>
            <div
              className="flex flex-wrap justify-center items-center"
              style={{ gap: "0.8rem 2rem" }}
            >
              {[
                "Pantera Capital", "Founders Fund", "Blockchain Capital",
                "Coinbase", "NestEgg", "Eco", "The Rollup", "deBridge",
              ].map((name) => (
                <span
                  key={name}
                  className="font-mont font-bold text-sm md:text-base"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Join CTA Section ── */}
      <section aria-label="Join BEN" className="relative overflow-hidden py-16 md:py-20" style={{ backgroundColor: "#202127" }}>
        {/* Decorative gradient */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.12,
            backgroundImage:
              "radial-gradient(ellipse at 50% 0%, #FF872A, transparent 60%)",
          }}
        />

        <div className="relative max-w-2xl mx-auto px-6 sm:px-10 text-center">
          <h2 className="font-mont font-black text-2xl md:text-4xl text-white mb-4 leading-tight">
            Your turn.
          </h2>
          <p className="text-sm md:text-base max-w-md mx-auto mb-8 font-inter leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Every name on this page started where you are now.
            <br className="hidden sm:block" />
            Join the network, meet the team, or just show up.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/opportunities#apply">
              <a
                className="inline-flex items-center px-6 py-3 bg-benorange-500 text-white font-inter font-semibold text-sm rounded-full transition-all duration-200"
                style={{ boxShadow: "0 8px 20px rgba(255, 135, 42, 0.2)" }}
              >
                Join BEN
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </Link>
            <Link href="/opportunities">
              <a
                className="inline-flex items-center px-6 py-3 font-inter font-semibold text-sm rounded-full transition-all duration-200"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Explore Opportunities
              </a>
            </Link>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
