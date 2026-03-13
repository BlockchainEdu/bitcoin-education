import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import AnimatedCounter from "../components/AnimatedCounter";

const HeroLightspeed = dynamic(
  () => import("../components/HeroLightspeed").then((mod) => mod.default),
  { ssr: false }
);

/* ══════════════════════════════════════════════════════════════════════
   APPLICATION STEPS — YC-caliber questions
   ══════════════════════════════════════════════════════════════════════ */
const STEPS = [
  {
    id: "founders",
    title: "Tell us about you.",
    subtitle: "Start with the basics.",
    fields: [
      { key: "founder_name", label: "Full name", type: "text", required: true, placeholder: "Jane Doe" },
      { key: "email", label: "Email", type: "email", required: true, placeholder: "jane@example.com" },
      { key: "linkedin", label: "LinkedIn URL", type: "url", placeholder: "https://linkedin.com/in/..." },
      { key: "university", label: "University (current or alma mater)", type: "text", placeholder: "MIT, Stanford, self-taught..." },
      {
        key: "role",
        label: "Your role in the company",
        type: "select",
        options: ["Solo Founder", "CEO / Co-founder", "CTO / Technical Co-founder", "COO / Operations Co-founder"],
      },
    ],
  },
  {
    id: "team",
    title: "Your team.",
    subtitle: "We fund teams, not slide decks.",
    fields: [
      {
        key: "team_size",
        label: "How many founders (including you)?",
        type: "select",
        options: ["1 (solo)", "2", "3", "4+"],
      },
      { key: "team_breakdown", label: "List each founder: name, role, and what they're best at.", type: "textarea", required: true, placeholder: "Jane (CEO) — fundraising, GTM, 3 years in DeFi at Aave\nJohn (CTO) — Solidity, built 2 production smart contracts, ex-Chainlink" },
      { key: "how_met", label: "How long have the founders known each other and how did you meet?", type: "textarea", placeholder: "Met freshman year at MIT Bitcoin Club, been hacking on projects together for 3 years..." },
      {
        key: "worked_together",
        label: "Have you shipped something together before?",
        type: "select",
        options: ["Yes — shipped and launched", "Yes — built but didn't launch", "No, first time"],
      },
      { key: "who_codes_who_sells", label: "Who writes code? Who talks to users?", type: "textarea", placeholder: "John builds, Jane sells. Jane ran 40+ user interviews last month..." },
    ],
  },
  {
    id: "idea",
    title: "What are you building?",
    subtitle: "Clarity is a signal. Show us yours.",
    fields: [
      { key: "one_liner", label: "Describe your company in one sentence.", type: "text", required: true, placeholder: "e.g. Stripe for stablecoin payments", maxLength: 100 },
      { key: "problem", label: "What problem are you solving? Who has this problem and how do you know?", type: "textarea", required: true, placeholder: "Be specific. Name the user. Describe the pain. How did you discover this?" },
      { key: "insight", label: "What do you understand about this problem that everyone else gets wrong?", type: "textarea", required: true, placeholder: "This is your secret. The thing you see that others miss..." },
      { key: "how_it_works", label: "Walk us through the product. What does the user do, step by step?", type: "textarea", placeholder: "User connects wallet → deposits USDC → selects yield strategy → ..." },
    ],
  },
  {
    id: "progress",
    title: "Show us what you've done.",
    subtitle: "Talk is cheap. We want to see evidence of building.",
    fields: [
      {
        key: "stage",
        label: "What stage are you at right now?",
        type: "select",
        required: true,
        options: ["Idea only", "Prototype / MVP", "Private beta with users", "Public and growing", "Revenue"],
      },
      { key: "most_impressive", label: "What is the most impressive thing you've built or achieved so far?", type: "textarea", required: true, placeholder: "Could be this project or anything else. We want to know what you're capable of." },
      { key: "users_count", label: "Users, customers, or waitlist? Give us a number and growth rate.", type: "text", placeholder: "0, 200 waitlist, 50 DAU growing 15% week-over-week..." },
      { key: "project_url", label: "Live URL or testnet deployment (if any)", type: "url", placeholder: "https://yourproject.com" },
      { key: "demo_url", label: "2-minute demo video (Loom, YouTube)", type: "url", placeholder: "https://loom.com/share/..." },
    ],
  },
  {
    id: "market",
    title: "Market & vision.",
    subtitle: "Where is this going and why does it get big?",
    fields: [
      { key: "revenue_model", label: "How do you make money?", type: "textarea", required: true, placeholder: "0.3% swap fee, $20/mo subscription, take rate on transactions..." },
      { key: "competitors", label: "Who are your competitors? What do you understand that they don't?", type: "textarea", placeholder: "Don't say 'no competitors.' Everyone has competition. Tell us why you win." },
      { key: "twelve_month_plan", label: "Where will you be in 12 months if we fund you?", type: "textarea", required: true, placeholder: "Be specific: users, revenue, team size, milestones..." },
      { key: "unfair_advantage", label: "Why is your team the one to build this?", type: "textarea", placeholder: "Domain expertise, proprietary tech, unique distribution, network effects..." },
    ],
  },
  {
    id: "ask",
    title: "The ask.",
    subtitle: "What do you need?",
    fields: [
      { key: "raising_amount", label: "How much are you raising in this round?", type: "text", required: true, placeholder: "$50K, $150K, $500K..." },
      { key: "use_of_funds", label: "How will you spend it? Be specific.", type: "textarea", required: true, placeholder: "$80K engineering (2 devs x 6mo), $20K audit, $15K marketing, $10K infra..." },
      {
        key: "raised_before",
        label: "Have you raised money before?",
        type: "select",
        options: ["No, first raise", "Yes, friends & family", "Yes, angel round", "Yes, institutional", "Grants only"],
      },
      { key: "why_ben", label: "Why BEN Ventures? What do you want beyond money?", type: "textarea", placeholder: "Be honest. Distribution through 10K students? Intros to protocols? Mentorship?" },
    ],
  },
  {
    id: "conviction",
    title: "Last thing.",
    subtitle: "These separate good applications from great ones.",
    fields: [
      { key: "ten_year_question", label: "If you could only work on one thing for the next 10 years, would it be this? Why or why not?", type: "textarea", required: true, placeholder: "Be honest. We'd rather fund someone who says 'no, but here's why I'm doing it now' than someone who fakes conviction." },
      { key: "contrarian_belief", label: "What is something you believe about your market that most people think is wrong?", type: "textarea", placeholder: "The best companies are built on contrarian insights that turn out to be right..." },
      { key: "anything_else", label: "Anything else we should know?", type: "textarea", placeholder: "Awards, press, notable achievements, pivots, or context that doesn't fit elsewhere..." },
      {
        key: "referral_source",
        label: "How did you hear about BEN Ventures?",
        type: "select",
        options: ["BEN website", "Twitter / X", "LinkedIn", "A friend or BEN member", "University club", "Conference / event", "Other"],
      },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════════════
   PORTFOLIO — Recent investments
   ══════════════════════════════════════════════════════════════════════ */
const PORTFOLIO = [
  {
    name: "Vana",
    desc: "User-owned data network for AI. EVM-compatible L1 letting users own and monetize their personal data through DataDAOs.",
    tag: "Data / AI",
    raised: "$25M+",
    investors: "Paradigm, Coinbase Ventures, Polychain",
  },
  {
    name: "Naoris Protocol",
    desc: "Decentralized cybersecurity mesh that turns every connected device into a validator node. Post-quantum security layer beneath existing blockchains.",
    tag: "Cybersecurity",
    raised: "$15M+",
    investors: "Tim Draper, Draper Associates",
  },
  {
    name: "Llama",
    desc: "On-chain governance and access control framework for DAOs. Used by Aave and major protocols to manage treasuries and permissions.",
    tag: "Governance",
    raised: "$6M",
    investors: "Founders Fund, Electric Capital",
  },
  {
    name: "Shield",
    desc: "First decentralized perpetual options protocol. Non-cooperative game theory framework for on-chain derivatives infrastructure.",
    tag: "DeFi",
    raised: "$2M",
    investors: "HashKey, OKX Ventures, SevenX",
  },
  {
    name: "ChatLayer",
    desc: "AI-native communication layer for Web3 communities. Building the infrastructure for on-chain conversational experiences.",
    tag: "AI / Social",
    raised: "Pre-seed",
    investors: "BEN Ventures",
  },
];

/* ══════════════════════════════════════════════════════════════════════
   ALUMNI — Success stories from BEN network
   ══════════════════════════════════════════════════════════════════════ */
const ALUMNI = [
  {
    name: "Jinglan Wang",
    company: "Optimism",
    role: "Co-Founder",
    story: "Was BEN's Executive Director before co-founding Optimism, the Ethereum L2 that processes millions of transactions daily.",
    image: "/images/people/jinglan-wang.jpeg",
    highlight: "Former BEN Executive Director",
  },
  {
    name: "Jeremy Gardner",
    company: "Augur",
    role: "Co-Founder of BEN & Augur",
    story: "Founded BEN at the University of Michigan in 2014, then co-founded Augur, the first decentralized prediction market on Ethereum and first utility token ICO.",
    image: "/images/team/jeremy-gardner-new.jpeg",
    highlight: "Founded BEN in 2014",
  },
  {
    name: "Ryan Breslow",
    company: "Bolt",
    role: "Founder & CEO",
    story: "Dropped out of Stanford at 19. Built Bolt into an $11 billion company. Returned as CEO in 2025 to expand into crypto, fintech, and e-commerce.",
    image: "/images/people/ryan-breslow.jpeg",
    highlight: "$11B valuation",
  },
  {
    name: "Eric Chen",
    company: "Injective",
    role: "Co-Founder & CEO",
    story: "Left NYU at 19 to co-found Injective, now a $1.3B DeFi chain backed by Mark Cuban. Deutsche Telekom runs a validator on the network.",
    image: "/images/people/eric-chen.jpeg",
    highlight: "$1.3B DeFi chain",
  },
  {
    name: "Andy Bromberg",
    company: "CoinList",
    role: "Co-Founder",
    story: "Started the Stanford Bitcoin Group as a student. Founded CoinList ($1.5B), which ran token sales for Solana, Filecoin, and Near Protocol.",
    image: "/images/people/andy-bromberg.jpeg",
    highlight: "CoinList — $1.5B",
  },
  {
    name: "Dominik Schiener",
    company: "IOTA",
    role: "Co-Founder",
    story: "Co-founded IOTA, the distributed ledger for the Internet of Things, which reached a peak market cap of over $14 billion. Won his first hackathon at 16.",
    image: "/images/people/dominik-schiener.jpeg",
    highlight: "$14B peak market cap",
  },
  {
    name: "Joey Krug",
    company: "Founders Fund",
    role: "Partner",
    story: "Co-founded Augur in 2014, dropped out of college to do it. Now a Partner at Peter Thiel's Founders Fund and early backer of Polymarket.",
    image: "/images/people/joey-krug.jpeg",
    highlight: "Partner at Founders Fund",
  },
  {
    name: "Jelena Djuric",
    company: "Noble",
    role: "Co-Founder & CEO",
    story: "Co-founded Noble, the chain that brought native USDC to the Cosmos ecosystem. Previously Head of DevRel at the Interchain Foundation.",
    image: "/images/people/jelena-djuric.jpeg",
    highlight: "Native USDC on Cosmos",
  },
];

/* ══════════════════════════════════════════════════════════════════════
   WHAT WE OFFER
   ══════════════════════════════════════════════════════════════════════ */
const OFFERS = [
  {
    title: "Pre-seed Capital",
    desc: "$25K-$150K checks. Fast decisions, founder-friendly terms. No 40-page legal docs.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    ),
  },
  {
    title: "10K+ Student Network",
    desc: "Your first 100 users might already be in BEN. Distribution through 200+ university blockchain clubs.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
  },
  {
    title: "Founder Mentorship",
    desc: "Direct access to BEN alumni who built Optimism, Augur, CoinList, Injective, and Bolt.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
    ),
  },
  {
    title: "Protocol Introductions",
    desc: "Warm intros to ecosystem funds, grant programs, and partnerships. Not cold emails.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    ),
  },
];

/* ══════════════════════════════════════════════════════════════════════
   FAQ
   ══════════════════════════════════════════════════════════════════════ */
const FAQ = [
  {
    q: "Who can apply?",
    a: "Anyone building in Web3. We prioritize student founders and recent graduates, but great ideas come from everywhere. If you're building something real, apply.",
  },
  {
    q: "How much do you invest?",
    a: "$25K to $150K pre-seed checks. We move fast and keep terms simple.",
  },
  {
    q: "What stage should my project be at?",
    a: "We invest across the spectrum. Having a prototype or users helps, but a clear problem and strong team matter more than metrics at this stage.",
  },
  {
    q: "How long does the process take?",
    a: "We review applications weekly. If we're interested, you'll hear from us within 7 days. First call to term sheet is typically 2-3 weeks.",
  },
  {
    q: "Do I need to be a BEN member?",
    a: "No. Membership is separate. But accepted founders get lifetime BEN access as part of the deal.",
  },
  {
    q: "What makes a strong application?",
    a: "Clarity, velocity, and honesty. Can you explain your idea in one sentence? Have you already started building? Do you know who your user is? We care about those things more than polished decks.",
  },
];

/* ══════════════════════════════════════════════════════════════════════
   FULLSCREEN APPLICATION MODAL
   ══════════════════════════════════════════════════════════════════════ */
function ApplicationModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const currentStep = STEPS[step];
  const isLastStep = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape key closes modal
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function canProceed() {
    if (!currentStep) return false;
    return currentStep.fields
      .filter((f) => f.required)
      .every((f) => form[f.key] && form[f.key].trim() !== "");
  }

  function handleNext() {
    if (!canProceed()) return;
    if (isLastStep) {
      handleSubmit();
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  // Enter key advances (unless in textarea)
  function handleKeyDown(e) {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA" && canProceed()) {
      e.preventDefault();
      handleNext();
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/ventures/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0"
      style={{ zIndex: 9999, backgroundColor: "#0a0a0b" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.06,
          backgroundImage:
            "radial-gradient(ellipse at 50% 30%, #FF872A, transparent 60%)",
        }}
      />

      {/* Top bar: progress + close */}
      <div className="relative flex items-center justify-between px-6 sm:px-10 pt-6 pb-4" style={{ zIndex: 2 }}>
        <div className="flex items-center" style={{ gap: "0.75rem" }}>
          <img src="/images/ben-logo-color-no-slogan.svg" alt="BEN" className="h-6 opacity-50" />
          <span className="text-xs font-inter" style={{ color: "rgba(255,255,255,0.3)" }}>
            Ventures Application
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="relative px-6 sm:px-10" style={{ zIndex: 2 }}>
        <div className="max-w-xl mx-auto">
          <div className="w-full h-0.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-0.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: "#FF872A" }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div
        className="relative overflow-y-auto"
        style={{
          zIndex: 2,
          height: "calc(100vh - 80px)",
          paddingBottom: "120px",
        }}
      >
        <div className="max-w-xl mx-auto px-6 sm:px-10 pt-10 sm:pt-16">
          {submitted ? (
            /* ── Success ── */
            <div className="text-center pt-16">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ backgroundColor: "rgba(255, 135, 42, 0.1)" }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF872A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="font-mont font-black text-3xl text-white mb-4">
                Application received.
              </h2>
              <p className="text-sm font-inter leading-relaxed max-w-sm mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
                We review applications every week. If we want to talk, you'll hear from us
                within 7 days at <span className="text-white">{form.email}</span>.
              </p>
              <button
                onClick={onClose}
                className="mt-10 px-6 py-3 rounded-full text-sm font-inter font-semibold text-white transition-all duration-200"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Step counter */}
              <div className="mb-2">
                <span className="text-xs font-inter font-medium" style={{ color: "#FF872A" }}>
                  {step + 1} / {STEPS.length}
                </span>
              </div>

              {/* Step title */}
              <h2 className="font-mont font-black text-2xl sm:text-3xl text-white mb-1" style={{ lineHeight: 1.15 }}>
                {currentStep.title}
              </h2>
              <p className="text-sm font-inter mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
                {currentStep.subtitle}
              </p>

              {/* Fields */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                onKeyDown={handleKeyDown}
              >
                {currentStep.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-inter font-medium text-white mb-2" style={{ lineHeight: 1.5 }}>
                      {field.label}
                      {field.required && <span style={{ color: "#FF872A" }}> *</span>}
                    </label>

                    {field.type === "textarea" ? (
                      <textarea
                        value={form[field.key] || ""}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full rounded-xl px-4 py-3 text-sm font-inter text-white placeholder-gray-600 focus:outline-none transition-colors resize-none"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          lineHeight: 1.7,
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "rgba(255,135,42,0.3)"; e.target.style.backgroundColor = "rgba(255,255,255,0.06)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                      />
                    ) : field.type === "select" ? (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {field.options.map((opt) => {
                          const selected = form[field.key] === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => updateField(field.key, opt)}
                              className="px-4 py-2 rounded-full text-sm font-inter transition-all duration-150"
                              style={{
                                backgroundColor: selected ? "rgba(255,135,42,0.15)" : "rgba(255,255,255,0.04)",
                                color: selected ? "#FF872A" : "rgba(255,255,255,0.45)",
                                border: selected ? "1px solid rgba(255,135,42,0.35)" : "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        value={form[field.key] || ""}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                        className="w-full rounded-xl px-4 py-3 text-sm font-inter text-white placeholder-gray-600 focus:outline-none transition-colors"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "rgba(255,135,42,0.3)"; e.target.style.backgroundColor = "rgba(255,255,255,0.06)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                      />
                    )}

                    {field.maxLength && (
                      <div className="text-right mt-1">
                        <span className="text-xs font-inter" style={{ color: "rgba(255,255,255,0.15)" }}>
                          {(form[field.key] || "").length}/{field.maxLength}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Error */}
              {error && (
                <div
                  className="mt-5 px-4 py-3 rounded-xl text-sm font-inter"
                  style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
                >
                  {error}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className="text-sm font-inter font-medium transition-colors"
                  style={{
                    color: step === 0 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.45)",
                    cursor: step === 0 ? "default" : "pointer",
                  }}
                >
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceed() || submitting}
                  className="inline-flex items-center px-6 py-3 rounded-full text-sm font-inter font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: canProceed() ? "#FF872A" : "rgba(255,255,255,0.06)",
                    color: canProceed() ? "white" : "rgba(255,255,255,0.15)",
                    cursor: canProceed() && !submitting ? "pointer" : "default",
                    boxShadow: canProceed() ? "0 8px 24px rgba(255,135,42,0.2)" : "none",
                  }}
                >
                  {submitting ? "Submitting..." : isLastStep ? "Submit Application" : "Continue"}
                  {!submitting && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Step dots */}
              <div className="flex items-center justify-center mt-8" style={{ gap: "6px" }}>
                {STEPS.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => { if (i < step) setStep(i); }}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === step ? 20 : 6,
                      height: 6,
                      backgroundColor:
                        i === step ? "#FF872A" : i < step ? "rgba(255,135,42,0.4)" : "rgba(255,255,255,0.08)",
                      cursor: i < step ? "pointer" : "default",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════════════ */
export default function VenturesPage() {
  const [showApplication, setShowApplication] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const openApp = useCallback(() => setShowApplication(true), []);
  const closeApp = useCallback(() => setShowApplication(false), []);

  return (
    <div>
      <HeaderWithLogoDark />
      <Head>
        <title>BEN Ventures — Funding the Next Generation of Web3 Builders</title>
        <meta
          name="description"
          content="BEN Ventures backs student founders building the future of Web3. Pre-seed capital, 10K+ student network, and mentorship from founders of Optimism, Augur, CoinList, and Bolt. Active since 2014."
        />
        <link rel="canonical" href="https://www.blockchainedu.org/ventures" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BEN Ventures — Funding the Next Generation of Web3 Builders" />
        <meta property="og:description" content="Pre-seed capital for student founders. Our alumni built Optimism, Augur, Bolt, CoinList, and Injective. Apply now." />
        <meta property="og:url" content="https://www.blockchainedu.org/ventures" />
        <meta property="og:image" content="https://www.blockchainedu.org/images/light-2-logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BEN Ventures — Student Founders, Real Capital" />
        <meta name="twitter:description" content="Our alumni built $20B+ in companies. Now we're writing checks for the next ones." />
      </Head>

      {/* Fullscreen application modal */}
      <ApplicationModal open={showApplication} onClose={closeApp} />

      <main>
        {/* ══════════════════════════════════════════════════════════════
            HERO
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

          <div className="relative max-w-4xl mx-auto px-6 sm:px-10 py-20 md:py-28 text-center" style={{ zIndex: 2 }}>
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
              BEN Ventures
            </span>

            <h1
              className="font-mont text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight"
              style={{ lineHeight: 1.08 }}
            >
              The best Web3 companies
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400">
                start with students.
              </span>
            </h1>

            <p
              className="mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-inter"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Our network produced the co-founders of Optimism, Augur, Bolt,
              CoinList, and Injective. Now we're writing checks for the next ones.
            </p>

            <div className="mt-10 flex flex-wrap justify-center" style={{ gap: "2rem 2.5rem" }}>
              {[
                { value: 20, prefix: "$", suffix: "B+", label: "Alumni company value" },
                { value: 10, suffix: "K+", label: "Student network" },
                { value: 200, suffix: "+", label: "University clubs" },
                { value: 11, label: "Years of deal flow", suffix: "" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mont">
                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-xs font-inter" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <button
                onClick={openApp}
                className="inline-flex items-center px-8 py-4 bg-benorange-500 text-white font-inter font-semibold text-sm rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ boxShadow: "0 8px 20px rgba(255, 135, 42, 0.2)" }}
              >
                Apply to BEN Ventures
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            ALUMNI SUCCESS STORIES
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24" style={{ backgroundColor: "#fafafa" }}>
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-14">
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
                Since 2014
              </div>
              <h2 className="font-mont font-black text-3xl md:text-4xl text-black mb-4">
                They were students too.
              </h2>
              <p className="text-bengrey-500 text-sm md:text-base max-w-2xl mx-auto font-inter leading-relaxed">
                BEN alumni have built some of the most important companies in crypto.
                Every one of them started as a student in the network.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "1.25rem" }}>
              {ALUMNI.map((person) => (
                <div
                  key={person.name}
                  className="bg-white rounded-2xl overflow-hidden transition-all duration-200"
                  style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  {/* Photo */}
                  <div className="relative" style={{ height: 200, overflow: "hidden" }}>
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                    {/* Gradient overlay at bottom */}
                    <div
                      className="absolute inset-x-0 bottom-0"
                      style={{
                        height: 60,
                        background: "linear-gradient(transparent, white)",
                      }}
                    />
                  </div>
                  {/* Info */}
                  <div className="px-4 pb-4" style={{ marginTop: "-8px", position: "relative" }}>
                    <span
                      className="inline-block text-xs font-inter font-semibold px-2 py-0.5 rounded-full mb-2"
                      style={{
                        backgroundColor: "rgba(255,135,42,0.08)",
                        color: "#FF872A",
                        fontSize: "10px",
                      }}
                    >
                      {person.highlight}
                    </span>
                    <h3 className="font-mont font-bold text-sm text-black">{person.name}</h3>
                    <p className="text-xs font-inter font-medium" style={{ color: "rgba(0,0,0,0.4)" }}>
                      {person.role}, {person.company}
                    </p>
                    <p className="mt-2 text-xs font-inter leading-relaxed" style={{ color: "rgba(0,0,0,0.45)" }}>
                      {person.story}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            PORTFOLIO — Recent Investments
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-16 md:py-24" style={{ backgroundColor: "#111113" }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.05,
              backgroundImage:
                "radial-gradient(ellipse at 60% 40%, #FF872A, transparent 50%)",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 sm:px-10" style={{ zIndex: 2 }}>
            <div className="text-center mb-14">
              <div
                className="inline-block font-bold uppercase px-3 rounded-full mb-4"
                style={{
                  backgroundColor: "rgba(255,135,42,0.1)",
                  color: "#FF872A",
                  letterSpacing: "0.15em",
                  fontSize: "10px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                Portfolio
              </div>
              <h2 className="font-mont font-black text-3xl md:text-4xl text-white mb-4">
                Recent investments.
              </h2>
              <p className="text-sm md:text-base max-w-xl mx-auto font-inter leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                We invest early in ambitious teams building infrastructure,
                protocols, and applications across Web3.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "1rem" }}>
              {PORTFOLIO.map((co) => (
                <div
                  key={co.name}
                  className="rounded-2xl p-5 transition-all duration-200"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-mont font-bold text-base text-white">{co.name}</h3>
                      <span
                        className="inline-block text-xs font-inter mt-1 px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "rgba(255,135,42,0.1)",
                          color: "rgba(255,135,42,0.8)",
                          fontSize: "10px",
                        }}
                      >
                        {co.tag}
                      </span>
                    </div>
                    {co.raised && (
                      <span className="text-xs font-inter font-semibold text-white" style={{ opacity: 0.5 }}>
                        {co.raised}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-inter leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {co.desc}
                  </p>
                  <p className="text-xs font-inter" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {co.investors}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            WHAT WE OFFER
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "#FFFBF2" }}>
          <div className="max-w-4xl mx-auto px-6 sm:px-10">
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
                What You Get
              </div>
              <h2 className="font-mont font-black text-3xl md:text-4xl text-black mb-4">
                More than a check.
              </h2>
              <p className="text-bengrey-500 text-sm md:text-base max-w-2xl mx-auto font-inter leading-relaxed">
                Capital gets you started. Access to the world's largest university
                blockchain network is what makes the difference.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.5rem" }}>
              {OFFERS.map((offer) => (
                <div
                  key={offer.title}
                  className="bg-white rounded-2xl p-6"
                  style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-benorange-500"
                    style={{ backgroundColor: "rgba(255, 135, 42, 0.08)" }}
                  >
                    {offer.icon}
                  </div>
                  <h3 className="font-mont font-bold text-base text-black mb-2">{offer.title}</h3>
                  <p className="text-sm font-inter leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                    {offer.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            WHAT WE LOOK FOR
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-10">
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
                What We Look For
              </div>
              <h2 className="font-mont font-black text-3xl md:text-4xl text-black mb-4">
                We invest in people, not decks.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2rem" }}>
              {[
                {
                  num: "01",
                  title: "Builders who ship",
                  desc: "A scrappy prototype beats a polished pitch deck. Show us you can build. Jinglan Wang built at MIT before building Optimism.",
                },
                {
                  num: "02",
                  title: "Clarity under pressure",
                  desc: "Can you explain your idea in one sentence? Do you know who your user is? Jeremy Gardner articulated Augur in a sentence at 19.",
                },
                {
                  num: "03",
                  title: "Contrarian conviction",
                  desc: "The best founders see something others miss. Eric Chen left NYU at 19 because he saw DeFi would need its own chain. Injective is now worth $1.3B.",
                },
              ].map((item) => (
                <div key={item.num} className="text-center md:text-left">
                  <div
                    className="font-mont font-black text-5xl mb-3"
                    style={{ color: "rgba(255, 135, 42, 0.15)" }}
                  >
                    {item.num}
                  </div>
                  <h3 className="font-mont font-bold text-lg text-black mb-2">{item.title}</h3>
                  <p className="text-sm font-inter leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "#fafafa" }}>
          <div className="max-w-2xl mx-auto px-6 sm:px-10">
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
                FAQ
              </div>
              <h2 className="font-mont font-black text-3xl md:text-4xl text-black">
                Common questions.
              </h2>
            </div>

            <div>
              {FAQ.map((item, i) => (
                <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left"
                  >
                    <span className="font-mont font-bold text-sm text-black pr-4">{item.q}</span>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="flex-shrink-0 transition-transform duration-200"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", color: "rgba(0,0,0,0.25)" }}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <p className="pb-5 text-sm font-inter leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: "#0a0a0b" }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.08,
              backgroundImage: "radial-gradient(ellipse at 50% 50%, #FF872A, transparent 50%)",
            }}
          />
          <div className="relative text-center px-6" style={{ zIndex: 2 }}>
            <h2 className="font-mont font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4" style={{ lineHeight: 1.1 }}>
              The next Optimism is being
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400">
                built by a student right now.
              </span>
            </h2>
            <p className="text-sm font-inter max-w-md mx-auto mb-10" style={{ color: "rgba(255,255,255,0.35)" }}>
              Applications are reviewed weekly. 7 steps, 10 minutes.
            </p>
            <button
              onClick={openApp}
              className="inline-flex items-center px-10 py-4 bg-benorange-500 text-white font-inter font-semibold text-sm rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ boxShadow: "0 0 40px rgba(255,135,42,0.25)" }}
            >
              Start Your Application
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
