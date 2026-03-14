import React, { useState, useEffect, useRef, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import { useAuth } from "../lib/auth";
import LoginModal from "../components/LoginModal";
import { JOB_TYPES, JOB_TAGS } from "../content/jobs";

// ─── Add-on upgrades (Remote OK-style a la carte) ──────
const BASE_PRICE = 299;

const ADDONS = [
  {
    id: "show_logo",
    label: "Show your company logo",
    price: 49,
    defaultOn: true,
    multiplier: "2x views",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    id: "highlight",
    label: "Highlight in orange",
    price: 49,
    defaultOn: true,
    multiplier: "2x views",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "sticky_day",
    label: "Pin to top for 24 hours",
    price: 99,
    defaultOn: false,
    multiplier: "2x views",
    exclusive: "sticky",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="17" x2="12" y2="22" />
        <path d="M5 17h14v-1.76a2 2 0 00-1.11-1.79l-1.78-.9A2 2 0 0115 10.76V6h1V2H8v4h1v4.76a2 2 0 01-1.11 1.79l-1.78.9A2 2 0 005 15.24V17z" />
      </svg>
    ),
  },
  {
    id: "sticky_week",
    label: "Pin to top for 7 days",
    price: 199,
    defaultOn: false,
    multiplier: "6x views",
    exclusive: "sticky",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="17" x2="12" y2="22" />
        <path d="M5 17h14v-1.76a2 2 0 00-1.11-1.79l-1.78-.9A2 2 0 0115 10.76V6h1V2H8v4h1v4.76a2 2 0 01-1.11 1.79l-1.78.9A2 2 0 005 15.24V17z" />
      </svg>
    ),
  },
  {
    id: "sticky_month",
    label: "Pin to top for 30 days",
    price: 597,
    defaultOn: false,
    multiplier: "9x views",
    exclusive: "sticky",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="17" x2="12" y2="22" />
        <path d="M5 17h14v-1.76a2 2 0 00-1.11-1.79l-1.78-.9A2 2 0 0115 10.76V6h1V2H8v4h1v4.76a2 2 0 01-1.11 1.79l-1.78.9A2 2 0 005 15.24V17z" />
      </svg>
    ),
  },
  {
    id: "email_blast",
    label: "Email blast to 13,900+ subscribers",
    price: 99,
    defaultOn: true,
    multiplier: "3x views",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

// Compute tier from addons for DB storage
function computeTier(activeAddons) {
  if (activeAddons.sticky_month || activeAddons.sticky_week) return "featured";
  if (activeAddons.sticky_day || activeAddons.highlight) return "boosted";
  return "standard";
}

export default function PostJobPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  // Add-on toggles
  const [activeAddons, setActiveAddons] = useState(() => {
    const defaults = {};
    ADDONS.forEach((a) => { defaults[a.id] = a.defaultOn; });
    return defaults;
  });

  const [form, setForm] = useState({
    title: "",
    company_name: "",
    company_url: "",
    location: "Remote",
    salary_min: "",
    salary_max: "",
    description: "",
    apply_url: "",
    tags: [],
    job_type: "full-time",
  });

  const totalPrice = useMemo(() => {
    let total = BASE_PRICE;
    ADDONS.forEach((a) => {
      if (activeAddons[a.id]) total += a.price;
    });
    return total;
  }, [activeAddons]);

  const toggleAddon = (addon) => {
    setActiveAddons((prev) => {
      const next = { ...prev };
      // Handle exclusive groups (sticky options are mutually exclusive)
      if (addon.exclusive && !prev[addon.id]) {
        ADDONS.forEach((a) => {
          if (a.exclusive === addon.exclusive && a.id !== addon.id) {
            next[a.id] = false;
          }
        });
      }
      next[addon.id] = !prev[addon.id];
      return next;
    });
  };

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : prev.tags.length < 5
        ? [...prev.tags, tag]
        : prev.tags,
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    if (!form.title || !form.company_name || !form.apply_url) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const { supabase } = await import("../lib/supabase");
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const tier = computeTier(activeAddons);

      // Step 1: Create pending job
      const jobRes = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          tier,
          salary_min: form.salary_min ? parseInt(form.salary_min) : null,
          salary_max: form.salary_max ? parseInt(form.salary_max) : null,
        }),
      });

      if (!jobRes.ok) {
        const err = await jobRes.json();
        throw new Error(err.error || "Failed to create job");
      }

      const job = await jobRes.json();

      // Step 2: Redirect to Stripe checkout with total price
      const checkoutRes = await fetch("/api/checkout/job-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          job_id: job.id,
          tier,
          addons: activeAddons,
          total_price: totalPrice,
        }),
      });

      if (!checkoutRes.ok) {
        throw new Error("Failed to start checkout");
      }

      const { url } = await checkoutRes.json();
      window.location.href = url;
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  const inputStyle = {
    fontSize: 14,
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    color: "#1d1d1f",
    width: "100%",
    outline: "none",
    fontFamily: "Inter, sans-serif",
  };

  const labelStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: "#86868b",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    marginBottom: 6,
    display: "block",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f8fa" }}>
      <Head>
        <title>Post a Job — Reach Crypto-Native Talent | BEN</title>
        <meta name="robots" content="index,follow" />
        <meta
          name="description"
          content="Post your job to thousands of crypto-native developers, designers, and operators. Starting at $299. Add upgrades to boost visibility. Go live in minutes."
        />
      </Head>

      <HeaderWithLogoDark />

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #000 0%, #0a0a0a 50%, #111 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.07,
            background: "radial-gradient(ellipse 60% 50% at 70% 40%, #FF872A, transparent)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.02,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16 sm:pb-20">
          <div
            className="inline-flex items-center gap-2 font-inter font-medium rounded-full mb-6"
            style={{
              fontSize: 12,
              padding: "7px 16px",
              color: "rgba(255,255,255,0.5)",
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#34c759" }} />
            24.5K followers + 13,900 email subscribers
          </div>

          <h1
            className="font-mont font-black"
            style={{
              fontSize: "clamp(36px, 6vw, 60px)",
              lineHeight: 1.05,
              color: "#fff",
              letterSpacing: "-0.04em",
              maxWidth: 700,
            }}
          >
            Hire{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF872A, #ffb347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              crypto-native
            </span>{" "}
            talent
          </h1>

          <p
            className="font-inter mt-4"
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 520,
              letterSpacing: "-0.01em",
            }}
          >
            Your listing goes live in minutes. Starting at ${BASE_PRICE}. Stack upgrades to boost visibility.
          </p>

          <div className="mt-10 flex items-center gap-3" style={{ color: "rgba(255,255,255,0.15)" }}>
            <div style={{ width: 1, height: 32, backgroundColor: "rgba(255,255,255,0.1)" }} />
            <span className="font-inter" style={{ fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Fill in your job details below
            </span>
          </div>
        </div>
      </div>

      {/* ── Main content: Form + Addons side by side on desktop ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* ── Left: Job Form ── */}
          <div className="flex-1 min-w-0">
            <div
              ref={formRef}
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#fff",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div className="px-6 sm:px-8 py-6" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                <h2 className="font-mont font-black" style={{ fontSize: 22, color: "#1d1d1f", letterSpacing: "-0.03em" }}>
                  Job details
                </h2>
              </div>

              <div className="px-6 sm:px-8 py-6 flex flex-col gap-5">
                {error && (
                  <div className="p-3 rounded-lg font-inter text-sm" style={{ backgroundColor: "rgba(255,59,48,0.08)", color: "#ff3b30" }}>
                    {error}
                  </div>
                )}

                <div>
                  <label style={labelStyle}>Job Title *</label>
                  <input type="text" placeholder="Senior Solidity Engineer" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Company *</label>
                    <input type="text" placeholder="Uniswap Labs" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Company URL</label>
                    <input type="url" placeholder="https://uniswap.org" value={form.company_url} onChange={(e) => setForm({ ...form, company_url: e.target.value })} style={inputStyle} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Job Type</label>
                    <select value={form.job_type} onChange={(e) => setForm({ ...form, job_type: e.target.value })} style={inputStyle}>
                      {JOB_TYPES.map((t) => (
                        <option key={t.id} value={t.id}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Location</label>
                    <input type="text" placeholder="Remote (Global)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={inputStyle} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Min Salary (USD/yr)</label>
                    <input type="number" placeholder="120000" value={form.salary_min} onChange={(e) => setForm({ ...form, salary_min: e.target.value })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Max Salary (USD/yr)</label>
                    <input type="number" placeholder="180000" value={form.salary_max} onChange={(e) => setForm({ ...form, salary_max: e.target.value })} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Apply URL *</label>
                  <input type="url" placeholder="https://jobs.lever.co/yourcompany/..." value={form.apply_url} onChange={(e) => setForm({ ...form, apply_url: e.target.value })} style={inputStyle} />
                  <p className="font-inter mt-1.5" style={{ fontSize: 11, color: "#c7c7cc" }}>
                    Where candidates apply. Your ATS, Greenhouse, Lever, etc.
                  </p>
                </div>

                <div>
                  <label style={labelStyle}>Job Description</label>
                  <textarea rows={5} placeholder="What does this role involve? What will the candidate work on?" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, resize: "vertical", minHeight: 120 }} />
                </div>

                <div>
                  <label style={labelStyle}>Tags (up to 5)</label>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {JOB_TAGS.map((tag) => {
                      const active = form.tags.includes(tag);
                      return (
                        <button key={tag} type="button" onClick={() => toggleTag(tag)} className="font-inter rounded-full transition-all" style={{ fontSize: 12, padding: "5px 13px", backgroundColor: active ? "#FF872A" : "rgba(0,0,0,0.04)", color: active ? "#fff" : "#86868b", border: "none", cursor: "pointer" }}>
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Upgrades + Checkout ── */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="lg:sticky" style={{ top: 80 }}>
              {/* Upgrade add-ons */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <h3 className="font-mont font-bold" style={{ fontSize: 16, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                    Design your listing
                  </h3>
                  <p className="font-inter mt-1" style={{ fontSize: 12, color: "#86868b" }}>
                    Base listing: ${BASE_PRICE}/mo. Add upgrades below.
                  </p>
                </div>

                <div className="px-4 py-3 flex flex-col gap-1">
                  {ADDONS.map((addon) => {
                    const isOn = activeAddons[addon.id];
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 cursor-pointer transition-all"
                        style={{
                          backgroundColor: isOn ? "rgba(255,135,42,0.04)" : "transparent",
                        }}
                        onMouseEnter={(e) => { if (!isOn) e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.02)"; }}
                        onMouseLeave={(e) => { if (!isOn) e.currentTarget.style.backgroundColor = "transparent"; }}
                      >
                        {/* Checkbox */}
                        <div
                          className="flex-shrink-0 flex items-center justify-center rounded-md transition-all"
                          style={{
                            width: 22,
                            height: 22,
                            backgroundColor: isOn ? "#FF872A" : "rgba(0,0,0,0.06)",
                            border: isOn ? "none" : "1px solid rgba(0,0,0,0.1)",
                          }}
                        >
                          {isOn && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>

                        {/* Label */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-inter font-medium" style={{ fontSize: 13, color: isOn ? "#1d1d1f" : "#424245" }}>
                              {addon.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-inter" style={{ fontSize: 12, color: "#86868b" }}>
                              +${addon.price}
                            </span>
                            <span
                              className="font-inter font-semibold rounded-full"
                              style={{
                                fontSize: 9,
                                padding: "2px 8px",
                                backgroundColor: "rgba(0,114,177,0.08)",
                                color: "#0072b1",
                                textTransform: "uppercase",
                                letterSpacing: "0.03em",
                              }}
                            >
                              {addon.multiplier}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Price summary */}
                <div className="px-6 py-5" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-inter" style={{ fontSize: 13, color: "#86868b" }}>Total</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-mont font-black" style={{ fontSize: 32, color: "#1d1d1f", letterSpacing: "-0.03em" }}>
                        ${totalPrice}
                      </span>
                      <span className="font-inter" style={{ fontSize: 14, color: "#86868b" }}>/mo</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full font-inter font-semibold rounded-xl mt-4 transition-colors"
                    style={{
                      fontSize: 15,
                      padding: "16px 20px",
                      backgroundColor: submitting ? "#ccc" : "#FF872A",
                      color: "#fff",
                      cursor: submitting ? "not-allowed" : "pointer",
                      border: "none",
                      boxShadow: submitting ? "none" : "0 8px 24px rgba(255,135,42,0.25)",
                    }}
                  >
                    {submitting
                      ? "Creating..."
                      : user
                      ? `Post job — $${totalPrice}/mo`
                      : `Sign in & post — $${totalPrice}/mo`}
                  </button>

                  <p className="font-inter text-center mt-3" style={{ fontSize: 11, color: "#c7c7cc" }}>
                    Goes live immediately after payment. Cancel anytime.
                  </p>
                </div>
              </div>

              {/* Compact trust signals */}
              <div className="mt-4 rounded-xl px-5 py-4" style={{ backgroundColor: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.04)" }}>
                <div className="flex flex-col gap-2">
                  {[
                    "Emailed to 13,900+ active subscribers",
                    "Auto-ingested from 50+ ATS boards daily",
                    "Paid listings rank above all free jobs",
                    "Listed 30 days, auto-renews monthly",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="font-inter" style={{ fontSize: 12, color: "#424245" }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Social Proof Section ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-12">

        {/* Big stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { num: "10,000+", label: "Students & alumni", sub: "across 200+ universities in 35+ countries" },
            { num: "13,900+", label: "Email subscribers", sub: "your listing hits their inbox" },
            { num: "24.5K", label: "Twitter followers", sub: "@BlockchainEdu since 2014" },
            { num: "50+", label: "Company boards scraped", sub: "Coinbase, Uniswap, Aave, and more" },
          ].map(({ num, label, sub }, i) => (
            <div key={i} className="rounded-2xl px-5 py-5" style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="font-mont font-black" style={{ fontSize: 28, color: "#FF872A", letterSpacing: "-0.03em" }}>{num}</div>
              <div className="font-inter font-semibold mt-1" style={{ fontSize: 13, color: "#1d1d1f" }}>{label}</div>
              <div className="font-inter mt-0.5" style={{ fontSize: 11, color: "#86868b" }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Companies we scrape from — like Remote OK's logo wall */}
        <div className="text-center mb-4">
          <p className="font-inter font-semibold" style={{ fontSize: 12, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Your listing appears alongside jobs from
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-12 px-4" style={{ opacity: 0.55 }}>
          {[
            "Coinbase", "Uniswap", "Aave", "Chainlink", "Solana Foundation",
            "Circle", "Ripple", "Ledger", "Polygon", "Kraken",
            "OpenSea", "Phantom", "Paradigm", "Alchemy", "dYdX",
            "Arbitrum", "Optimism", "StarkWare", "Aptos", "LayerZero",
          ].map((name, i) => (
            <span key={i} className="font-mont font-bold" style={{ fontSize: 14, color: "#1d1d1f", letterSpacing: "-0.01em" }}>
              {name}
            </span>
          ))}
        </div>

        {/* University logos */}
        <div className="text-center mb-4">
          <p className="font-inter font-semibold" style={{ fontSize: 12, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Trusted by students at 200+ universities including
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
          {[
            { name: "MIT", logo: "/images/universities/massachusetts-institute-of-technology.jpg" },
            { name: "Stanford", logo: "/images/universities/stanford-university.png" },
            { name: "Harvard", logo: "/images/universities/harvard-university.jpg" },
            { name: "Oxford", logo: "/images/universities/university-of-oxford.jpg" },
            { name: "Cornell", logo: "/images/universities/cornell-university.jpg" },
            { name: "UCLA", logo: "/images/universities/ucla.jpg" },
            { name: "Columbia", logo: "/images/universities/columbia-university.jpg" },
            { name: "NYU", logo: "/images/universities/new-york-university.jpg" },
          ].map(({ name, logo }, i) => (
            <div key={i} className="flex items-center justify-center" style={{ width: 80, height: 80 }}>
              <img
                src={logo}
                alt={name}
                style={{ maxWidth: 60, maxHeight: 60, objectFit: "contain", opacity: 0.6 }}
              />
            </div>
          ))}
        </div>

        {/* Testimonials — full width, with photos like Remote OK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {[
            {
              quote: "In my work to promote blockchain technology among my students, the relation with BEN has been an invaluable resource. BEN provides support for students in the form of conference travel, tickets, organizes hackathons, and so much more.",
              name: "Dr. Marko Suvajdzic",
              role: "Professor, University of Florida",
              photo: "/images/people/marko-suvajdzic.png",
            },
            {
              quote: "BEN is fulfilling such an important mission as people my age are going to be building and innovating the future. BEN is making this possible!",
              name: "Sohail Mohammed",
              role: "BEN Member, Boston",
              photo: null,
            },
            {
              quote: "Huge thanks to BEN for sponsoring us to attend this conference and their guidance as we build our blockchain ecosystem at Purdue University.",
              name: "Timothy Hein",
              role: "BEN Member, Purdue University",
              photo: null,
            },
            {
              quote: "I plan to bring back all the knowledge I learn to the Northeastern Blockchain Club. I hope to meet more builders to grow my team.",
              name: "Drew Cousin",
              role: "BEN Member, Northeastern University",
              photo: null,
            },
          ].map(({ quote, name, role, photo }, i) => (
            <div key={i} className="rounded-2xl px-6 py-6" style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
              <p className="font-inter" style={{ fontSize: 14, color: "#424245", lineHeight: 1.65 }}>
                &ldquo;{quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-4">
                {photo ? (
                  <img src={photo} alt={name} className="rounded-full" style={{ width: 40, height: 40, objectFit: "cover" }} />
                ) : (
                  <div className="rounded-full flex items-center justify-center font-mont font-bold" style={{ width: 40, height: 40, backgroundColor: "rgba(255,135,42,0.08)", color: "#FF872A", fontSize: 14 }}>
                    {name.split(" ").map((w) => w[0]).join("")}
                  </div>
                )}
                <div>
                  <div className="font-inter font-semibold" style={{ fontSize: 13, color: "#1d1d1f" }}>{name}</div>
                  <div className="font-inter" style={{ fontSize: 12, color: "#86868b" }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Founder message — like Pieter's personal section */}
        <div className="rounded-2xl px-6 sm:px-10 py-8 sm:py-10 mb-12" style={{ background: "linear-gradient(135deg, #1a1b20 0%, #202127 100%)" }}>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img
              src="/images/team/antonio-photo.jpg"
              alt="Antonio Gomes"
              className="rounded-full flex-shrink-0"
              style={{ width: 100, height: 100, objectFit: "cover", border: "3px solid rgba(255,255,255,0.1)" }}
            />
            <div>
              <p className="font-inter" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                I started BEN in 2014 out of a dorm room because I believed the next wave of builders in crypto would come from universities. A decade later, we have 10,000+ students and alumni at 200+ schools in 35+ countries, 13,900 email subscribers, and 24.5K followers on Twitter.
              </p>
              <p className="font-inter mt-4" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                When you post a job here, you reach people who are already deep in the ecosystem. Not passive scrollers on a general job board. These are students building DAOs, writing Solidity, shipping dApps. That is the talent pipeline you want.
              </p>
              <p className="font-inter mt-4" style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
                Need help? DM me on <a href="https://twitter.com/AntonioBENcrypt" target="_blank" rel="noopener noreferrer" style={{ color: "#FF872A", textDecoration: "none" }}>Twitter</a> and I will personally help you get your listing up.
              </p>
              <p className="font-inter font-semibold mt-4" style={{ fontSize: 14, color: "#fff" }}>
                — Antonio Gomes, Founder of BEN
              </p>
            </div>
          </div>
        </div>

        {/* Group photo */}
        <div className="rounded-2xl overflow-hidden mb-12">
          <img
            src="/images/ben-network/ben-group-pic-1.jpg"
            alt="BEN community at a conference"
            style={{ width: "100%", height: 300, objectFit: "cover" }}
          />
          <div className="px-5 py-3" style={{ backgroundColor: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)", borderLeft: "1px solid rgba(0,0,0,0.06)", borderRight: "1px solid rgba(0,0,0,0.06)", borderRadius: "0 0 16px 16px" }}>
            <p className="font-inter" style={{ fontSize: 12, color: "#86868b" }}>
              BEN members at a recent blockchain conference. This is the talent pool your listing reaches.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center px-4 py-8">
          <h3 className="font-mont font-black" style={{ fontSize: 28, color: "#1d1d1f", letterSpacing: "-0.03em" }}>
            Ready to hire?
          </h3>
          <p className="font-inter mt-2 mb-6" style={{ fontSize: 15, color: "#86868b", maxWidth: 420, margin: "8px auto 24px" }}>
            Starting at ${BASE_PRICE}/mo. Goes live immediately. Cancel anytime.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-inter font-semibold rounded-full"
            style={{
              fontSize: 15,
              padding: "14px 36px",
              backgroundColor: "#FF872A",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(255,135,42,0.3)",
            }}
          >
            Post a job now
          </button>
          <p className="font-inter mt-4" style={{ fontSize: 11, color: "#c7c7cc" }}>
            Secure payment with Stripe. Founded 2014.
          </p>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-16">
        <h3 className="font-mont font-bold mb-6" style={{ fontSize: 20, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
          Common questions
        </h3>
        {[
          {
            q: "How fast does my listing go live?",
            a: "Immediately after payment. No manual review, no waiting.",
          },
          {
            q: "What does pinning do?",
            a: "Pinned jobs stay at the top of every search result and the main feed, above all other listings. The longer the pin, the more visibility.",
          },
          {
            q: "Do you also have free listings from scraped ATS boards?",
            a: "Yes. We auto-ingest jobs from 50+ company career pages (Greenhouse, Lever, Ashby). Paid listings always appear above these in the feed.",
          },
          {
            q: "How do I take my listing down?",
            a: "Cancel your Stripe subscription. The listing is removed at the end of the billing period.",
          },
        ].map(({ q, a }, i) => (
          <div key={i} className="py-4" style={{ borderBottom: i < 3 ? "1px solid rgba(0,0,0,0.06)" : "none" }}>
            <p className="font-inter font-semibold" style={{ fontSize: 14, color: "#1d1d1f" }}>{q}</p>
            <p className="font-inter mt-1.5" style={{ fontSize: 13, color: "#86868b", lineHeight: 1.5 }}>{a}</p>
          </div>
        ))}
      </div>

      {/* ── Sticky mobile checkout bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 lg:hidden flex items-center justify-between px-5 py-3"
        style={{
          zIndex: 100,
          backgroundColor: "rgba(255,255,255,0.92)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div>
          <span className="font-mont font-black" style={{ fontSize: 22, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
            ${totalPrice}
          </span>
          <span className="font-inter" style={{ fontSize: 13, color: "#86868b" }}>/mo</span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="font-inter font-semibold rounded-xl"
          style={{
            fontSize: 14,
            padding: "12px 24px",
            backgroundColor: submitting ? "#ccc" : "#FF872A",
            color: "#fff",
            cursor: submitting ? "not-allowed" : "pointer",
            border: "none",
            boxShadow: "0 4px 16px rgba(255,135,42,0.3)",
          }}
        >
          {submitting ? "Creating..." : "Post job"}
        </button>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <Footer />
    </div>
  );
}
