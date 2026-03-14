import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import { useAuth } from "../lib/auth";
import LoginModal from "../components/LoginModal";
import { SOLIDITY_COURSE } from "../content/solidity";

const HeroLightspeed = dynamic(() => import("../components/HeroLightspeed").then(mod => mod.default), { ssr: false });

export default function SolidityPage() {
  const { user, isPaid, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const course = SOLIDITY_COURSE;
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  function handleUpgrade() {
    if (!user) {
      setShowLogin(true);
      return;
    }
    fetch("/api/checkout/membership", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.url) window.location.href = data.url;
      });
  }

  const FAQ_ITEMS = [
    {
      q: "Do I need to know Solidity before starting?",
      a: "No. The program starts from Ethereum and cryptography fundamentals and builds up to advanced Solidity. Having some familiarity helps, but writing secure smart contracts is the hard part, and that's what this program focuses on.",
    },
    {
      q: "Do I need JavaScript experience?",
      a: "Yes. You should be comfortable writing JavaScript, running unit tests, and building simple web apps. This is a smart contract engineering program, not a web development course. If you're starting from scratch, check out our Full-Stack Academy first.",
    },
    {
      q: "What tools will I use?",
      a: "Hardhat, Foundry, Slither, Echidna, ethers.js, Viem, OpenZeppelin, and more. You'll work with industry-standard tooling from day one.",
    },
    {
      q: "How much time should I dedicate per week?",
      a: "Plan for 15 to 25 hours per week depending on your background. Some modules are heavier than others. The program is self-paced, so you can go faster or slower as needed.",
    },
    {
      q: "Is this program fully online?",
      a: "Yes. All content is delivered through video and text. You can complete it from anywhere in the world at your own pace.",
    },
    {
      q: "What can I build after completing this?",
      a: "Production smart contracts, DeFi protocols, NFT systems, DAO governance frameworks, and more. Graduates are prepared for roles like Smart Contract Developer, Protocol Engineer, and Security Researcher.",
    },
    {
      q: "Will I be ready to do security audits?",
      a: "The program covers static analysis, fuzz testing, and common exploit patterns in depth. Becoming a full-time auditor requires additional experience, but you'll have a strong security foundation that most developers lack.",
    },
  ];

  return (
    <div>
      <HeaderWithLogoDark />
      <Head>
        <title>Solidity Program - BEN</title>
        <meta
          name="description"
          content="Learn Solidity smart contract development in 16 modules. Ethereum fundamentals, DeFi, security auditing, gas optimization, L2 scaling, and more."
        />
        <link rel="canonical" href="https://www.blockchainedu.org/solidity" />
      </Head>

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden" style={{ background: "#000" }}>
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.05,
              backgroundImage:
                "radial-gradient(ellipse at 40% 30%, #FF872A 0%, transparent 60%)",
            }}
          />
          <HeroLightspeed />

          <div className="relative max-w-3xl mx-auto px-6 pt-32 pb-40 md:pt-40 md:pb-48 text-center">
            <p
              className="font-inter text-sm font-medium tracking-widest uppercase mb-6"
              style={{ color: "#FF872A" }}
            >
              BEN Solidity Program
            </p>

            <h1 className="font-mont font-black text-5xl sm:text-6xl md:text-7xl text-white leading-none tracking-tight">
              Write smart contracts.
            </h1>
            <h1
              className="font-mont font-black text-5xl sm:text-6xl md:text-7xl leading-none tracking-tight mt-2"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Ship to mainnet.
            </h1>

            <p
              className="mt-8 max-w-lg mx-auto font-inter text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {totalLessons}+ lessons across 16 modules. Solidity, DeFi, security
              auditing, L2 scaling, Yul assembly. Go from first contract to
              production protocol.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center" style={{ gap: "1rem" }}>
              {mounted && isPaid ? (
                <button
                  onClick={() => {
                    setExpandedModule(0);
                    const el = document.getElementById("curriculum");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-10 py-4 rounded-full bg-benorange-500 text-white font-inter font-semibold text-sm tracking-wide transition"
                  style={{ boxShadow: "0 0 40px rgba(255,135,42,0.25)" }}
                >
                  Start Learning
                </button>
              ) : (
                <button
                  onClick={handleUpgrade}
                  className="px-10 py-4 rounded-full bg-benorange-500 text-white font-inter font-semibold text-sm tracking-wide transition"
                  style={{ boxShadow: "0 0 40px rgba(255,135,42,0.25)" }}
                >
                  Get Full Access
                </button>
              )}
              <button
                onClick={() => {
                  const el = document.getElementById("curriculum");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-10 py-4 rounded-full font-inter font-semibold text-sm tracking-wide transition"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                View Curriculum
              </button>
            </div>
          </div>
        </section>

        {/* ── Numbers strip ── */}
        <section style={{ background: "#0a0a0a" }}>
          <div
            className="max-w-4xl mx-auto px-6 py-16 flex justify-around"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { n: "16", label: "Modules" },
              { n: `${totalLessons}+`, label: "Lessons" },
              { n: "16", label: "Assignments" },
              { n: "$29", label: "/month" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-mont font-black text-3xl md:text-4xl text-white">{s.n}</div>
                <div
                  className="font-inter text-xs mt-2 uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── What you'll learn ── */}
        <section className="py-24 md:py-32" style={{ background: "#fafafa" }}>
          <div className="max-w-5xl mx-auto px-6">
            <p
              className="font-inter text-sm font-medium tracking-widest uppercase text-center mb-4"
              style={{ color: "#FF872A" }}
            >
              Skills
            </p>
            <h2 className="font-mont font-black text-3xl md:text-5xl text-benblack-500 text-center tracking-tight">
              Everything you need
            </h2>
            <p
              className="mt-4 text-center font-inter text-lg max-w-lg mx-auto"
              style={{ color: "rgba(0,0,0,0.4)" }}
            >
              From your first smart contract to auditing production protocols
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 mt-16" style={{ gap: "1px", background: "rgba(0,0,0,0.06)" }}>
              {[
                { skill: "Solidity", desc: "Types, storage, modifiers, inheritance" },
                { skill: "Ethereum & EVM", desc: "Opcodes, gas mechanics, state tries" },
                { skill: "Smart Contract Security", desc: "Reentrancy, overflow, access control" },
                { skill: "Token Standards", desc: "ERC-20, ERC-721, ERC-1155 deep dives" },
                { skill: "DeFi Protocols", desc: "AMMs, lending, flash loans, vaults" },
                { skill: "Foundry & Hardhat", desc: "Testing, deployment, gas profiling" },
                { skill: "Yul Assembly", desc: "Inline assembly, opcodes, optimization" },
                { skill: "Layer 2 Scaling", desc: "Optimistic rollups, ZK rollups, bridges" },
                { skill: "Account Abstraction", desc: "ERC-4337, gasless UX, smart wallets" },
                { skill: "Oracles", desc: "Chainlink feeds, VRF, TWAP pricing" },
                { skill: "Security Analysis", desc: "Slither, Echidna, fuzz testing" },
                { skill: "DAOs & Governance", desc: "Proposals, voting, timelocks" },
              ].map((item) => (
                <div
                  key={item.skill}
                  className="p-8 md:p-10"
                  style={{ background: "#fafafa" }}
                >
                  <h3 className="font-mont font-bold text-base text-benblack-500">
                    {item.skill}
                  </h3>
                  <p
                    className="font-inter text-sm mt-2 leading-relaxed"
                    style={{ color: "rgba(0,0,0,0.4)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Curriculum ── */}
        <section id="curriculum" className="py-24 md:py-32 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <p
              className="font-inter text-sm font-medium tracking-widest uppercase text-center mb-4"
              style={{ color: "#FF872A" }}
            >
              Curriculum
            </p>
            <h2 className="font-mont font-black text-3xl md:text-5xl text-benblack-500 text-center tracking-tight">
              16 modules. Your pace.
            </h2>
            <p
              className="mt-4 text-center font-inter text-lg max-w-md mx-auto"
              style={{ color: "rgba(0,0,0,0.4)" }}
            >
              Each module builds on the last. Expand to preview lessons.
            </p>

            <div className="mt-16">
              {course.modules.map((mod, idx) => {
                const isExpanded = expandedModule === idx;
                const isLocked = !mounted || !isPaid;
                const num = String(mod.id).padStart(2, "0");

                return (
                  <div
                    key={mod.id}
                    style={{
                      borderBottom: idx < course.modules.length - 1
                        ? "1px solid rgba(0,0,0,0.06)"
                        : "none",
                    }}
                  >
                    <button
                      className="w-full flex items-center py-7 text-left"
                      onClick={() => setExpandedModule(isExpanded ? null : idx)}
                    >
                      <span
                        className="font-mont font-black text-3xl md:text-4xl mr-6 md:mr-8 flex-shrink-0 w-12 text-right"
                        style={{ color: isExpanded ? "#FF872A" : "rgba(0,0,0,0.08)" }}
                      >
                        {num}
                      </span>

                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-mont font-bold text-lg md:text-xl tracking-tight"
                          style={{ color: isExpanded ? "#FF872A" : "#202127" }}
                        >
                          {mod.title}
                        </h3>
                        <p
                          className="font-inter text-sm mt-1"
                          style={{ color: "rgba(0,0,0,0.35)" }}
                        >
                          {mod.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center ml-4 flex-shrink-0" style={{ gap: "1rem" }}>
                        <span
                          className="font-inter text-xs hidden sm:block"
                          style={{ color: "rgba(0,0,0,0.3)" }}
                        >
                          {mod.lessons.length} lessons
                        </span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-transform duration-300"
                          style={{
                            color: isExpanded ? "#FF872A" : "rgba(0,0,0,0.2)",
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="pb-8 pl-16 md:pl-20 pr-4">
                        <div className="space-y-0">
                          {mod.lessons.map((lesson, lIdx) => {
                            const showLesson = !isLocked || lIdx < 3;
                            return (
                              <div
                                key={lesson.id}
                                className="flex items-center py-2.5"
                                style={{
                                  opacity: showLesson ? 1 : 0.3,
                                  filter: showLesson ? "none" : "blur(3px)",
                                }}
                              >
                                <span
                                  className="font-inter text-xs w-7 flex-shrink-0 tabular-nums"
                                  style={{ color: "rgba(0,0,0,0.2)" }}
                                >
                                  {String(lIdx + 1).padStart(2, "0")}
                                </span>
                                <span
                                  className="font-inter text-sm leading-snug"
                                  style={{ color: showLesson ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.3)" }}
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
                            Unlock all {mod.lessons.length} lessons
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

        {/* ── Who this is for ── */}
        <section className="py-24 md:py-32" style={{ background: "#fafafa" }}>
          <div className="max-w-3xl mx-auto px-6">
            <p
              className="font-inter text-sm font-medium tracking-widest uppercase text-center mb-4"
              style={{ color: "#FF872A" }}
            >
              Is this for you?
            </p>
            <h2 className="font-mont font-black text-3xl md:text-5xl text-benblack-500 text-center tracking-tight">
              Built for builders
            </h2>
            <p
              className="mt-4 text-center font-inter text-lg max-w-md mx-auto"
              style={{ color: "rgba(0,0,0,0.4)" }}
            >
              This program is for developers who want to go deep on smart contracts
            </p>

            <div className="mt-16">
              {[
                {
                  title: "Web developers moving to Web3",
                  desc: "You know JavaScript and want to add smart contract skills. This program bridges the gap between frontend and on-chain development.",
                },
                {
                  title: "Engineers who want to understand the EVM",
                  desc: "Not just writing Solidity that compiles, but understanding what happens at the bytecode level. Storage layout, gas costs, and why things work the way they do.",
                },
                {
                  title: "Founders building on-chain products",
                  desc: "About 15% of students are founders. Understanding smart contracts at a deep level helps you make better architecture decisions and evaluate your team's code.",
                },
                {
                  title: "Developers aiming for security roles",
                  desc: "The program covers static analysis, fuzz testing, and exploit recreation. A strong foundation for anyone working toward security research or auditing.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex py-8"
                  style={{
                    borderBottom: idx < 3 ? "1px solid rgba(0,0,0,0.06)" : "none",
                  }}
                >
                  <span
                    className="font-mont font-black text-3xl mr-6 flex-shrink-0 w-10 text-right"
                    style={{ color: "rgba(0,0,0,0.06)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-mont font-bold text-lg text-benblack-500 tracking-tight">
                      {item.title}
                    </h3>
                    <p
                      className="font-inter text-sm mt-2 leading-relaxed max-w-lg"
                      style={{ color: "rgba(0,0,0,0.45)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <p
              className="font-inter text-sm font-medium tracking-widest uppercase text-center mb-4"
              style={{ color: "#FF872A" }}
            >
              FAQ
            </p>
            <h2 className="font-mont font-black text-3xl md:text-5xl text-benblack-500 text-center tracking-tight">
              Common questions
            </h2>

            <div className="mt-16">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      borderBottom: idx < FAQ_ITEMS.length - 1
                        ? "1px solid rgba(0,0,0,0.06)"
                        : "none",
                    }}
                  >
                    <button
                      className="w-full flex items-center justify-between py-6 text-left"
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    >
                      <span
                        className="font-mont font-bold text-base md:text-lg tracking-tight pr-4"
                        style={{ color: isOpen ? "#FF872A" : "#202127" }}
                      >
                        {item.q}
                      </span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0 transition-transform duration-300"
                        style={{
                          color: isOpen ? "#FF872A" : "rgba(0,0,0,0.2)",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {isOpen && (
                      <p
                        className="pb-6 font-inter text-sm leading-relaxed"
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

        {/* ── Pricing CTA ── */}
        {mounted && !isPaid && (
          <section className="py-24 md:py-32" style={{ background: "#000" }}>
            <div className="max-w-2xl mx-auto px-6 text-center">
              <p
                className="font-inter text-sm font-medium tracking-widest uppercase mb-6"
                style={{ color: "#FF872A" }}
              >
                Membership
              </p>
              <h2 className="font-mont font-black text-4xl md:text-6xl text-white tracking-tight leading-none">
                $29<span className="font-inter text-xl" style={{ color: "rgba(255,255,255,0.3)" }}>/mo</span>
              </h2>
              <p
                className="mt-2 font-inter text-lg"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Cancel anytime. No contracts.
              </p>

              <div
                className="mt-12 text-left max-w-sm mx-auto"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                {[
                  `${totalLessons}+ lessons across 16 modules`,
                  "Hands-on assignments with real smart contracts",
                  "Full-Stack Academy included (300+ extra lessons)",
                  "BEN community and Telegram access",
                  "Job board with direct applications",
                  "Partner deals and conference discounts",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center py-4 font-inter text-sm"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
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
                    {item}
                  </div>
                ))}
              </div>

              <button
                onClick={handleUpgrade}
                className="mt-12 px-12 py-4 rounded-full bg-benorange-500 text-white font-inter font-semibold text-sm tracking-wide transition"
                style={{ boxShadow: "0 0 40px rgba(255,135,42,0.2)" }}
              >
                {user ? "Upgrade Now" : "Join BEN"}
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
