import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import { useAuth } from "../lib/auth";
import LoginModal from "../components/LoginModal";
import {
  JOB_TYPES,
  JOB_TAGS,
  SEED_JOBS,
  formatSalary,
  JOB_POST_PRICE,
  JOB_POST_FEATURED_PRICE,
} from "../content/jobs";

// ─── Helpers ────────────────────────────────────────────
function timeAgo(dateStr) {
  const now = new Date();
  const d = new Date(dateStr);
  const diff = Math.floor((now - d) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  const days = Math.floor(diff / 86400);
  if (days === 1) return "1d ago";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function companyInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function isRemote(location) {
  return (location || "").toLowerCase().includes("remote");
}

// ─── Job Row ────────────────────────────────────────────
function JobRow({ job, onClick, isLocked }) {
  const salary = formatSalary(job.salary_min, job.salary_max, job.salary_currency);
  const isFeatured = job.tier === "featured";

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 sm:gap-6 py-5 sm:py-6 px-5 sm:px-8 transition-all cursor-pointer"
      style={{
        backgroundColor: isFeatured ? "rgba(255,135,42,0.03)" : "#fff",
        borderBottom: "1px solid rgba(0,0,0,0.04)",
        borderLeft: isFeatured ? "3px solid #FF872A" : "3px solid transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isFeatured
          ? "rgba(255,135,42,0.06)"
          : "rgba(0,0,0,0.015)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isFeatured
          ? "rgba(255,135,42,0.03)"
          : "#fff";
      }}
    >
      {/* Company logo/initials */}
      <div
        className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-mont font-bold"
        style={{
          fontSize: 15,
          backgroundColor: "rgba(255,135,42,0.07)",
          color: "#FF872A",
          border: "1px solid rgba(255,135,42,0.1)",
        }}
      >
        {job.company_logo ? (
          <img
            src={job.company_logo}
            alt={job.company_name}
            className="w-full h-full rounded-2xl object-contain"
          />
        ) : (
          companyInitials(job.company_name)
        )}
      </div>

      {/* Title + company + tags */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h3
            className="font-mont font-bold truncate"
            style={{ fontSize: 16, color: "#1d1d1f", letterSpacing: "-0.02em" }}
          >
            {job.title}
          </h3>
          {isFeatured && (
            <span
              className="flex-shrink-0 font-inter font-semibold rounded-full"
              style={{
                fontSize: 9,
                padding: "3px 10px",
                backgroundColor: "rgba(255,135,42,0.1)",
                color: "#FF872A",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Featured
            </span>
          )}
        </div>
        <div className="flex items-center gap-2.5 mt-1 flex-wrap">
          <span className="font-inter font-medium" style={{ fontSize: 14, color: "#424245" }}>
            {job.company_name}
          </span>
          <span style={{ color: "rgba(0,0,0,0.12)" }}>·</span>
          <span className="font-inter" style={{ fontSize: 13, color: "#86868b" }}>
            {isRemote(job.location) ? "Remote" : job.location}
          </span>
          {job.job_type && job.job_type !== "full-time" && (
            <>
              <span style={{ color: "rgba(0,0,0,0.12)" }}>·</span>
              <span className="font-inter" style={{ fontSize: 13, color: "#86868b", textTransform: "capitalize" }}>
                {job.job_type}
              </span>
            </>
          )}
        </div>
        {/* Tags - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2 mt-2.5">
          {(job.tags || []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-inter rounded-full"
              style={{
                fontSize: 11,
                padding: "3px 12px",
                backgroundColor: "rgba(0,0,0,0.04)",
                color: "#86868b",
                letterSpacing: "-0.01em",
              }}
            >
              {tag}
            </span>
          ))}
          {(job.tags || []).length > 3 && (
            <span className="font-inter" style={{ fontSize: 11, color: "#c7c7cc" }}>
              +{job.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Salary + time */}
      <div className="hidden sm:flex flex-col items-end gap-1.5 flex-shrink-0">
        {salary && !isLocked ? (
          <span className="font-inter font-semibold" style={{ fontSize: 15, color: "#1d1d1f", letterSpacing: "-0.01em" }}>
            {salary}
          </span>
        ) : salary && isLocked ? (
          <span className="font-inter font-medium" style={{ fontSize: 13, color: "#c7c7cc" }}>
            Salary hidden
          </span>
        ) : null}
        <span className="font-inter" style={{ fontSize: 12, color: "#c7c7cc" }}>
          {timeAgo(job.posted_at)}
        </span>
      </div>

      {/* Arrow */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
}

// ─── Job Detail Modal ───────────────────────────────────
function JobModal({ job, onClose, isLocked, onLogin, onUpgrade }) {
  const overlayRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 240);
  }, [onClose]);

  if (!job) return null;

  const salary = formatSalary(job.salary_min, job.salary_max, job.salary_currency);
  const isFeatured = job.tier === "featured";

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
      className="fixed inset-0 flex items-end sm:items-center justify-center"
      style={{
        zIndex: 9999,
        backgroundColor: visible ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0)",
        transition: "background-color 0.24s ease",
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="relative w-full sm:max-w-3xl"
        style={{
          backgroundColor: "#fff",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 24,
          boxShadow: "0 32px 100px rgba(0,0,0,0.18), 0 12px 32px rgba(0,0,0,0.1)",
          transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.36s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.24s ease",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Mobile handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div style={{ width: 36, height: 5, borderRadius: 3, backgroundColor: "rgba(0,0,0,0.12)" }} />
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute flex items-center justify-center rounded-full"
          style={{ top: 20, right: 20, width: 36, height: 36, backgroundColor: "rgba(0,0,0,0.05)", zIndex: 10 }}
          aria-label="Close"
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Orange accent bar */}
        <div style={{ height: 4, background: "linear-gradient(90deg, #FF872A, #ffb347)" }} />

        <div className="px-7 sm:px-12 pt-10 pb-10 sm:pb-12">
          {/* Header */}
          <div className="flex items-start gap-5">
            <div
              className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center font-mont font-bold"
              style={{
                fontSize: 20,
                backgroundColor: "rgba(255,135,42,0.07)",
                color: "#FF872A",
                border: "1px solid rgba(255,135,42,0.1)",
              }}
            >
              {job.company_logo ? (
                <img src={job.company_logo} alt={job.company_name} className="w-full h-full rounded-2xl object-contain" />
              ) : (
                companyInitials(job.company_name)
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-mont font-black" style={{ fontSize: 28, color: "#1d1d1f", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                {job.title}
              </h2>
              <div className="flex items-center gap-2.5 mt-2 flex-wrap">
                {job.company_url ? (
                  <a href={job.company_url} target="_blank" rel="noopener noreferrer"
                    className="font-inter font-semibold transition"
                    style={{ fontSize: 16, color: "#FF872A" }}
                  >
                    {job.company_name}
                  </a>
                ) : (
                  <span className="font-inter font-semibold" style={{ fontSize: 16, color: "#424245" }}>{job.company_name}</span>
                )}
                <span style={{ color: "rgba(0,0,0,0.12)" }}>·</span>
                <span className="font-inter" style={{ fontSize: 14, color: "#86868b" }}>
                  {timeAgo(job.posted_at)}
                </span>
                {isFeatured && (
                  <>
                    <span style={{ color: "rgba(0,0,0,0.12)" }}>·</span>
                    <span className="font-inter font-semibold" style={{ fontSize: 12, color: "#FF872A" }}>Featured</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-8 mt-8 py-6" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div>
              <div className="font-inter" style={{ fontSize: 11, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>Location</div>
              <div className="font-inter font-medium mt-1.5" style={{ fontSize: 15, color: "#1d1d1f" }}>
                {job.location}
              </div>
            </div>
            {salary && !isLocked && (
              <div>
                <div className="font-inter" style={{ fontSize: 11, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>Salary</div>
                <div className="font-inter font-semibold mt-1.5" style={{ fontSize: 15, color: "#1d1d1f" }}>{salary}</div>
              </div>
            )}
            {salary && isLocked && (
              <div>
                <div className="font-inter" style={{ fontSize: 11, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>Salary</div>
                <div className="font-inter mt-1.5" style={{ fontSize: 14, color: "#c7c7cc" }}>Members only</div>
              </div>
            )}
            <div>
              <div className="font-inter" style={{ fontSize: 11, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>Type</div>
              <div className="font-inter font-medium mt-1.5" style={{ fontSize: 15, color: "#1d1d1f", textTransform: "capitalize" }}>{job.job_type}</div>
            </div>
          </div>

          {/* Tags */}
          {job.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mt-7">
              {job.tags.map((tag) => (
                <span key={tag} className="font-inter rounded-full" style={{ fontSize: 13, padding: "5px 16px", backgroundColor: "rgba(0,0,0,0.04)", color: "#424245" }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description — gated for non-members */}
          {isLocked ? (
            <div className="mt-8">
              <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 160 }}>
                <p className="font-inter" style={{ fontSize: 16, lineHeight: 1.8, color: "#424245", filter: "blur(5px)", userSelect: "none" }}>
                  {job.description}
                </p>
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: "linear-gradient(transparent 0%, rgba(255,255,255,0.9) 40%, #fff 70%)" }}>
                  <div className="w-12 h-12 rounded-full bg-benorange-500 flex items-center justify-center mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <p className="font-mont font-bold text-benblack-500 mb-1.5" style={{ fontSize: 16 }}>Join BEN to see full details</p>
                  <p className="font-inter mb-4" style={{ fontSize: 13, color: "rgba(0,0,0,0.4)" }}>
                    Salary, description, and apply link
                  </p>
                  {onLogin && (
                    <button onClick={onLogin} className="px-6 py-3 bg-benorange-500 text-white font-inter font-semibold text-sm rounded-full" style={{ boxShadow: "0 8px 20px rgba(255,135,42,0.25)" }}>
                      Sign up free
                    </button>
                  )}
                  {onUpgrade && (
                    <button onClick={onUpgrade} className="px-6 py-3 bg-benorange-500 text-white font-inter font-semibold text-sm rounded-full" style={{ boxShadow: "0 8px 20px rgba(255,135,42,0.25)" }}>
                      Join BEN — $199
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="font-inter mt-8" style={{ fontSize: 16, lineHeight: 1.8, color: "#424245", letterSpacing: "-0.008em" }}>
                {job.description}
              </p>

              {/* Apply button */}
              <div className="flex gap-3 mt-10">
                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center font-inter font-semibold rounded-2xl transition-colors"
                  style={{ fontSize: 15, color: "#fff", backgroundColor: "#FF872A", padding: "16px 24px", letterSpacing: "-0.01em" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#e87520"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FF872A"; }}
                >
                  Apply Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ml-2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
                {job.company_url && (
                  <a
                    href={job.company_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center font-inter font-medium rounded-2xl transition-colors"
                    style={{ fontSize: 15, color: "#1d1d1f", backgroundColor: "rgba(0,0,0,0.05)", padding: "16px 24px" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.09)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
                  >
                    Company
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Post Job Modal ─────────────────────────────────────
function PostJobModal({ onClose, user }) {
  const overlayRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
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
    tier: "standard",
  });

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 240);
  }, [onClose]);

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

      // Step 1: Create pending job
      const jobRes = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          salary_min: form.salary_min ? parseInt(form.salary_min) : null,
          salary_max: form.salary_max ? parseInt(form.salary_max) : null,
        }),
      });

      if (!jobRes.ok) {
        const err = await jobRes.json();
        throw new Error(err.error || "Failed to create job");
      }

      const job = await jobRes.json();

      // Step 2: Redirect to Stripe checkout
      const checkoutRes = await fetch("/api/checkout/job-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          job_id: job.id,
          tier: form.tier,
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
    padding: "10px 14px",
    borderRadius: 10,
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
    marginBottom: 4,
    display: "block",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
      className="fixed inset-0 flex items-end sm:items-center justify-center"
      style={{
        zIndex: 9999,
        backgroundColor: visible ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0)",
        transition: "background-color 0.24s ease",
        WebkitBackdropFilter: "blur(8px)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="relative w-full sm:max-w-2xl"
        style={{
          backgroundColor: "#fff",
          maxHeight: "92vh",
          overflowY: "auto",
          borderRadius: 20,
          boxShadow: "0 25px 80px rgba(0,0,0,0.15)",
          transform: visible ? "translateY(0)" : "translateY(24px)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.32s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.24s ease",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Mobile handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div style={{ width: 36, height: 5, borderRadius: 3, backgroundColor: "rgba(0,0,0,0.12)" }} />
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute flex items-center justify-center rounded-full"
          style={{ top: 16, right: 16, width: 32, height: 32, backgroundColor: "rgba(0,0,0,0.05)", zIndex: 10 }}
          aria-label="Close"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="px-6 sm:px-10 pt-7 pb-8">
          <h2 className="font-mont font-black" style={{ fontSize: 24, color: "#1d1d1f", letterSpacing: "-0.03em" }}>
            Post a Job
          </h2>
          <p className="font-inter mt-1" style={{ fontSize: 13, color: "#86868b" }}>
            Reach thousands of crypto-native candidates. $299/mo standard, $499/mo featured.
          </p>

          {error && (
            <div className="mt-4 p-3 rounded-lg font-inter text-sm" style={{ backgroundColor: "rgba(255,59,48,0.08)", color: "#ff3b30" }}>
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-4">
            {/* Title */}
            <div>
              <label style={labelStyle}>Job Title *</label>
              <input type="text" placeholder="Senior Solidity Engineer" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} />
            </div>

            {/* Company + URL */}
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

            {/* Job type + Location */}
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

            {/* Salary */}
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

            {/* Apply URL */}
            <div>
              <label style={labelStyle}>Apply URL *</label>
              <input type="url" placeholder="https://jobs.lever.co/yourcompany/..." value={form.apply_url} onChange={(e) => setForm({ ...form, apply_url: e.target.value })} style={inputStyle} />
            </div>

            {/* Description */}
            <div>
              <label style={labelStyle}>Job Description</label>
              <textarea rows={4} placeholder="What does this role involve? What will the candidate work on?" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, resize: "vertical", minHeight: 100 }} />
            </div>

            {/* Tags */}
            <div>
              <label style={labelStyle}>Tags (up to 5)</label>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {JOB_TAGS.map((tag) => {
                  const active = form.tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className="font-inter rounded-full transition-all"
                      style={{
                        fontSize: 12,
                        padding: "4px 12px",
                        backgroundColor: active ? "#FF872A" : "rgba(0,0,0,0.04)",
                        color: active ? "#fff" : "#86868b",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured toggle */}
            <div
              className="rounded-xl p-4 cursor-pointer transition-all"
              style={{
                backgroundColor: form.tier === "featured" ? "rgba(255,135,42,0.06)" : "rgba(0,0,0,0.02)",
                border: form.tier === "featured" ? "1px solid rgba(255,135,42,0.2)" : "1px solid rgba(0,0,0,0.06)",
              }}
              onClick={() => setForm({ ...form, tier: form.tier === "featured" ? "standard" : "featured" })}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-inter font-semibold" style={{ fontSize: 14, color: "#1d1d1f" }}>
                    Featured Listing
                  </div>
                  <div className="font-inter" style={{ fontSize: 12, color: "#86868b", marginTop: 2 }}>
                    Highlighted with orange accent, pinned to top. $499/mo instead of $299/mo.
                  </div>
                </div>
                <div
                  className="flex-shrink-0 w-10 h-6 rounded-full transition-all"
                  style={{ backgroundColor: form.tier === "featured" ? "#FF872A" : "rgba(0,0,0,0.1)", padding: 2 }}
                >
                  <div
                    className="w-5 h-5 rounded-full bg-white transition-all"
                    style={{
                      transform: form.tier === "featured" ? "translateX(16px)" : "translateX(0)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full font-inter font-semibold rounded-xl transition-colors"
              style={{
                fontSize: 15,
                padding: "14px 20px",
                backgroundColor: submitting ? "#ccc" : "#FF872A",
                color: "#fff",
                cursor: submitting ? "not-allowed" : "pointer",
                marginTop: 4,
                border: "none",
              }}
            >
              {submitting
                ? "Creating..."
                : `Continue to Payment — ${form.tier === "featured" ? "$499" : "$299"}/mo`
              }
            </button>

            <p className="font-inter text-center" style={{ fontSize: 11, color: "#c7c7cc" }}>
              Your job goes live after payment. Cancel your subscription anytime to delist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const JOBS_PER_PAGE = 25;

// ─── Main Page ──────────────────────────────────────────
export default function JobsPage() {
  const { user, isPaid, loading } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState(SEED_JOBS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState(null);
  const [locationFilter, setLocationFilter] = useState(null); // "remote" or null
  const [selectedJob, setSelectedJob] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [page, setPage] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const listTopRef = useRef(null);
  const isPosted = router.query.posted === "true";

  // Fetch live jobs from Supabase
  useEffect(() => {
    fetch("/api/jobs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
        }
      })
      .catch(() => {});
  }, []);

  // Open post modal from URL param
  useEffect(() => {
    if (router.query.post === "true" && user) {
      setShowPostModal(true);
    }
  }, [router.query.post, user]);

  // Back-to-top button visibility
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLocked = !user || !isPaid;

  // Filtered jobs
  const filtered = useMemo(() => {
    let list = [...jobs];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company_name.toLowerCase().includes(q) ||
          (j.tags || []).some((t) => t.toLowerCase().includes(q)) ||
          (j.location || "").toLowerCase().includes(q)
      );
    }
    if (typeFilter) {
      list = list.filter((j) => j.job_type === typeFilter);
    }
    if (locationFilter === "remote") {
      list = list.filter((j) => isRemote(j.location));
    }
    return list;
  }, [jobs, search, typeFilter, locationFilter]);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [search, typeFilter, locationFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / JOBS_PER_PAGE));
  const paginatedJobs = filtered.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE);

  const goToPage = (p) => {
    const next = Math.max(1, Math.min(p, totalPages));
    setPage(next);
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const jobCount = jobs.length;

  const handlePostClick = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    setShowPostModal(true);
  };

  const handleUpgrade = async () => {
    const { supabase } = await import("../lib/supabase");
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/checkout/membership", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f8fa" }}>
      <Head>
        <title>Web3 Jobs — Crypto, DeFi, Blockchain Careers | BEN</title>
        <meta name="robots" content="index,follow" />
        <meta name="description" content="Find your next role in crypto. Engineering, design, marketing, and more at top Web3 companies. Updated daily." />
      </Head>

      <HeaderWithLogoDark />

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #000 0%, #0a0a0a 50%, #111 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.07, background: "radial-gradient(ellipse 60% 50% at 70% 40%, #FF872A, transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.02, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16 sm:pb-20">
          <div className="inline-flex items-center gap-2 font-inter font-medium rounded-full mb-6" style={{ fontSize: 12, padding: "7px 16px", color: "rgba(255,255,255,0.5)", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", letterSpacing: "0.02em" }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#34c759" }} />
            {jobCount} open positions
          </div>

          <h1 className="font-mont font-black" style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.05, color: "#fff", letterSpacing: "-0.04em", maxWidth: 700 }}>
            Web3{" "}
            <span style={{ background: "linear-gradient(135deg, #FF872A, #ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Jobs</span>
          </h1>

          <p className="font-inter mt-4" style={{ fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.55, color: "rgba(255,255,255,0.45)", maxWidth: 480, letterSpacing: "-0.01em" }}>
            Engineering, design, marketing, and more at top crypto companies. Updated daily.
          </p>

          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <button
              onClick={handlePostClick}
              className="inline-flex items-center font-inter font-semibold rounded-full transition-colors"
              style={{ fontSize: 14, padding: "12px 28px", backgroundColor: "#FF872A", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 8px 24px rgba(255,135,42,0.3)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#e87520"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FF872A"; }}
            >
              Post a Job — $299/mo
            </button>
            <span className="font-inter" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
              Featured spots available
            </span>
          </div>

          <div className="mt-10 flex items-center gap-3" style={{ color: "rgba(255,255,255,0.15)" }}>
            <div style={{ width: 1, height: 32, backgroundColor: "rgba(255,255,255,0.1)" }} />
            <span className="font-inter" style={{ fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}>Scroll to browse</span>
          </div>
        </div>
      </div>

      {/* ── Posted success ── */}
      {isPosted && (
        <div className="max-w-5xl mx-auto px-5 sm:px-8 mt-6">
          <div className="rounded-xl p-4 font-inter text-sm" style={{ backgroundColor: "rgba(52,199,89,0.08)", color: "#34c759", border: "1px solid rgba(52,199,89,0.15)" }}>
            Your job has been posted and is now live. It will appear in the listings below.
          </div>
        </div>
      )}

      {/* ── Sticky search + filter bar ── */}
      <div className="sticky top-0" style={{ zIndex: 100, backgroundColor: "rgba(248,248,250,0.85)", WebkitBackdropFilter: "blur(20px) saturate(180%)", backdropFilter: "blur(20px) saturate(180%)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4">
          <div className="relative mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="2" strokeLinecap="round" className="absolute" style={{ left: 14, top: "50%", transform: "translateY(-50%)" }}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search jobs, companies, or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full font-inter"
              style={{ fontSize: 14, padding: "10px 14px 10px 40px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#fff", color: "#1d1d1f", outline: "none" }}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", marginTop: 2 }}>
            {/* Remote filter */}
            <button
              onClick={() => setLocationFilter(locationFilter ? null : "remote")}
              className="flex-shrink-0 font-inter font-medium rounded-full transition-all"
              style={{
                fontSize: 12, padding: "6px 14px",
                backgroundColor: locationFilter === "remote" ? "#1d1d1f" : "rgba(0,0,0,0.04)",
                color: locationFilter === "remote" ? "#fff" : "#86868b",
                border: "none", cursor: "pointer",
              }}
            >
              🌍 Remote
            </button>

            <div className="flex-shrink-0" style={{ width: 1, height: 20, backgroundColor: "rgba(0,0,0,0.08)" }} />

            {/* Job type filters */}
            {JOB_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTypeFilter(typeFilter === t.id ? null : t.id)}
                className="flex-shrink-0 font-inter font-medium rounded-full transition-all"
                style={{
                  fontSize: 12, padding: "6px 14px",
                  backgroundColor: typeFilter === t.id ? "#1d1d1f" : "rgba(0,0,0,0.04)",
                  color: typeFilter === t.id ? "#fff" : "#86868b",
                  border: "none", cursor: "pointer",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Job listings ── */}
      <div ref={listTopRef} className="max-w-5xl mx-auto px-0 sm:px-8 py-4 sm:py-8">
        <div className="sm:rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between px-5 sm:px-8 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <span className="font-inter font-medium" style={{ fontSize: 14, color: "#86868b" }}>
              {filtered.length} job{filtered.length !== 1 ? "s" : ""}
              {search && ` matching "${search}"`}
            </span>
            {totalPages > 1 && (
              <span className="font-inter" style={{ fontSize: 13, color: "#c7c7cc" }}>
                Page {page} of {totalPages}
              </span>
            )}
          </div>

          {paginatedJobs.map((job) => (
            <JobRow key={job.id} job={job} isLocked={isLocked} onClick={() => setSelectedJob(job)} />
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-inter" style={{ fontSize: 16, color: "#86868b" }}>No jobs match your search.</p>
              <button
                onClick={() => { setSearch(""); setTypeFilter(null); setLocationFilter(null); }}
                className="font-inter font-medium mt-4"
                style={{ fontSize: 14, color: "#FF872A", border: "none", background: "none", cursor: "pointer" }}
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 px-5 sm:px-8 py-5" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              {/* Previous */}
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className="flex items-center justify-center rounded-xl font-inter font-medium transition-colors"
                style={{
                  width: 40, height: 40, fontSize: 14,
                  backgroundColor: page === 1 ? "transparent" : "rgba(0,0,0,0.04)",
                  color: page === 1 ? "#d1d1d6" : "#1d1d1f",
                  border: "none", cursor: page === 1 ? "default" : "pointer",
                }}
                onMouseEnter={(e) => { if (page > 1) e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { if (page > 1) e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  if (totalPages <= 7) return true;
                  if (p === 1 || p === totalPages) return true;
                  if (Math.abs(p - page) <= 1) return true;
                  return false;
                })
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) {
                    acc.push("...");
                  }
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === "..." ? (
                    <span key={`dots-${idx}`} className="font-inter" style={{ fontSize: 14, color: "#c7c7cc", padding: "0 4px" }}>...</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className="flex items-center justify-center rounded-xl font-inter font-medium transition-colors"
                      style={{
                        width: 40, height: 40, fontSize: 14,
                        backgroundColor: p === page ? "#1d1d1f" : "transparent",
                        color: p === page ? "#fff" : "#86868b",
                        border: "none", cursor: "pointer",
                      }}
                      onMouseEnter={(e) => { if (p !== page) e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)"; }}
                      onMouseLeave={(e) => { if (p !== page) e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      {p}
                    </button>
                  )
                )}

              {/* Next */}
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className="flex items-center justify-center rounded-xl font-inter font-medium transition-colors"
                style={{
                  width: 40, height: 40, fontSize: 14,
                  backgroundColor: page === totalPages ? "transparent" : "rgba(0,0,0,0.04)",
                  color: page === totalPages ? "#d1d1d6" : "#1d1d1f",
                  border: "none", cursor: page === totalPages ? "default" : "pointer",
                }}
                onMouseEnter={(e) => { if (page < totalPages) e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.08)"; }}
                onMouseLeave={(e) => { if (page < totalPages) e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Hiring CTA */}
        <div className="mx-4 sm:mx-0 mt-8 rounded-2xl p-8 sm:p-10 text-center" style={{ background: "linear-gradient(135deg, #1a1b20 0%, #202127 100%)" }}>
          <h3 className="font-mont font-bold text-xl text-white mb-3">Hiring in crypto?</h3>
          <p className="font-inter mb-6" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 420, margin: "0 auto 24px" }}>
            Reach thousands of crypto-native candidates. BEN members are builders, developers, and operators across Web3.
          </p>
          <button
            onClick={handlePostClick}
            className="inline-flex items-center px-7 py-3.5 bg-benorange-500 text-white font-inter font-semibold text-sm rounded-full transition"
            style={{ boxShadow: "0 8px 24px rgba(255,135,42,0.3)", border: "none", cursor: "pointer" }}
          >
            Post a Job — $299/mo
          </button>
        </div>
      </div>

      {/* ── Back to top ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed flex items-center justify-center rounded-full transition-all"
        style={{
          bottom: 32, right: 32, width: 48, height: 48, zIndex: 90,
          backgroundColor: "#1d1d1f",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          opacity: showBackToTop ? 1 : 0,
          transform: showBackToTop ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
          pointerEvents: showBackToTop ? "auto" : "none",
          border: "none", cursor: "pointer",
        }}
        aria-label="Back to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      {/* ── Modals ── */}
      {selectedJob && (
        <JobModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          isLocked={isLocked}
          onLogin={!user ? () => { setSelectedJob(null); setShowLogin(true); } : null}
          onUpgrade={user && !isPaid ? () => { setSelectedJob(null); handleUpgrade(); } : null}
        />
      )}

      {showPostModal && user && (
        <PostJobModal onClose={() => setShowPostModal(false)} user={user} />
      )}

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />

      <Footer />

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
