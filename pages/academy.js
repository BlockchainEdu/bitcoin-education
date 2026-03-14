import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import { useAuth } from "../lib/auth";
import LoginModal from "../components/LoginModal";
import { ACADEMY_COURSE } from "../content/academy";
import { SOLIDITY_COURSE } from "../content/solidity";

const HeroLightspeed = dynamic(
  () => import("../components/HeroLightspeed").then((mod) => mod.default),
  { ssr: false }
);

/* ── Career-focused videos (verified IDs) ── */
const VIDEOS = {
  fullstack: [
    {
      id: "NtfbWkxJTHw",
      title: "How to Learn to Code — 8 Hard Truths",
      channel: "Fireship",
      minutes: "3 min",
    },
    {
      id: "pEfrdAtAmqk",
      title: "God-Tier Developer Roadmap",
      channel: "Fireship",
      minutes: "11 min",
    },
  ],
  solidity: [
    {
      id: "kdvVwGrV7ec",
      title: "Solidity in 100 Seconds",
      channel: "Fireship",
      minutes: "2 min",
    },
    {
      id: "17QRFlml4pA",
      title: "What is DeFi? (Decentralized Finance Animated)",
      channel: "Whiteboard Crypto",
      minutes: "3 min",
    },
  ],
};

/* ── Track data ─────────────────────────────────────────────────────────── */
const TRACKS = [
  {
    key: "fullstack",
    course: ACADEMY_COURSE,
    label: "Full-Stack Development",
    shortLabel: "Full-Stack",
    tagline: "No experience needed",
    salaryRange: "$85K — $160K",
    salaryNote: "Average US salary range for full-stack developers (Glassdoor, 2024)",
    trackH1: "Go from zero",
    trackH1Orange: "to full-stack developer.",
    trackPara:
      "Full-stack means you can build an entire application by yourself. The frontend people see, the backend that powers it, the database that stores everything, and the deployment that puts it online. Companies pay $85K-$160K for this skill set because one person who can do it all is worth more than three specialists who can't talk to each other.",
    audienceTitle: "This is for career changers.",
    audienceBody:
      "You're working a job that doesn't excite you. Maybe you studied something else in college. Maybe you didn't go to college. It doesn't matter. Full-stack development is one of the few high-paying careers where nobody asks for your diploma. They ask to see what you've built. This track takes you from \"what is a variable?\" to deploying a production web application with a real portfolio to show employers.",
    audienceBullets: [
      "You want to switch careers but don't want $15K in bootcamp debt",
      "You've tried free tutorials but never finished a real project",
      "You want to build your own startup MVP instead of paying someone $50K",
      "You want remote work, flexible hours, and a salary that grows every year",
    ],
    skillsSubtitle:
      "The same stack used by startups, agencies, and Fortune 500 companies.",
    curriculumTitle: "The full curriculum.",
    skills: [
      { skill: "JavaScript & ES6+", desc: "The language that runs the web. Modern syntax, async, modules." },
      { skill: "HTML & CSS", desc: "Structure and style. Flexbox, Grid, responsive design." },
      { skill: "React", desc: "The most in-demand frontend framework. Components, hooks, routing." },
      { skill: "Node.js & Express", desc: "Backend in JavaScript. APIs, authentication, server logic." },
      { skill: "PostgreSQL", desc: "Industry-standard database. SQL, migrations, joins, indexing." },
      { skill: "Git & GitHub", desc: "Every dev team uses this. Branching, PRs, collaboration." },
      { skill: "Authentication", desc: "OAuth, JWT, sessions. Lock down your apps properly." },
      { skill: "Testing & CI/CD", desc: "Write code that doesn't break. Ship with confidence." },
      { skill: "Deployment", desc: "Put it online. Cloud platforms, containers, domains, SSL." },
      { skill: "UI/UX Design", desc: "Make it look good. Wireframing, Figma, design systems." },
      { skill: "API Design", desc: "Build backends other developers want to use." },
      { skill: "Startup Building", desc: "MVPs, pitch decks, user research, fundraising." },
    ],
  },
  {
    key: "solidity",
    course: SOLIDITY_COURSE,
    label: "Solidity Engineering",
    shortLabel: "Solidity",
    tagline: "For developers",
    salaryRange: "$120K — $250K+",
    salaryNote: "Average US salary range for Solidity/blockchain developers (web3.career, 2024)",
    trackH1: "Write smart contracts.",
    trackH1Orange: "Ship to mainnet.",
    trackPara:
      "Solidity developers are the highest-paid engineers in software right now. The supply is tiny and the demand is enormous. Every DeFi protocol, every NFT marketplace, every DAO, every L2 chain needs people who can write secure smart contracts. This track takes developers who already know how to code and turns them into blockchain engineers.",
    audienceTitle: "This is for developers who want to get paid more.",
    audienceBody:
      "You already write code. JavaScript, Python, C++, whatever. You've seen blockchain developer salaries and you want in. The problem is that Solidity is different from anything you've written before. Bugs aren't just bugs. They're million-dollar exploits. This track teaches you to write smart contracts that handle real money, and to audit the ones written by other people.",
    audienceBullets: [
      "Web2 developers who want to double their salary by going onchain",
      "CS students who want the highest-paying niche in software engineering",
      "Founders building token-based products, DAOs, or DeFi protocols",
      "Security engineers who want to break into smart contract auditing ($300K+)",
    ],
    skillsSubtitle:
      "The full stack for onchain development. Security-first.",
    curriculumTitle: "The full curriculum.",
    skills: [
      { skill: "Solidity", desc: "The language of Ethereum. Types, storage, modifiers, inheritance." },
      { skill: "Ethereum & EVM", desc: "How it actually works. Opcodes, gas, state tries." },
      { skill: "Smart Contract Security", desc: "Reentrancy, overflow, access control. Audit-grade." },
      { skill: "Token Standards", desc: "ERC-20, ERC-721, ERC-1155. Build and extend them." },
      { skill: "DeFi Protocols", desc: "AMMs, lending, flash loans, yield vaults. Build them." },
      { skill: "Foundry & Hardhat", desc: "Professional tooling. Testing, deployment, gas profiling." },
      { skill: "Yul Assembly", desc: "Low-level EVM. Inline assembly, gas optimization." },
      { skill: "Layer 2 Scaling", desc: "Optimistic rollups, ZK rollups, cross-chain bridging." },
      { skill: "Account Abstraction", desc: "ERC-4337, gasless UX, smart wallets." },
      { skill: "Oracles", desc: "Chainlink feeds, VRF, TWAP. Connect contracts to the real world." },
      { skill: "Security Analysis", desc: "Slither, Echidna, fuzzing. Find bugs before attackers do." },
      { skill: "DAOs & Governance", desc: "Proposals, voting, timelocks. Decentralized organizations." },
    ],
  },
];

