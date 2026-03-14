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

const allLessons =
  ACADEMY_COURSE.modules.reduce((s, m) => s + m.lessons.length, 0) +
  SOLIDITY_COURSE.modules.reduce((s, m) => s + m.lessons.length, 0);

const fsModules = ACADEMY_COURSE.modules.length;
const solModules = SOLIDITY_COURSE.modules.length;

const BENEFITS = [
  `${allLessons}+ lessons across ${fsModules + solModules} modules`,
  "Full-Stack + Solidity tracks",
  "All future updates and new content",
  "BEN community and Telegram group",
  "Job board with direct applications",
  "Partner deals and conference discounts",
];

export default function PricingPage() {
  const { user, isPaid, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  function handleCheckout() {
    if (!user) {
      setShowLogin(true);
      return;
    }
    fetch("/api/checkout/membership", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: "monthly" }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.url) window.location.href = data.url;
      });
  }

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
      className="mr-3 flex-shrink-0"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  return (
    <div>
      <HeaderWithLogoDark />
      <Head>
        <title>BEN Membership — $29/mo | Everything Included</title>
        <meta
          name="description"
          content={`Full-stack and Solidity courses, job board, community, partner deals. ${allLessons}+ lessons. $29/month, cancel anytime.`}
        />
        <link rel="canonical" href="https://www.blockchainedu.org/pricing" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BEN Membership — $29/mo. Everything Included." />
        <meta
          property="og:description"
          content={`Two career tracks. ${allLessons}+ lessons. Job board. Community. $29/mo.`}
        />
        <meta property="og:url" content="https://www.blockchainedu.org/pricing" />
        <meta
          property="og:image"
          content="https://www.blockchainedu.org/images/light-2-logo.jpg"
        />
      </Head>

      <main>
        {/* ── Hero ── */}
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
              Membership
            </span>

            <h1
              className="font-mont text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight"
              style={{ lineHeight: 1.08 }}
            >
              One price.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400">
                Everything included.
              </span>
            </h1>

            <p
              className="mt-6 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-inter"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Courses, job board, community, partner deals, conference discounts.
              $29/mo. Cancel anytime.
            </p>
          </div>
        </section>

        {/* ── Single Pricing Card ── */}
        <section style={{ backgroundColor: "#f5f7f7", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
          <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 md:py-20">
            {/* Comparison strip */}
            <div className="text-center mb-4">
              <p className="font-inter text-sm" style={{ color: "rgba(0,0,0,0.35)" }}>
                <span style={{ textDecoration: "line-through", color: "rgba(0,0,0,0.2)" }}>$40K CS degree</span>
                {" "}/{" "}
                <span style={{ textDecoration: "line-through", color: "rgba(0,0,0,0.2)" }}>$15K bootcamp</span>
                {" "}/{" "}
                <span style={{ color: "#FF872A", fontWeight: 600 }}>BEN $29/mo</span>
              </p>
            </div>

            <div className="max-w-md mx-auto mt-10">
              <div
                className="rounded-2xl p-8 flex flex-col"
                style={{
                  backgroundColor: "#fff",
                  border: "2px solid #FF872A",
                }}
              >
                <h3
                  className="font-mont font-black text-lg"
                  style={{ color: "#1d1d1f" }}
                >
                  BEN Membership
                </h3>

                <div className="mt-4 flex items-end" style={{ gap: "0.25rem" }}>
                  <span
                    className="font-mont font-black text-5xl"
                    style={{ color: "#1d1d1f", lineHeight: 1 }}
                  >
                    $29
                  </span>
                  <span
                    className="font-inter text-base pb-1"
                    style={{ color: "rgba(0,0,0,0.3)" }}
                  >
                    /mo
                  </span>
                </div>

                <p
                  className="mt-2 font-inter text-sm"
                  style={{ color: "rgba(0,0,0,0.4)" }}
                >
                  Cancel anytime. No contracts.
                </p>

                <div className="mt-6">
                  {BENEFITS.map((item) => (
                    <div
                      key={item}
                      className="flex items-center py-2.5 font-inter text-sm"
                      style={{ color: "rgba(0,0,0,0.55)" }}
                    >
                      <Check />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  {mounted && isPaid ? (
                    <button
                      onClick={() => router.push("/academy")}
                      className="w-full py-3.5 rounded-full font-inter font-semibold text-sm transition bg-benorange-500 text-white"
                      style={{ boxShadow: "0 8px 30px rgba(255,135,42,0.25)" }}
                    >
                      Go to Academy
                    </button>
                  ) : (
                    <button
                      onClick={handleCheckout}
                      className="w-full py-3.5 rounded-full font-inter font-semibold text-sm transition bg-benorange-500 text-white"
                      style={{ boxShadow: "0 8px 30px rgba(255,135,42,0.25)" }}
                    >
                      Join BEN — $29/mo
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Tracks ── */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2" style={{ gap: "1.5rem" }}>
              <div
                className="rounded-2xl p-8"
                style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <span
                  className="inline-block text-xs font-bold uppercase px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,135,42,0.08)",
                    color: "#FF872A",
                    letterSpacing: "0.1em",
                    fontSize: "10px",
                  }}
                >
                  Track 1
                </span>
                <h3 className="mt-4 font-mont font-black text-xl" style={{ color: "#1d1d1f" }}>
                  Full-Stack Development
                </h3>
                <p className="mt-2 font-inter text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.45)" }}>
                  From zero to deploying production apps. {fsModules} modules covering
                  JavaScript, React, Node.js, databases, authentication, and deployment.
                </p>
                <div className="mt-5">
                  <span className="font-inter text-xs font-semibold uppercase" style={{ color: "rgba(0,0,0,0.3)", letterSpacing: "0.1em" }}>
                    Average salary
                  </span>
                  <p className="font-mont font-black text-lg" style={{ color: "#1d1d1f" }}>$85K — $160K</p>
                </div>
              </div>

              <div
                className="rounded-2xl p-8"
                style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <span
                  className="inline-block text-xs font-bold uppercase px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,135,42,0.08)",
                    color: "#FF872A",
                    letterSpacing: "0.1em",
                    fontSize: "10px",
                  }}
                >
                  Track 2
                </span>
                <h3 className="mt-4 font-mont font-black text-xl" style={{ color: "#1d1d1f" }}>
                  Solidity Engineering
                </h3>
                <p className="mt-2 font-inter text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.45)" }}>
                  For developers ready to go onchain. {solModules} modules covering Solidity,
                  smart contract security, DeFi protocols, and mainnet deployment.
                </p>
                <div className="mt-5">
                  <span className="font-inter text-xs font-semibold uppercase" style={{ color: "rgba(0,0,0,0.3)", letterSpacing: "0.1em" }}>
                    Average salary
                  </span>
                  <p className="font-mont font-black text-lg" style={{ color: "#1d1d1f" }}>$120K — $250K+</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ backgroundColor: "#fff", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
          <div className="max-w-2xl mx-auto px-6 sm:px-10 py-16 md:py-20">
            <h2
              className="font-mont font-black text-2xl sm:text-3xl text-center tracking-tight mb-10"
              style={{ color: "#1d1d1f" }}
            >
              Common questions
            </h2>

            {[
              {
                q: "What do I get for $29/mo?",
                a: "Everything. Both career tracks, all lessons, community access, job board with direct applications, partner deals, and conference discounts. No feature gating, no add-ons.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. Cancel in one click from your dashboard. No contracts, no cancellation fees. Your access continues until the end of the billing period.",
              },
              {
                q: "Why $29/mo when bootcamps charge $15,000?",
                a: "Bootcamps have classrooms, staff, and overhead. We don't. You get the same curriculum depth at a fraction of the cost, plus a job board and community that bootcamps can't match.",
              },
              {
                q: "What if I want both tracks?",
                a: "Your membership unlocks everything. Full-Stack, Solidity, and anything we add in the future. Start with one, switch when you're ready.",
              },
              {
                q: "Can I get a refund?",
                a: "If you're not satisfied within 30 days, email us and we'll refund you. No questions asked.",
              },
              {
                q: "Do I need prior coding experience?",
                a: "Not for the Full-Stack track. It starts at absolute zero. The Solidity track assumes you can already code in at least one language.",
              },
            ].map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section
          className="relative overflow-hidden py-16 md:py-20"
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
            <h2 className="font-mont font-black text-3xl sm:text-4xl text-white leading-tight tracking-tight">
              Start learning today.
            </h2>
            <p
              className="mt-4 font-inter text-base max-w-md mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {allLessons}+ lessons. Two career tracks. $29/month. Cancel anytime.
            </p>

            <div className="mt-8">
              {mounted && isPaid ? (
                <button
                  onClick={() => router.push("/academy")}
                  className="px-10 py-4 rounded-full bg-benorange-500 text-white font-inter font-semibold text-sm tracking-wide transition"
                  style={{ boxShadow: "0 8px 30px rgba(255,135,42,0.25)" }}
                >
                  Go to Academy
                </button>
              ) : (
                <button
                  onClick={handleCheckout}
                  className="px-10 py-4 rounded-full bg-benorange-500 text-white font-inter font-semibold text-sm tracking-wide transition"
                  style={{ boxShadow: "0 8px 30px rgba(255,135,42,0.25)" }}
                >
                  Join BEN — $29/mo
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <button
        className="w-full flex items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-mont font-bold text-sm sm:text-base pr-4" style={{ color: "#1d1d1f" }}>
          {q}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            color: open ? "#FF872A" : "rgba(0,0,0,0.2)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <p className="pb-5 font-inter text-sm leading-relaxed pr-12" style={{ color: "rgba(0,0,0,0.5)" }}>
          {a}
        </p>
      )}
    </div>
  );
}
