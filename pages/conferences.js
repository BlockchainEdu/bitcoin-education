import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Head from "next/head";
import fs from "fs";
import path from "path";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import EmailGate from "../components/EmailGate";
import {
  CONFERENCES,
  CRYPTO_WEEKS,
  getEventStatus,
} from "../content/conferences";

// ─── Helpers ────────────────────────────────────────────
function daysUntil(dateStr) {
  const now = new Date();
  const target = new Date(dateStr + "T00:00:00");
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

function daysLabel(days) {
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days < 0) return "Ended";
  if (days <= 7) return `${days}d away`;
  if (days <= 30) return `${Math.ceil(days / 7)}w away`;
  return `${Math.round(days / 30)}mo away`;
}

function isLumaUrl(url) {
  if (!url) return false;
  return url.includes("lu.ma") || url.includes("luma.com");
}

function googleCalUrl(conf) {
  const start = (conf.startDate || "").replace(/-/g, "");
  const end = (conf.endDate || conf.startDate || "").replace(/-/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: conf.name,
    dates: `${start}/${end}`,
    location: `${conf.location || ""}${conf.venue ? " - " + conf.venue : ""}`,
    details: `${conf.description || ""}\n\n${conf.url || ""}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function icalUrl(conf) {
  const start = (conf.startDate || "").replace(/-/g, "");
  const end = (conf.endDate || conf.startDate || "").replace(/-/g, "");
  const ical = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${conf.name}`,
    `LOCATION:${conf.location || ""}`,
    `DESCRIPTION:${(conf.description || "").slice(0, 200)}`,
    `URL:${conf.url || ""}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ical)}`;
}

function extractCountry(location) {
  if (!location || location === "TBA") return null;
  const parts = location.split(",");
  const raw = parts[parts.length - 1].trim();
  return raw.replace(/[\u{1F1E0}-\u{1F1FF}]/gu, "").trim();
}

const REGION_MAP = {
  "Americas": ["USA", "US", "United States", "Canada", "Mexico", "Brazil", "Argentina", "Colombia", "Honduras", "Bermuda"],
  "Europe": ["France", "England", "UK", "Germany", "Netherlands", "Portugal", "Spain", "Italy", "Switzerland", "Czech Republic", "Czechia", "Austria", "Belgium", "Poland", "Finland", "Sweden", "Romania", "Monaco", "Montenegro"],
  "Asia": ["Singapore", "Japan", "South Korea", "Korea", "Hong Kong", "India", "China", "Taiwan", "Vietnam", "Indonesia", "Philippines", "Malaysia", "Thailand"],
  "Middle East & Africa": ["UAE", "Turkey", "Saudi Arabia", "Nigeria", "Kenya", "South Africa"],
};

function getRegion(country) {
  if (!country) return null;
  for (const [region, countries] of Object.entries(REGION_MAP)) {
    if (countries.includes(country)) return region;
  }
  return "Other";
}

function tierDisplay(tier) {
  const map = {
    flagship: { label: "Tier 1", color: "#FF872A" },
    major: { label: "Tier 2", color: "#6366f1" },
    conference: { label: "Tier 2", color: "#6366f1" },
    regional: { label: "Tier 3", color: "#10b981" },
    community: { label: "Community", color: "#06b6d4" },
    hackathon: { label: "Hackathon", color: "#8b5cf6" },
    "side-event": { label: "Side Event", color: "#f59e0b" },
  };
  return map[tier] || { label: "Event", color: "#86868b" };
}

// ─── Filter definitions ─────────────────────────────────
const PERSONAS = [
  {
    key: "all",
    label: "All Events",
    sub: "Everything in one view",
    color: "#1d1d1f",
    filter: () => true,
  },
  {
    key: "bizdev",
    label: "BD & Networking",
    sub: "Meet partners & close deals",
    color: "#FF872A",
    filter: (e) => {
      if (["flagship", "major"].includes(e.tier)) return true;
      const tags = (e.tags || []).map((t) => t.toLowerCase());
      return tags.some((t) => ["institutional", "networking", "tradfi"].includes(t));
    },
  },
  {
    key: "fundraising",
    label: "Fundraising",
    sub: "Find investors & pitch",
    color: "#10b981",
    filter: (e) => {
      if (e.tier === "flagship") return true;
      const tags = (e.tags || []).map((t) => t.toLowerCase());
      if (tags.some((t) => ["institutional", "tradfi"].includes(t))) return true;
      if ((e.sideEvents || []).some((se) => se.type === "pitch")) return true;
      return false;
    },
  },
  {
    key: "builders",
    label: "Builders & Devs",
    sub: "Hack, ship, learn",
    color: "#8b5cf6",
    filter: (e) => {
      if (e.tier === "hackathon") return true;
      const tags = (e.tags || []).map((t) => t.toLowerCase());
      return tags.some((t) => ["builders", "ethereum", "solana", "hack", "hackathon"].includes(t));
    },
  },
  {
    key: "jobs",
    label: "Job Seekers",
    sub: "Get hired in crypto",
    color: "#6366f1",
    filter: (e) => {
      if (e.tier === "hackathon") return true;
      if (["flagship", "major"].includes(e.tier)) return true;
      const tags = (e.tags || []).map((t) => t.toLowerCase());
      return tags.some((t) => ["hack", "hackathon"].includes(t));
    },
  },
  {
    key: "community",
    label: "Side Events",
    sub: "Meetups, parties, free events",
    color: "#f59e0b",
    filter: (e) => e.tier === "side-event" || e.tier === "community" || e.isSideEvent,
  },
];

const TIER_FILTERS = [
  { key: null, label: "All Tiers" },
  { key: "tier1", label: "Tier 1", tiers: ["flagship"], color: "#FF872A" },
  { key: "tier2", label: "Tier 2", tiers: ["major", "conference"], color: "#6366f1" },
  { key: "tier3", label: "Tier 3", tiers: ["regional", "community"], color: "#10b981" },
  { key: "hackathon", label: "Hackathon", tiers: ["hackathon"], color: "#8b5cf6" },
  { key: "side", label: "Side Event", tiers: ["side-event"], color: "#f59e0b" },
];

const REGION_FILTERS = [
  { key: null, label: "Worldwide" },
  { key: "Americas", label: "Americas" },
  { key: "Europe", label: "Europe" },
  { key: "Asia", label: "Asia" },
  { key: "Middle East & Africa", label: "ME & Africa" },
];

const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_MAP = { Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };

// ─── Month strip ────────────────────────────────────────
function MonthStrip({ activeMonth, onSelect, eventCounts }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto hide-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
      <button
        onClick={() => onSelect(null)}
        className="flex-shrink-0 font-inter font-semibold rounded-full"
        style={{
          fontSize: 13,
          padding: "7px 16px",
          backgroundColor: !activeMonth ? "#1d1d1f" : "rgba(0,0,0,0.04)",
          color: !activeMonth ? "#fff" : "#86868b",
        }}
      >
        All
      </button>
      {MONTHS.map((m) => {
        const count = eventCounts[MONTH_MAP[m]] || 0;
        const active = activeMonth === MONTH_MAP[m];
        return (
          <button
            key={m}
            onClick={() => onSelect(active ? null : MONTH_MAP[m])}
            className="flex-shrink-0 flex items-center gap-1.5 font-inter font-semibold rounded-full"
            style={{
              fontSize: 13,
              padding: "7px 14px",
              backgroundColor: active ? "#1d1d1f" : "rgba(0,0,0,0.04)",
              color: active ? "#fff" : count ? "#1d1d1f" : "#c7c7cc",
              opacity: count ? 1 : 0.4,
            }}
          >
            {m}
            {count > 0 && (
              <span style={{ fontSize: 11, fontWeight: 500, color: active ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.2)" }}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Calendar dropdown ──────────────────────────────────
function CalendarButton({ conf }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="flex items-center gap-2 font-inter font-semibold rounded-2xl"
        style={{
          fontSize: 15,
          padding: "14px 22px",
          backgroundColor: "rgba(0,0,0,0.05)",
          color: "#1d1d1f",
          border: "none",
          cursor: "pointer",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        Add to Calendar
      </button>
      {open && (
        <div
          className="absolute left-0 mt-2 rounded-xl overflow-hidden"
          style={{
            zIndex: 50,
            backgroundColor: "#fff",
            boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.06)",
            minWidth: 220,
          }}
        >
          <a
            href={googleCalUrl(conf)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-inter font-medium"
            style={{ fontSize: 15, padding: "14px 18px", color: "#1d1d1f", borderBottom: "1px solid rgba(0,0,0,0.05)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#4285F4"/><path d="M17 12.25a5 5 0 11-2.09-4.07L13.3 9.8A3 3 0 1015 12.25h2z" fill="#fff"/></svg>
            Google Calendar
          </a>
          <a
            href={icalUrl(conf)}
            download={`${conf.name.replace(/[^a-zA-Z0-9]/g, "-")}.ics`}
            className="flex items-center gap-3 font-inter font-medium"
            style={{ fontSize: 15, padding: "14px 18px", color: "#1d1d1f" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#1d1d1f"/><path d="M7 10h10M7 14h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Apple / Outlook (.ics)
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Event Card ─────────────────────────────────────────
function EventCard({ conf, onSelect }) {
  const status = getEventStatus(conf);
  const days = daysUntil(conf.startDate);
  const tier = tierDisplay(conf.tier);
  const hasSideEvents = conf.sideEvents?.length > 0;
  const isPast = status === "past";
  const hasLuma = isLumaUrl(conf.url) || isLumaUrl(conf.ticketUrl);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onSelect(conf)}
      className="rounded-3xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "#fff",
        border: "1px solid rgba(0,0,0,0.06)",
        cursor: "pointer",
        opacity: isPast ? 0.5 : 1,
      }}
      onMouseEnter={(e) => {
        if (!isPast) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 24px 64px rgba(0,0,0,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Cover image */}
      {conf.coverImage && !imgError ? (
        <div style={{ position: "relative", paddingTop: "45%", backgroundColor: "#f0f0f2", overflow: "hidden" }}>
          <img
            src={conf.coverImage}
            alt=""
            onError={() => setImgError(true)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            loading="lazy"
          />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, background: "linear-gradient(transparent, rgba(255,255,255,0.9))" }} />
        </div>
      ) : (
        <div style={{ height: 4, backgroundColor: tier.color }} />
      )}

      <div className="px-5 pb-5" style={{ paddingTop: conf.coverImage ? 0 : 20 }}>
        {/* Tier + countdown row */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span
              className="font-inter font-bold rounded-full"
              style={{
                fontSize: 11,
                padding: "3px 10px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: tier.color,
                backgroundColor: tier.color + "12",
              }}
            >
              {tier.label}
            </span>
            {hasLuma && (
              <span className="font-inter font-semibold rounded-full" style={{ fontSize: 10, padding: "3px 9px", backgroundColor: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
                LUMA
              </span>
            )}
          </div>
          {!isPast && days >= 0 && (
            <span
              className="font-inter font-semibold"
              style={{ fontSize: 12, color: days <= 7 ? "#FF872A" : "#86868b" }}
            >
              {daysLabel(days)}
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          className="font-mont font-black leading-tight"
          style={{ fontSize: 22, color: "#1d1d1f", letterSpacing: "-0.025em" }}
        >
          {conf.name}
        </h3>

        {/* Date + Location */}
        <div className="mt-2.5 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span className="font-inter font-medium" style={{ fontSize: 15, color: "#1d1d1f" }}>
              {conf.dates}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.8" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-inter" style={{ fontSize: 14, color: "#86868b" }}>
              {conf.flag} {conf.location}
            </span>
          </div>
        </div>

        {/* Description */}
        {conf.description && (
          <p
            className="font-inter mt-3"
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "#424245",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {conf.description}
          </p>
        )}

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-3">
            {hasSideEvents && (
              <span className="font-inter font-medium" style={{ fontSize: 12, color: "#FF872A" }}>
                {conf.sideEvents.length} side events
              </span>
            )}
            {conf.cryptoWeek && (
              <span className="font-inter hidden sm:inline" style={{ fontSize: 12, color: "#86868b" }}>
                {conf.cryptoWeek}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isPast && conf.ticketUrl && (
              <a
                href={conf.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-inter font-semibold rounded-xl"
                style={{
                  fontSize: 13,
                  padding: "7px 16px",
                  backgroundColor: hasLuma ? "#6366f1" : "#FF872A",
                  color: "#fff",
                }}
              >
                {hasLuma ? "RSVP" : "Tickets"}
              </a>
            )}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Detail Modal ───────────────────────────────────────
function EventModal({ conf, onClose }) {
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

  if (!conf) return null;

  const status = getEventStatus(conf);
  const days = daysUntil(conf.startDate);
  const tier = tierDisplay(conf.tier);
  const hasLuma = isLumaUrl(conf.url) || isLumaUrl(conf.ticketUrl);

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
        className="relative w-full sm:max-w-2xl"
        style={{
          backgroundColor: "#fff",
          maxHeight: "92vh",
          overflowY: "auto",
          borderRadius: 24,
          boxShadow: "0 32px 100px rgba(0,0,0,0.18), 0 12px 32px rgba(0,0,0,0.1)",
          transform: visible ? "translateY(0)" : "translateY(24px)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.32s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.24s ease",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Mobile handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: "rgba(0,0,0,0.12)" }} />
        </div>

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute flex items-center justify-center rounded-full"
          style={{ top: 16, right: 16, width: 40, height: 40, backgroundColor: conf.coverImage ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)", zIndex: 10 }}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={conf.coverImage ? "#fff" : "rgba(0,0,0,0.4)"} strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Cover */}
        {conf.coverImage ? (
          <div style={{ position: "relative", paddingTop: "40%", minHeight: 180, backgroundColor: "#f0f0f2", overflow: "hidden" }}>
            <img
              src={conf.coverImage}
              alt=""
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(transparent, #fff)" }} />
          </div>
        ) : (
          <div style={{ height: 4, backgroundColor: tier.color }} />
        )}

        <div className="px-7 sm:px-10 pt-6 pb-8 sm:pb-10">
          {/* Tier + countdown */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="font-inter font-bold rounded-full"
              style={{ fontSize: 12, padding: "5px 14px", textTransform: "uppercase", letterSpacing: "0.05em", color: tier.color, backgroundColor: tier.color + "12" }}
            >
              {tier.label}
            </span>
            {hasLuma && (
              <span className="font-inter font-semibold rounded-full" style={{ fontSize: 11, padding: "5px 12px", backgroundColor: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
                LUMA EVENT
              </span>
            )}
            {status === "upcoming" && days >= 0 && (
              <span className="font-inter font-semibold" style={{ fontSize: 14, color: days <= 14 ? "#FF872A" : "#86868b" }}>
                {daysLabel(days)}
              </span>
            )}
            {status === "happening" && (
              <span className="font-inter font-bold" style={{ fontSize: 14, color: "#34c759" }}>
                Happening now
              </span>
            )}
          </div>

          {/* Name */}
          <h2
            className="font-mont font-black leading-tight"
            style={{ fontSize: 32, color: "#1d1d1f", letterSpacing: "-0.03em" }}
          >
            {conf.name}
          </h2>

          {/* Date + Location */}
          <div className="mt-5 flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.8" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span className="font-inter font-medium" style={{ fontSize: 17, color: "#1d1d1f" }}>
                {conf.dates}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.8" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="font-inter" style={{ fontSize: 17, color: "#1d1d1f" }}>
                {conf.flag} {conf.location}
              </span>
            </div>
            {conf.venue && (
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M3 21h18M3 7v14M21 7v14M6 7V4h12v3M9 21v-4h6v4" />
                </svg>
                <span className="font-inter" style={{ fontSize: 16, color: "#86868b" }}>
                  {conf.venue}
                </span>
              </div>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-6 mt-6 py-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            {conf.priceRange && (
              <div>
                <div className="font-mont font-black" style={{ fontSize: 22, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                  {conf.priceRange}
                </div>
                <div className="font-inter" style={{ fontSize: 13, color: "#86868b", marginTop: 2 }}>Tickets</div>
              </div>
            )}
          </div>

          {/* Description + details -- gated */}
          <EmailGate
            fallback={
              <div className="mt-6 text-center py-6" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              </div>
            }
          >
            <p className="font-inter mt-6" style={{ fontSize: 16, lineHeight: 1.75, color: "#424245" }}>
              {conf.description}
            </p>

            {/* Speakers */}
            {conf.speakers?.length > 0 && (
              <div className="mt-7">
                <h4 className="font-mont font-bold" style={{ fontSize: 14, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Notable Speakers
                </h4>
                <div className="flex flex-wrap gap-2.5 mt-3">
                  {conf.speakers.map((s) => (
                    <span key={s} className="font-inter font-medium" style={{ fontSize: 15, color: "#1d1d1f", backgroundColor: "rgba(0,0,0,0.04)", borderRadius: 100, padding: "8px 18px" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Side events */}
            {conf.sideEvents?.length > 0 && (
              <div className="mt-7">
                <h4 className="font-mont font-bold" style={{ fontSize: 14, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Side Events
                </h4>
                <div className="mt-3 flex flex-col gap-3">
                  {conf.sideEvents.map((se, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl" style={{ padding: "10px 14px", backgroundColor: "rgba(0,0,0,0.02)" }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: tier.color, flexShrink: 0 }} />
                      <span className="font-inter font-medium" style={{ fontSize: 15, color: "#1d1d1f" }}>
                        {se.name}
                      </span>
                      <span className="font-inter ml-auto" style={{ fontSize: 13, color: "#c7c7cc", textTransform: "capitalize" }}>
                        {se.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags & Topics (community events) */}
            {conf.tags?.length > 0 && conf.source === "cryptonomads" && (
              <div className="flex flex-wrap gap-2 mt-6">
                {conf.tags.map((t) => (
                  <span key={t} className="font-inter" style={{ fontSize: 13, color: "#86868b", backgroundColor: "rgba(0,0,0,0.04)", borderRadius: 100, padding: "5px 14px" }}>
                    {t}
                  </span>
                ))}
                {(conf.topics || []).map((t) => (
                  <span key={t} className="font-inter" style={{ fontSize: 13, color: "#06b6d4", backgroundColor: "rgba(6,182,212,0.06)", borderRadius: 100, padding: "5px 14px" }}>
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Crypto Week callout */}
            {conf.cryptoWeek && (
              <div className="mt-7 rounded-2xl p-5" style={{ backgroundColor: "rgba(255,135,42,0.04)", border: "1px solid rgba(255,135,42,0.1)" }}>
                <div className="flex items-center gap-2.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF872A" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span className="font-inter font-bold" style={{ fontSize: 15, color: "#FF872A" }}>
                    {conf.cryptoWeek}
                  </span>
                </div>
                <p className="font-inter mt-2" style={{ fontSize: 14, color: "#86868b", lineHeight: 1.6 }}>
                  This conference anchors a full week of satellite events, networking dinners, hackathons, and side parties across the city.
                </p>
              </div>
            )}
          </EmailGate>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            {conf.ticketUrl && status !== "past" && (
              <a
                href={conf.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 font-inter font-bold rounded-2xl"
                style={{
                  fontSize: 16,
                  color: "#fff",
                  backgroundColor: hasLuma ? "#6366f1" : "#FF872A",
                  padding: "16px 24px",
                  minHeight: 56,
                }}
              >
                {hasLuma && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                )}
                {hasLuma ? "RSVP on Luma" : "Get Tickets"}
              </a>
            )}
            <CalendarButton conf={conf} />
            {conf.url && (
              <a
                href={conf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center font-inter font-semibold rounded-2xl"
                style={{ fontSize: 15, color: "#1d1d1f", backgroundColor: "rgba(0,0,0,0.05)", padding: "14px 22px", minHeight: 56 }}
              >
                Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────
export default function ConferencesPage({ communityEvents = [] }) {
  const [persona, setPersona] = useState("all");
  const [tierFilter, setTierFilter] = useState(null);
  const [regionFilter, setRegionFilter] = useState(null);
  const [monthFilter, setMonthFilter] = useState(null);
  const [selectedConf, setSelectedConf] = useState(null);

  // Merge all events into one sorted list
  const allEvents = useMemo(() => {
    const merged = [...CONFERENCES, ...communityEvents];
    merged.sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""));
    return merged;
  }, [communityEvents]);

  // Apply persona filter
  const personaFiltered = useMemo(() => {
    const p = PERSONAS.find((p) => p.key === persona);
    if (!p || p.key === "all") return allEvents;
    return allEvents.filter(p.filter);
  }, [persona, allEvents]);

  // Count events per persona (for badge counts)
  const personaCounts = useMemo(() => {
    const counts = {};
    PERSONAS.forEach((p) => {
      counts[p.key] = p.key === "all" ? allEvents.length : allEvents.filter(p.filter).length;
    });
    return counts;
  }, [allEvents]);

  // Apply tier + region + month filters
  const filtered = useMemo(() => {
    let list = [...personaFiltered];

    if (tierFilter) {
      const tf = TIER_FILTERS.find((t) => t.key === tierFilter);
      if (tf) list = list.filter((e) => tf.tiers.includes(e.tier));
    }

    if (regionFilter) {
      list = list.filter((e) => getRegion(extractCountry(e.location)) === regionFilter);
    }

    if (monthFilter) {
      list = list.filter((c) => c.startDate.slice(5, 7) === monthFilter);
    }

    return list;
  }, [personaFiltered, tierFilter, regionFilter, monthFilter]);

  // Event counts by month (for month strip)
  const eventCounts = useMemo(() => {
    const counts = {};
    personaFiltered.forEach((c) => {
      const m = c.startDate.slice(5, 7);
      counts[m] = (counts[m] || 0) + 1;
    });
    return counts;
  }, [personaFiltered]);

  // Group by month for display
  const grouped = useMemo(() => {
    const groups = [];
    let currentMonth = "";
    filtered.forEach((c) => {
      const m = new Date(c.startDate + "T00:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" });
      if (m !== currentMonth) {
        currentMonth = m;
        groups.push({ month: m, events: [] });
      }
      groups[groups.length - 1].events.push(c);
    });
    return groups;
  }, [filtered]);

  const upcomingCount = allEvents.filter((c) => getEventStatus(c) !== "past").length;

  function clearAllFilters() {
    setPersona("all");
    setTierFilter(null);
    setRegionFilter(null);
    setMonthFilter(null);
  }

  const activeFilterCount = [
    persona !== "all" ? 1 : 0,
    tierFilter ? 1 : 0,
    regionFilter ? 1 : 0,
    monthFilter ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f5f7" }}>
      <Head>
        <title>Crypto Conferences & Side Events 2026 | BEN</title>
        <meta name="robots" content="index,follow" />
        <meta name="description" content="Every major crypto conference, hackathon, and side event in 2026. Filter by persona, tier, region. Luma RSVPs, calendar links, and curated picks." />
      </Head>

      <HeaderWithLogoDark />

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #000 0%, #0a0a0a 50%, #111 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.07, background: "radial-gradient(ellipse 60% 50% at 70% 40%, #FF872A, transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.02, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24">
          <div
            className="inline-flex items-center gap-2.5 font-inter font-semibold rounded-full mb-7"
            style={{ fontSize: 14, padding: "9px 20px", color: "rgba(255,255,255,0.5)", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span className="relative flex items-center justify-center" style={{ width: 8, height: 8 }}>
              <span style={{ position: "absolute", width: 8, height: 8, borderRadius: 4, backgroundColor: "#FF872A" }} />
              <span style={{ position: "absolute", width: 8, height: 8, borderRadius: 4, backgroundColor: "#FF872A", animation: "orangePulse 2s ease-in-out infinite" }} />
            </span>
            {upcomingCount} upcoming events
          </div>

          <h1 className="font-mont font-black" style={{ fontSize: "clamp(40px, 7vw, 72px)", lineHeight: 1.02, color: "#fff", letterSpacing: "-0.04em", maxWidth: 700 }}>
            Crypto{" "}
            <span style={{ background: "linear-gradient(135deg, #FF872A, #ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Conferences
            </span>
          </h1>

          <p className="font-inter mt-5" style={{ fontSize: "clamp(17px, 2.2vw, 21px)", lineHeight: 1.55, color: "rgba(255,255,255,0.4)", maxWidth: 520 }}>
            Every major event, hackathon, and side event in 2026. Filter by what matters to you.
          </p>
        </div>
      </div>

      {/* ── Sticky filter bar ── */}
      <div
        className="sticky top-0"
        style={{
          zIndex: 100,
          backgroundColor: "rgba(245,245,247,0.85)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-3">
          {/* Row 1: Persona pills */}
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-2" style={{ WebkitOverflowScrolling: "touch" }}>
            {PERSONAS.map((p) => {
              const active = persona === p.key;
              const count = personaCounts[p.key] || 0;
              return (
                <button
                  key={p.key}
                  onClick={() => { setPersona(p.key); setTierFilter(null); setRegionFilter(null); setMonthFilter(null); }}
                  className="flex-shrink-0 font-inter font-bold rounded-xl"
                  style={{
                    fontSize: 14,
                    padding: "10px 18px",
                    backgroundColor: active ? p.color : "rgba(0,0,0,0.04)",
                    color: active ? "#fff" : "#6e6e73",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {p.label}
                  <span
                    className="font-inter ml-1.5"
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: active ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.2)",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Row 2: Tier + Region pills */}
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2" style={{ WebkitOverflowScrolling: "touch" }}>
            {/* Tier pills */}
            <div className="flex gap-1 flex-shrink-0">
              {TIER_FILTERS.map((t) => {
                const active = tierFilter === t.key;
                return (
                  <button
                    key={t.key || "all-tiers"}
                    onClick={() => setTierFilter(active ? null : t.key)}
                    className="flex-shrink-0 font-inter font-semibold rounded-full"
                    style={{
                      fontSize: 12,
                      padding: "5px 12px",
                      backgroundColor: active ? (t.color || "#1d1d1f") : "transparent",
                      color: active ? "#fff" : "#86868b",
                      border: active ? "none" : "1px solid rgba(0,0,0,0.08)",
                      cursor: "pointer",
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="flex-shrink-0" style={{ width: 1, backgroundColor: "rgba(0,0,0,0.08)", margin: "4px 0" }} />

            {/* Region pills */}
            <div className="flex gap-1 flex-shrink-0">
              {REGION_FILTERS.map((r) => {
                const active = regionFilter === r.key;
                return (
                  <button
                    key={r.key || "all-regions"}
                    onClick={() => setRegionFilter(active ? null : r.key)}
                    className="flex-shrink-0 font-inter font-semibold rounded-full"
                    style={{
                      fontSize: 12,
                      padding: "5px 12px",
                      backgroundColor: active ? "#1d1d1f" : "transparent",
                      color: active ? "#fff" : "#86868b",
                      border: active ? "none" : "1px solid rgba(0,0,0,0.08)",
                      cursor: "pointer",
                    }}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Month strip */}
          <MonthStrip activeMonth={monthFilter} onSelect={setMonthFilter} eventCounts={eventCounts} />
        </div>
      </div>

      {/* ── Active persona context ── */}
      {persona !== "all" && (
        <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-6">
          <div className="flex items-center justify-between rounded-2xl px-5 py-4" style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div>
              <div className="font-inter font-bold" style={{ fontSize: 15, color: "#1d1d1f" }}>
                {PERSONAS.find((p) => p.key === persona)?.label}
              </div>
              <div className="font-inter" style={{ fontSize: 13, color: "#86868b", marginTop: 2 }}>
                {PERSONAS.find((p) => p.key === persona)?.sub} &middot; {filtered.length} events match
              </div>
            </div>
            <button
              onClick={clearAllFilters}
              className="font-inter font-semibold"
              style={{ fontSize: 13, color: "#FF872A", border: "none", background: "none", cursor: "pointer" }}
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* ── Event list ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        {grouped.map((group) => (
          <div key={group.month} className="mb-10">
            {/* Month header */}
            <div className="flex items-center gap-5 mb-5 px-1">
              <h2 className="font-mont font-black" style={{ fontSize: 20, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                {group.month}
              </h2>
              <div className="flex-1" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.08)" }} />
              <span className="font-inter font-semibold" style={{ fontSize: 13, color: "#86868b" }}>
                {group.events.length} event{group.events.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {group.events.map((conf) => (
                <EventCard key={conf.id} conf={conf} onSelect={setSelectedConf} />
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-inter" style={{ fontSize: 17, color: "#86868b" }}>No events match your filters.</p>
            <button
              onClick={clearAllFilters}
              className="font-inter font-semibold mt-4"
              style={{ fontSize: 16, color: "#FF872A", border: "none", background: "none", cursor: "pointer" }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* ── Crypto Weeks ── */}
      <div style={{ backgroundColor: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-14 sm:py-20">
          <h2 className="font-mont font-black" style={{ fontSize: 32, color: "#1d1d1f", letterSpacing: "-0.03em" }}>
            Crypto Weeks
          </h2>
          <p className="font-inter mt-3" style={{ fontSize: 17, color: "#86868b", maxWidth: 520, lineHeight: 1.6 }}>
            Conference seasons where entire cities become crypto hubs. Hundreds of side events, networking dinners, and parties.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {CRYPTO_WEEKS.map((cw) => (
              <div key={cw.name} className="rounded-2xl p-6" style={{ backgroundColor: "#f5f5f7", border: "1px solid rgba(0,0,0,0.05)" }}>
                <div className="font-mont font-bold" style={{ fontSize: 18, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                  {cw.name}
                </div>
                <div className="font-inter mt-2" style={{ fontSize: 15, color: "#86868b" }}>
                  {cw.when} / {cw.location}
                </div>
                <div className="font-inter mt-2.5" style={{ fontSize: 14, color: "#c7c7cc" }}>
                  Anchor: {cw.anchor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedConf && (
        <EventModal conf={selectedConf} onClose={() => setSelectedConf(null)} />
      )}

      <Footer />

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes orangePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0; transform: scale(2.5); }
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  let communityEvents = [];
  try {
    const filePath = path.join(process.cwd(), "content", "community-events.json");
    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    communityEvents = (raw.events || []).sort((a, b) =>
      a.startDate.localeCompare(b.startDate)
    );
  } catch (_) {}

  return {
    props: { communityEvents },
  };
}