/* ── FAQ ────────────────────────────────────────────────────────────────── */
const FAQ = [
  {
    q: "I have zero coding experience. Can I really do this?",
    a: "Yes. The Full-Stack track starts at absolute zero. You'll write your first line of code in lesson one. Thousands of people with no technical background have become working developers. The only requirement is that you show up and do the work.",
  },
  {
    q: "How is this different from free YouTube tutorials?",
    a: "YouTube teaches you random topics in random order. You watch 50 videos and still can't build anything. This is a structured path from start to finish with hands-on projects at every stage. When you're done, you have a portfolio. Not a watch history.",
  },
  {
    q: "How long does it take?",
    a: "Most people finish the Full-Stack track in 3-4 months at 10 hours per week. Solidity takes 2-3 months. But there's no deadline. Go at your own pace. Your access never expires.",
  },
  {
    q: "Am I too old to switch careers?",
    a: "No. Tech hiring is based on what you can build, not how old you are. Plenty of developers started in their 30s, 40s, and 50s. The average career switcher into tech is 33 years old.",
  },
  {
    q: "Why so cheap compared to bootcamps?",
    a: "Bootcamps have classrooms, staff, and overhead. We don't. You get the same curriculum depth for $29/month. Cancel anytime.",
  },
  {
    q: "What if I want both tracks?",
    a: "Your membership unlocks everything. Full-Stack, Solidity, and anything we add in the future. Start with one, switch when you're ready, or take them in parallel.",
  },
  {
    q: "Do I get a certificate?",
    a: "We focus on skills, not PDFs. You'll build a portfolio of real projects. That portfolio is what gets you hired. No employer has ever said \"show me your certificate.\" They say \"show me what you've built.\"",
  },
  {
    q: "What tools do I need?",
    a: "A laptop and an internet connection. Every tool in the program is free: VS Code, Git, Node.js, Foundry, and free-tier cloud services.",
  },
];

export default function AcademyPage() {
  const { user, isPaid, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (router.query.track === "solidity") setTrackIdx(1);
  }, [router.query.track]);

  const track = TRACKS[trackIdx];
  const course = track.course;
  const totalLessons = course.modules.reduce(
    (sum, m) => sum + m.lessons.length,
    0
  );
  const allLessons = TRACKS.reduce(
    (sum, t) =>
      sum + t.course.modules.reduce((s, m) => s + m.lessons.length, 0),
    0
  );
  const videos = VIDEOS[track.key];

  function switchTrack(idx) {
    setTrackIdx(idx);
    setExpandedModule(null);
  }

  function handleUpgrade() {
    if (!user) {
      setShowLogin(true);
      return;
    }
    router.push("/pricing");
  }

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  /* checkmark SVG reusable */
  const Check = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FF872A"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-4 flex-shrink-0"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  return (
    <div>
      <HeaderWithLogoDark />
      <Head>
        <title>
          Academy — Learn to Code & Get Hired | BEN
        </title>
        <meta
          name="description"
          content="Switch careers into tech. Learn full-stack development from scratch or go deep on Solidity smart contracts. 600+ lessons, $29/mo. No bootcamp debt."
        />
        <link rel="canonical" href="https://www.blockchainedu.org/academy" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="BEN Academy — Learn to Code, Switch Careers, Get Hired"
        />
        <meta
          property="og:description"
          content="Full-stack developers make $85K-$160K. Solidity engineers make $120K-$250K+. Learn both for $29/mo. Cancel anytime."
        />
        <meta property="og:url" content="https://www.blockchainedu.org/academy" />
        <meta
          property="og:image"
          content="https://www.blockchainedu.org/images/light-2-logo.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="BEN Academy — $29/mo. No Bootcamp Debt."
        />
        <meta
          name="twitter:description"
          content="600+ lessons. Two career tracks. Full-stack or Solidity. $29/mo, cancel anytime."
        />
      </Head>

      <main>
        {/* ══════════════════════════════════════════════════════════════
            HERO — Problem-first. Lead with what they want, not what we sell.
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.07,
              backgroundImage:
                "radial-gradient(ellipse at 30% 20%, #FF872A 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #FF872A 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.02,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <HeroLightspeed />

          <div
            className="relative max-w-4xl mx-auto px-6 sm:px-10 py-20 md:py-28 text-center"
            style={{ zIndex: 2 }}
          >
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
              BEN Academy
            </span>

            <h1
              className="font-mont text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight"
              style={{ lineHeight: 1.08 }}
            >
              Your career is going nowhere.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400">
                Change it.
              </span>
            </h1>

            <p
              className="mt-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-inter"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Learn full-stack development from scratch or go deep on Solidity
              smart contracts. Two career tracks. {allLessons}+ lessons. $29/month,
              cancel anytime. No bootcamp debt, no gatekeeping.
            </p>

            <div
              className="mt-10 flex flex-col sm:flex-row items-center justify-center"
              style={{ gap: "0.75rem" }}
            >
              {mounted && isPaid ? (
                <button
                  onClick={() => scrollTo("tracks")}
                  className="px-10 py-4 rounded-full bg-benorange-500 text-white font-inter font-semibold text-sm tracking-wide transition"
                  style={{ boxShadow: "0 8px 30px rgba(255,135,42,0.25)" }}
                >
                  Start Learning
                </button>
              ) : (
                <button
                  onClick={handleUpgrade}
                  className="px-10 py-4 rounded-full bg-benorange-500 text-white font-inter font-semibold text-sm tracking-wide transition"
                  style={{ boxShadow: "0 8px 30px rgba(255,135,42,0.25)" }}
                >
                  Join BEN — $29/mo
                </button>
              )}
              <button
                onClick={() => scrollTo("curriculum")}
                className="px-10 py-4 rounded-full font-inter font-semibold text-sm tracking-wide transition"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                See the Curriculum
              </button>
            </div>

            {/* Scroll indicator */}
            <div className="mt-12 flex justify-center">
              <div
                className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
                style={{ border: "1.5px solid rgba(255,255,255,0.15)" }}
              >
                <div
                  className="w-1 h-1.5 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            PAIN / PRICE ANCHOR — Why this exists
        ══════════════════════════════════════════════════════════════ */}
        <section style={{ backgroundColor: "#0a0a0b" }}>
          <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 md:py-20">
            <div
              className="grid grid-cols-1 md:grid-cols-3 text-center"
              style={{ gap: "2rem" }}
            >
              {[
                {
                  top: "$40K+",
                  topColor: "rgba(255,255,255,0.15)",
                  label: "Average CS degree cost",
                  sub: "4 years of your life",
                },
                {
                  top: "$15K+",
                  topColor: "rgba(255,255,255,0.15)",
                  label: "Average coding bootcamp",
                  sub: "3-6 months, rigid schedule",
                },
                {
                  top: "$29/mo",
                  topColor: "#FF872A",
                  label: "BEN Academy",
                  sub: "Cancel anytime. Your pace.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="py-8 px-6 rounded-2xl"
                  style={{
                    backgroundColor:
                      item.topColor === "#FF872A"
                        ? "rgba(255,135,42,0.06)"
                        : "rgba(255,255,255,0.02)",
                    border:
                      item.topColor === "#FF872A"
                        ? "1px solid rgba(255,135,42,0.2)"
                        : "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <div
                    className="font-mont font-black text-3xl md:text-4xl"
                    style={{
                      color: item.topColor,
                      textDecoration:
                        item.topColor !== "#FF872A"
                          ? "line-through"
                          : "none",
                    }}
                  >
                    {item.top}
                  </div>
                  <div
                    className="font-inter text-sm font-semibold mt-2"
                    style={{
                      color:
                        item.topColor === "#FF872A"
                          ? "rgba(255,255,255,0.7)"
                          : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="font-inter text-xs mt-1"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SALARY OUTCOMES — What this leads to
        ══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            backgroundColor: "#0a0a0b",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 md:py-20 text-center">
            <p
              className="font-inter text-sm font-medium tracking-widest uppercase mb-4"
              style={{ color: "#FF872A" }}
            >
              The outcome
            </p>
            <h2
              className="font-mont font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight"
              style={{ lineHeight: 1.08 }}
            >
              Developers get paid.
            </h2>
            <p
              className="mt-4 font-inter text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              These aren't inflated numbers. These are real ranges from
              Glassdoor, LinkedIn, and web3.career for people with the skills
              taught in this program.
            </p>

            <div
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
              style={{ gap: "1.25rem" }}
            >
              {TRACKS.map((t, idx) => (
                <div
                  key={t.key}
                  className="rounded-2xl p-8 text-left"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="text-xs font-semibold uppercase px-3 py-1 rounded-full inline-block mb-4"
                    style={{
                      backgroundColor: "rgba(255,135,42,0.12)",
                      color: "#FF872A",
                      letterSpacing: "0.12em",
                      fontSize: "10px",
                    }}
                  >
                    {t.label}
                  </div>
                  <div className="font-mont font-black text-3xl md:text-4xl text-white">
                    {t.salaryRange}
                  </div>
                  <p
                    className="font-inter text-xs mt-2 leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    {t.salaryNote}
                  </p>
                  <div
                    className="mt-5 space-y-2 font-inter text-sm"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <div className="flex items-center">
                      <Check />
                      Remote-friendly roles worldwide
                    </div>
                    <div className="flex items-center">
                      <Check />
                      No degree required at most companies
                    </div>
                    <div className="flex items-center">
                      <Check />
                      {t.key === "fullstack"
                        ? "300,000+ open positions (Indeed, 2024)"
                        : "Fastest-growing niche in software (Electric Capital, 2024)"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CHOOSE YOUR TRACK
        ══════════════════════════════════════════════════════════════ */}
        <section
          id="tracks"
          className="py-20 md:py-28"
          style={{ backgroundColor: "#fafafa" }}
        >
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <p
              className="font-inter text-sm font-medium tracking-widest uppercase text-center mb-4"
              style={{ color: "#FF872A" }}
            >
              Two paths, one membership
            </p>
            <h2 className="font-mont font-black text-3xl sm:text-4xl md:text-5xl text-benblack-500 text-center tracking-tight">
              Pick where you are today.
            </h2>
            <p
              className="mt-4 text-center font-inter text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(0,0,0,0.4)" }}
            >
              Never written code? Start with Full-Stack. Already a developer?
              Go straight to Solidity. Your membership unlocks both.
            </p>

            <div
              className="mt-12 grid grid-cols-1 md:grid-cols-2"
              style={{ gap: "1.25rem" }}
            >
              {TRACKS.map((t, idx) => {
                const active = trackIdx === idx;
                const lessons = t.course.modules.reduce(
                  (s, m) => s + m.lessons.length,
                  0
                );
                return (
                  <button
                    key={t.key}
                    onClick={() => switchTrack(idx)}
                    className="text-left rounded-2xl p-8 md:p-10 transition-all duration-300"
                    style={{
                      backgroundColor: active ? "#fff" : "#fff",
                      border: active
                        ? "2px solid #FF872A"
                        : "1px solid rgba(0,0,0,0.08)",
                      boxShadow: active
                        ? "0 8px 40px rgba(255,135,42,0.1)"
                        : "none",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className="inline-block text-xs font-semibold uppercase px-3 py-1 rounded-full mb-4"
                      style={{
                        backgroundColor: active
                          ? "rgba(255,135,42,0.1)"
                          : "rgba(0,0,0,0.04)",
                        color: active ? "#FF872A" : "rgba(0,0,0,0.35)",
                        letterSpacing: "0.12em",
                        fontSize: "10px",
                      }}
                    >
                      {t.tagline}
                    </div>
                    <h3 className="font-mont font-black text-xl sm:text-2xl text-benblack-500 tracking-tight">
                      {t.label}
                    </h3>
                    <p
                      className="mt-2 font-inter text-sm leading-relaxed"
                      style={{ color: "rgba(0,0,0,0.45)" }}
                    >
                      {t.course.modules.length} modules. {lessons}+ lessons.
                      Salary range: {t.salaryRange}
                    </p>
                    <div
                      className="mt-5 font-inter text-sm font-semibold"
                      style={{
                        color: active ? "#FF872A" : "rgba(0,0,0,0.2)",
                      }}
                    >
                      {active ? "Selected" : "Select this track"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            TRACK DEEP DIVE — what this track is and who it's for
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            {/* Track headline */}
            <div className="text-center mb-16 md:mb-20">
              <h2
                className="font-mont font-black text-3xl sm:text-4xl md:text-5xl text-benblack-500 tracking-tight"
                style={{ lineHeight: 1.1 }}
              >
                {track.trackH1}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400">
                  {track.trackH1Orange}
                </span>
              </h2>
              <p
                className="mt-6 font-inter text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
                style={{ color: "rgba(0,0,0,0.5)" }}
              >
                {track.trackPara}
              </p>
            </div>

            {/* Who is this for — two-column */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 items-start"
              style={{ gap: "3rem" }}
            >
              <div>
                <p
                  className="font-inter text-sm font-medium tracking-widest uppercase mb-4"
                  style={{ color: "#FF872A" }}
                >
                  Who is this for
                </p>
                <h3 className="font-mont font-black text-2xl md:text-3xl text-benblack-500 tracking-tight leading-tight">
                  {track.audienceTitle}
                </h3>
                <p
                  className="mt-5 font-inter text-base leading-relaxed"
                  style={{ color: "rgba(0,0,0,0.55)" }}
                >
                  {track.audienceBody}
                </p>
              </div>

              <div className="pt-0 md:pt-12">
                {track.audienceBullets.map((bullet, i) => (
                  <div
                    key={i}
                    className="flex items-start py-4 font-inter text-sm sm:text-base"
                    style={{
                      color: "rgba(0,0,0,0.7)",
                      borderBottom:
                        i < track.audienceBullets.length - 1
                          ? "1px solid rgba(0,0,0,0.06)"
                          : "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF872A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-4 flex-shrink-0"
                      style={{ marginTop: "3px" }}
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {bullet}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            VIDEO SECTION — career-focused, not tech demos
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28" style={{ backgroundColor: "#fafafa" }}>
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <p
              className="font-inter text-sm font-medium tracking-widest uppercase text-center mb-4"
              style={{ color: "#FF872A" }}
            >
              Watch before you start
            </p>
            <h2 className="font-mont font-black text-3xl md:text-4xl text-benblack-500 text-center tracking-tight">
              {track.key === "fullstack"
                ? "What does this career actually look like?"
                : "Why blockchain developers are in demand"}
            </h2>
            <p
              className="mt-4 text-center font-inter text-base max-w-lg mx-auto leading-relaxed"
              style={{ color: "rgba(0,0,0,0.4)" }}
            >
              {track.key === "fullstack"
                ? "Honest takes from developers who've been through it. No hype, no fluff."
                : "The technology is real, the demand is growing, and the salaries reflect it."}
            </p>

            <div
              className="mt-12 grid grid-cols-1 sm:grid-cols-2"
              style={{ gap: "1.5rem" }}
            >
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="rounded-2xl overflow-hidden bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      height: 0,
                    }}
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${v.id}?rel=0`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: 0,
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-mont font-bold text-sm text-benblack-500 leading-snug">
                      {v.title}
                    </h3>
                    <div
                      className="mt-2 flex items-center font-inter text-xs"
                      style={{ color: "rgba(0,0,0,0.4)", gap: "0.5rem" }}
                    >
                      <span>{v.channel}</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{v.minutes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SKILLS GRID
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <p
              className="font-inter text-sm font-medium tracking-widest uppercase text-center mb-4"
              style={{ color: "#FF872A" }}
            >
              What you will learn
            </p>
            <h2 className="font-mont font-black text-3xl md:text-4xl text-benblack-500 text-center tracking-tight">
              {track.key === "fullstack"
                ? "The full-stack skill set"
                : "The onchain skill set"}
            </h2>
            <p
              className="mt-4 text-center font-inter text-base max-w-lg mx-auto"
              style={{ color: "rgba(0,0,0,0.4)" }}
            >
              {track.skillsSubtitle}
            </p>

            <div
              className="grid grid-cols-2 md:grid-cols-3 mt-14"
              style={{ gap: "1px", background: "rgba(0,0,0,0.06)" }}
            >
              {track.skills.map((item) => (
                <div
                  key={item.skill}
                  className="p-6 sm:p-7 md:p-9"
                  style={{ background: "#fff" }}
                >
                  <h3 className="font-mont font-bold text-sm sm:text-base text-benblack-500">
                    {item.skill}
                  </h3>
                  <p
                    className="font-inter text-xs sm:text-sm mt-2 leading-relaxed"
                    style={{ color: "rgba(0,0,0,0.4)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CURRICULUM
        ══════════════════════════════════════════════════════════════ */}
        <section
          id="curriculum"
          className="py-20 md:py-28"
          style={{ backgroundColor: "#fafafa" }}
        >
          <div className="max-w-3xl mx-auto px-6 sm:px-10">
            <p
              className="font-inter text-sm font-medium tracking-widest uppercase text-center mb-4"
              style={{ color: "#FF872A" }}
            >
              Curriculum
            </p>
            <h2 className="font-mont font-black text-3xl md:text-4xl text-benblack-500 text-center tracking-tight">
              {track.curriculumTitle}
            </h2>
            <p
              className="mt-4 text-center font-inter text-base max-w-md mx-auto"
              style={{ color: "rgba(0,0,0,0.4)" }}
            >
              {course.modules.length} modules. {totalLessons}+ lessons. Each one
              builds on the last.
            </p>

            {/* Track toggle */}
            <div
              className="mt-10 flex justify-center"
              style={{ gap: "0.5rem" }}
            >
              {TRACKS.map((t, idx) => (
                <button
                  key={t.key}
                  onClick={() => switchTrack(idx)}
                  className="px-5 py-2 rounded-full font-inter font-semibold text-xs tracking-wide transition"
                  style={
                    trackIdx === idx
                      ? {
                          background: "#FF872A",
                          color: "#fff",
                          boxShadow: "0 4px 20px rgba(255,135,42,0.2)",
                        }
                      : {
                          background: "rgba(0,0,0,0.03)",
                          color: "rgba(0,0,0,0.35)",
                          border: "1px solid rgba(0,0,0,0.06)",
                        }
                  }
                >
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="sm:hidden">{t.shortLabel}</span>
                </button>
              ))}
            </div>

            <div className="mt-12">
              {course.modules.map((mod, idx) => {
                const isExpanded = expandedModule === idx;
                const isLocked = !mounted || !isPaid;
                const num = String(mod.id).padStart(2, "0");

                return (
                  <div
                    key={mod.id}
                    style={{
                      borderBottom:
                        idx < course.modules.length - 1
                          ? "1px solid rgba(0,0,0,0.06)"
                          : "none",
                    }}
                  >
                    <button
                      className="w-full flex items-center py-6 sm:py-7 text-left"
                      onClick={() =>
                        setExpandedModule(isExpanded ? null : idx)
                      }
                    >
                      <span
                        className="font-mont font-black text-2xl sm:text-3xl md:text-4xl mr-5 sm:mr-8 flex-shrink-0 w-10 sm:w-12 text-right"
                        style={{
                          color: isExpanded
                            ? "#FF872A"
                            : "rgba(0,0,0,0.08)",
                        }}
                      >
                        {num}
                      </span>

                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-mont font-bold text-base sm:text-lg md:text-xl tracking-tight"
                          style={{
                            color: isExpanded ? "#FF872A" : "#202127",
                          }}
                        >
                          {mod.title}
                        </h3>
                        <p
                          className="font-inter text-xs sm:text-sm mt-1"
                          style={{ color: "rgba(0,0,0,0.35)" }}
                        >
                          {mod.subtitle}
                        </p>
                      </div>

                      <div
                        className="flex items-center ml-3 sm:ml-4 flex-shrink-0"
                        style={{ gap: "0.75rem" }}
                      >
                        <span
                          className="font-inter text-xs hidden sm:block"
                          style={{ color: "rgba(0,0,0,0.3)" }}
                        >
                          {mod.lessons.length} lessons
                        </span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-300"
                          style={{
                            color: isExpanded
                              ? "#FF872A"
                              : "rgba(0,0,0,0.2)",
                            transform: isExpanded
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          }}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="pb-8 pl-14 sm:pl-16 md:pl-20 pr-4">
                        <div className="space-y-0">
                          {mod.lessons.map((lesson, lIdx) => {
                            const showLesson =
                              !isLocked || lIdx < 3;
                            return (
                              <div
                                key={lesson.id}
                                className="flex items-center py-2.5"
                                style={{
                                  opacity: showLesson ? 1 : 0.3,
                                  filter: showLesson
                                    ? "none"
                                    : "blur(3px)",
                                }}
                              >
                                <span
                                  className="font-inter text-xs w-7 flex-shrink-0 tabular-nums"
                                  style={{
                                    color: "rgba(0,0,0,0.2)",
                                  }}
                                >
                                  {String(lIdx + 1).padStart(
                                    2,
                                    "0"
                                  )}
                                </span>
                                <span
                                  className="font-inter text-sm leading-snug"
                                  style={{
                                    color: showLesson
                                      ? "rgba(0,0,0,0.7)"
                                      : "rgba(0,0,0,0.3)",
                                  }}
                                >
                                  {lesson.title}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {isLocked && mod.lessons.length > 3 && (
                          <button
                            onClick={handleUpgrade}
                            className="mt-6 font-inter text-sm font-semibold transition"
                            style={{ color: "#FF872A" }}
                          >
                            Unlock all {mod.lessons.length}{" "}
                            lessons
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            FAQ — real objections, real answers
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-10">
            <p
              className="font-inter text-sm font-medium tracking-widest uppercase text-center mb-4"
              style={{ color: "#FF872A" }}
            >
              Common questions
            </p>
            <h2 className="font-mont font-black text-3xl md:text-4xl text-benblack-500 text-center tracking-tight">
              Before you decide
            </h2>

            <div
              className="mt-12"
              style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
            >
              {FAQ.map((item, idx) => {
                const open = openFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <button
                      className="w-full flex items-center justify-between py-5 sm:py-6 text-left"
                      onClick={() =>
                        setOpenFaq(open ? null : idx)
                      }
                    >
                      <span
                        className="font-inter font-semibold text-sm sm:text-base pr-4"
                        style={{
                          color: open ? "#FF872A" : "#202127",
                        }}
                      >
                        {item.q}
                      </span>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 transition-transform duration-300"
                        style={{
                          color: open
                            ? "#FF872A"
                            : "rgba(0,0,0,0.2)",
                          transform: open
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {open && (
                      <p
                        className="pb-6 font-inter text-sm leading-relaxed pr-12"
                        style={{ color: "rgba(0,0,0,0.5)" }}
                      >
                        {item.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            FINAL CTA — site-wide dark footer pattern
        ══════════════════════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden py-20 md:py-28"
          style={{ backgroundColor: "#202127" }}
        >
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.12,
              backgroundImage:
                "radial-gradient(ellipse at 50% 0%, #FF872A, transparent 60%)",
            }}
          />

          <div className="relative max-w-2xl mx-auto px-6 sm:px-10 text-center">
            <h2
              className="font-mont font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight"
            >
              A year from now, you'll wish
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400">
                you started today.
              </span>
            </h2>

            <p
              className="mt-5 font-inter text-base max-w-lg mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Both tracks. {allLessons}+ lessons. Every future update. Community
              access. Job board. Conference discounts.
            </p>

            <div className="mt-10 inline-block">
              <span className="font-mont font-black text-5xl md:text-6xl text-white">
                $29
              </span>
              <span
                className="font-inter text-base ml-1"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                /mo
              </span>
            </div>

            <div
              className="mt-8 text-left max-w-sm mx-auto"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              {[
                "Full-Stack + Solidity tracks included",
                `${allLessons}+ lessons across 28 modules`,
                "All future updates and new content",
                "BEN community and Telegram group",
                "Job board with direct applications",
                "Partner deals and conference discounts",
                "Cancel anytime. No contracts.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center py-3.5 font-inter text-sm"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    borderBottom:
                      "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Check />
                  {item}
                </div>
              ))}
            </div>

            {mounted && !isPaid && (
              <button
                onClick={handleUpgrade}
                className="mt-10 px-12 py-4 rounded-full bg-benorange-500 text-white font-inter font-semibold text-sm tracking-wide transition"
                style={{
                  boxShadow: "0 8px 30px rgba(255,135,42,0.25)",
                }}
              >
                {user ? "Upgrade Now" : "Get Full Access"}
              </button>
            )}

            {mounted && isPaid && (
              <div className="mt-10">
                <button
                  onClick={() => scrollTo("curriculum")}
                  className="px-12 py-4 rounded-full bg-benorange-500 text-white font-inter font-semibold text-sm tracking-wide transition"
                  style={{
                    boxShadow:
                      "0 8px 30px rgba(255,135,42,0.25)",
                  }}
                >
                  Start Learning
                </button>
                <p
                  className="mt-3 font-inter text-xs"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  You have full access.
                </p>
              </div>
            )}

            <p
              className="mt-6 font-inter text-xs"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              $29/mo. Cancel anytime. No contracts.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </div>
  );
}
