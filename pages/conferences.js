import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Head from "next/head";
import fs from "fs";
import path from "path";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import {
  CONFERENCES,
  CRYPTO_WEEKS,
  getEventStatus,
  TIER_CONFIG,
} from "../content/conferences";

// ─── Helpers ────────────────────────────────────────────
function formatDateRange(conf) {
  return conf.dates;
}

function daysUntil(dateStr) {
  const now = new Date();
  const target = new Date(dateStr + "T00:00:00");
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff;
}

function daysLabel(days) {
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days < 0) return "Ended";
  if (days <= 7) return `${days}d away`;
  if (days <= 30) return `${Math.ceil(days / 7)}w away`;
  return `${Math.round(days / 30)}mo away`;
}

// ─── Month nav strip ────────────────────────────────────
const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_MAP = { Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };

function MonthStrip({ activeMonth, onSelect, eventCounts }) {
  const ref = useRef(null);

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        <button
          onClick={() => onSelect(null)}
          className="flex-shrink-0 font-inter font-medium rounded-full transition-all"
          style={{
            fontSize: 13,
            padding: "8px 18px",
            backgroundColor: !activeMonth ? "#1d1d1f" : "rgba(0,0,0,0.04)",
            color: !activeMonth ? "#fff" : "#86868b",
            letterSpacing: "-0.01em",
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
              className="flex-shrink-0 flex items-center gap-1.5 font-inter font-medium rounded-full transition-all"
              style={{
                fontSize: 13,
                padding: "8px 16px",
                backgroundColor: active ? "#1d1d1f" : "rgba(0,0,0,0.04)",
                color: active ? "#fff" : count ? "#1d1d1f" : "#c7c7cc",
                letterSpacing: "-0.01em",
                opacity: count ? 1 : 0.5,
              }}
            >
              {m}
              {count > 0 && (
                <span
                  className="font-inter"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: active ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.25)",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Event Card ─────────────────────────────────────────
function EventCard({ conf, onSelect }) {
  const status = getEventStatus(conf);
  const days = daysUntil(conf.startDate);
  const tier = TIER_CONFIG[conf.tier] || TIER_CONFIG.major;
  const hasSideEvents = conf.sideEvents?.length > 0;
  const isPast = status === "past";

  return (
    <div
      onClick={() => onSelect(conf)}
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "#fff",
        border: "1px solid rgba(0,0,0,0.06)",
        cursor: "pointer",
        opacity: isPast ? 0.55 : 1,
      }}
      onMouseEnter={(e) => {
        if (!isPast) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Cover image or color bar */}
      {conf.coverImage ? (
        <div style={{ height: 120, overflow: "hidden", position: "relative" }}>
          <img
            src={conf.coverImage}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, background: "linear-gradient(transparent, #fff)" }} />
        </div>
      ) : (
        <div style={{ height: 3, backgroundColor: tier.color }} />
      )}

      <div className="p-5 sm:p-6">
        {/* Top meta row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="font-inter font-semibold"
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: tier.color,
              }}
            >
              {tier.label}
            </span>
            {conf.source === "cryptonomads" && (
              <>
                <span style={{ color: "rgba(0,0,0,0.12)" }}>|</span>
                <span className="font-inter" style={{ fontSize: 9, color: "#c7c7cc", letterSpacing: "0.02em", textTransform: "uppercase" }}>
                  cryptonomads
                </span>
              </>
            )}
            {conf.cryptoWeek && (
              <>
                <span style={{ color: "rgba(0,0,0,0.12)" }}>|</span>
                <span
                  className="font-inter"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.02em",
                    color: "#86868b",
                  }}
                >
                  {conf.cryptoWeek}
                </span>
              </>
            )}
          </div>
          {!isPast && days >= 0 && (
            <span
              className="font-inter font-medium"
              style={{
                fontSize: 11,
                color: days <= 7 ? "#FF872A" : "#86868b",
                letterSpacing: "-0.01em",
              }}
            >
              {daysLabel(days)}
            </span>
          )}
          {isPast && (
            <span
              className="font-inter"
              style={{ fontSize: 11, color: "#c7c7cc" }}
            >
              Past
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          className="font-mont font-bold leading-tight"
          style={{
            fontSize: 22,
            color: "#1d1d1f",
            letterSpacing: "-0.025em",
          }}
        >
          {conf.name}
        </h3>

        {/* Date + Location */}
        <div className="mt-2.5 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span className="font-inter" style={{ fontSize: 14, color: "#1d1d1f", letterSpacing: "-0.01em" }}>
              {formatDateRange(conf)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.8" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-inter" style={{ fontSize: 14, color: "#86868b", letterSpacing: "-0.01em" }}>
              {conf.flag} {conf.location}
              {conf.venue && (
                <span style={{ color: "#c7c7cc" }}> / {conf.venue}</span>
              )}
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className="font-inter mt-4"
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: "#424245",
            letterSpacing: "-0.008em",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {conf.description}
        </p>

        {/* Bottom row: attendees + tags */}
        <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-3">
            {conf.attendees && (
              <span className="font-inter font-medium" style={{ fontSize: 12, color: "#1d1d1f", letterSpacing: "-0.01em" }}>
                {conf.attendees}
              </span>
            )}
            {hasSideEvents && (
              <span className="font-inter" style={{ fontSize: 11, color: "#FF872A" }}>
                {conf.sideEvents.length} side event{conf.sideEvents.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
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
  const tier = TIER_CONFIG[conf.tier] || TIER_CONFIG.major;

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
        className="relative w-full sm:max-w-lg"
        style={{
          backgroundColor: "#fff",
          maxHeight: "92vh",
          overflowY: "auto",
          borderRadius: 20,
          boxShadow: "0 25px 80px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.08)",
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

        {/* Cover image or color accent bar */}
        {conf.coverImage ? (
          <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
            <img src={conf.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(transparent, #fff)" }} />
          </div>
        ) : (
          <div style={{ height: 4, backgroundColor: tier.color }} />
        )}

        <div className="px-8 sm:px-10 pt-7 pb-8 sm:pb-10">
          {/* Tier + countdown */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="font-inter font-semibold"
              style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: tier.color }}
            >
              {tier.label}
            </span>
            {status === "upcoming" && days >= 0 && (
              <>
                <span style={{ color: "rgba(0,0,0,0.1)" }}>|</span>
                <span className="font-inter font-medium" style={{ fontSize: 12, color: days <= 14 ? "#FF872A" : "#86868b" }}>
                  {daysLabel(days)}
                </span>
              </>
            )}
            {status === "happening" && (
              <>
                <span style={{ color: "rgba(0,0,0,0.1)" }}>|</span>
                <span className="font-inter font-semibold" style={{ fontSize: 12, color: "#34c759" }}>
                  Happening now
                </span>
              </>
            )}
          </div>

          {/* Name */}
          <h2
            className="font-mont font-black leading-tight"
            style={{ fontSize: 28, color: "#1d1d1f", letterSpacing: "-0.03em" }}
          >
            {conf.name}
          </h2>

          {/* Date + Location */}
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.8" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span className="font-inter" style={{ fontSize: 15, color: "#1d1d1f", fontWeight: 500, letterSpacing: "-0.01em" }}>
                {formatDateRange(conf)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.8" strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="font-inter" style={{ fontSize: 15, color: "#1d1d1f", letterSpacing: "-0.01em" }}>
                {conf.flag} {conf.location}
              </span>
            </div>
            {conf.venue && (
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M3 21h18M3 7v14M21 7v14M6 7V4h12v3M9 21v-4h6v4" />
                </svg>
                <span className="font-inter" style={{ fontSize: 14, color: "#86868b", letterSpacing: "-0.01em" }}>
                  {conf.venue}
                </span>
              </div>
            )}
          </div>

          {/* Stats row */}
          <div
            className="flex items-center gap-5 mt-5 pt-5 pb-5"
            style={{ borderTop: "1px solid rgba(0,0,0,0.06)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
          >
            {conf.attendees && (
              <div>
                <div className="font-mont font-bold" style={{ fontSize: 18, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                  {conf.attendees}
                </div>
                <div className="font-inter" style={{ fontSize: 11, color: "#86868b", marginTop: 1 }}>
                  Attendees
                </div>
              </div>
            )}
            {conf.priceRange && (
              <div>
                <div className="font-mont font-bold" style={{ fontSize: 18, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                  {conf.priceRange}
                </div>
                <div className="font-inter" style={{ fontSize: 11, color: "#86868b", marginTop: 1 }}>
                  Tickets
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <p
            className="font-inter mt-5"
            style={{
              fontSize: 15,
              lineHeight: 1.73,
              color: "#1d1d1f",
              letterSpacing: "-0.01em",
            }}
          >
            {conf.description}
          </p>

          {/* Speakers */}
          {conf.speakers?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-mont font-bold" style={{ fontSize: 13, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Notable Speakers
              </h4>
              <div className="flex flex-wrap gap-2 mt-3">
                {conf.speakers.map((s) => (
                  <span
                    key={s}
                    className="font-inter font-medium"
                    style={{
                      fontSize: 13,
                      color: "#1d1d1f",
                      backgroundColor: "rgba(0,0,0,0.04)",
                      borderRadius: 100,
                      padding: "6px 14px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Side events */}
          {conf.sideEvents?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-mont font-bold" style={{ fontSize: 13, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Side Events
              </h4>
              <div className="mt-3 flex flex-col gap-2">
                {conf.sideEvents.map((se, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: tier.color, flexShrink: 0 }} />
                    <span className="font-inter" style={{ fontSize: 14, color: "#424245", letterSpacing: "-0.008em" }}>
                      {se.name}
                    </span>
                    <span className="font-inter" style={{ fontSize: 11, color: "#c7c7cc", textTransform: "capitalize" }}>
                      {se.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags & Topics (community events) */}
          {conf.tags?.length > 0 && conf.source === "cryptonomads" && (
            <div className="flex flex-wrap gap-2 mt-5">
              {conf.tags.map((t) => (
                <span
                  key={t}
                  className="font-inter"
                  style={{
                    fontSize: 12,
                    color: "#86868b",
                    backgroundColor: "rgba(0,0,0,0.04)",
                    borderRadius: 100,
                    padding: "4px 12px",
                  }}
                >
                  {t}
                </span>
              ))}
              {(conf.topics || []).map((t) => (
                <span
                  key={t}
                  className="font-inter"
                  style={{
                    fontSize: 12,
                    color: "#06b6d4",
                    backgroundColor: "rgba(6,182,212,0.06)",
                    borderRadius: 100,
                    padding: "4px 12px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Crypto Week callout */}
          {conf.cryptoWeek && (
            <div
              className="mt-6 rounded-xl p-4"
              style={{ backgroundColor: "rgba(255,135,42,0.05)", border: "1px solid rgba(255,135,42,0.12)" }}
            >
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF872A" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="font-inter font-semibold" style={{ fontSize: 13, color: "#FF872A", letterSpacing: "-0.01em" }}>
                  {conf.cryptoWeek}
                </span>
              </div>
              <p className="font-inter mt-2" style={{ fontSize: 13, color: "#86868b", lineHeight: 1.5 }}>
                This conference anchors a full week of satellite events, networking dinners, hackathons, and side parties across the city.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 mt-8">
            {conf.ticketUrl && status !== "past" && (
              <a
                href={conf.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center font-inter font-semibold rounded-xl transition-colors"
                style={{
                  fontSize: 14,
                  color: "#fff",
                  backgroundColor: "#FF872A",
                  padding: "14px 20px",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#e87520"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#FF872A"; }}
              >
                Get Tickets
              </a>
            )}
            {conf.url && (
              <a
                href={conf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center font-inter font-medium rounded-xl transition-colors"
                style={{
                  fontSize: 14,
                  color: "#1d1d1f",
                  backgroundColor: "rgba(0,0,0,0.05)",
                  padding: "14px 20px",
                  letterSpacing: "-0.01em",
                  flex: status === "past" ? 1 : "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.09)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
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

// ─── Source toggle tabs ─────────────────────────────────
const SOURCE_TABS = [
  { key: "curated", label: "Curated", desc: "Hand-picked flagship events" },
  { key: "community", label: "Community", desc: "166 events from cryptonomads" },
  { key: "all", label: "All Events", desc: "Everything in one view" },
];

// ─── Page ───────────────────────────────────────────────
export default function ConferencesPage({ communityEvents = [] }) {
  const [monthFilter, setMonthFilter] = useState(null);
  const [tierFilter, setTierFilter] = useState(null);
  const [sourceTab, setSourceTab] = useState("curated");
  const [selectedConf, setSelectedConf] = useState(null);

  // Combine based on source tab
  const allEvents = useMemo(() => {
    if (sourceTab === "curated") return [...CONFERENCES];
    if (sourceTab === "community") return communityEvents;
    // "all" — merge, sort by date, deduplicate by name similarity
    const merged = [...CONFERENCES, ...communityEvents];
    merged.sort((a, b) => a.startDate.localeCompare(b.startDate));
    return merged;
  }, [sourceTab, communityEvents]);

  // Event counts by month (based on current source)
  const eventCounts = useMemo(() => {
    const counts = {};
    allEvents.forEach((c) => {
      const m = c.startDate.slice(5, 7);
      counts[m] = (counts[m] || 0) + 1;
    });
    return counts;
  }, [allEvents]);

  // Filtered conferences
  const filtered = useMemo(() => {
    let list = [...allEvents];
    if (monthFilter) {
      list = list.filter((c) => c.startDate.slice(5, 7) === monthFilter);
    }
    if (tierFilter) {
      list = list.filter((c) => c.tier === tierFilter);
    }
    return list;
  }, [monthFilter, tierFilter, allEvents]);

  // Group by month for section headers
  const grouped = useMemo(() => {
    const groups = [];
    let currentMonth = "";
    filtered.forEach((c) => {
      const m = new Date(c.startDate + "T00:00:00").toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      if (m !== currentMonth) {
        currentMonth = m;
        groups.push({ month: m, events: [] });
      }
      groups[groups.length - 1].events.push(c);
    });
    return groups;
  }, [filtered]);

  const upcomingCount = allEvents.filter((c) => getEventStatus(c) !== "past").length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f8fa" }}>
      <Head>
        <title>Crypto Conferences 2026 | BEN</title>
        <meta name="robots" content="index,follow" />
        <meta
          name="description"
          content="Every major crypto conference, hackathon, and side event in 2026. From Consensus to Devcon, Token2049 to Solana Breakpoint."
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
        {/* Orange glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.07,
            background: "radial-gradient(ellipse 60% 50% at 70% 40%, #FF872A, transparent)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.02,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16 sm:pb-20">
          {/* Badge */}
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
            <span style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#FF872A" }} />
            {upcomingCount} upcoming events
          </div>

          <h1
            className="font-mont font-black"
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              lineHeight: 1.05,
              color: "#fff",
              letterSpacing: "-0.04em",
              maxWidth: 700,
            }}
          >
            Crypto{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF872A, #ffb347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Conferences
            </span>
          </h1>

          <p
            className="font-inter mt-4"
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 480,
              letterSpacing: "-0.01em",
            }}
          >
            Every major event, hackathon, and side event worth attending in 2026. Curated for the BEN community.
          </p>

          {/* Scroll indicator */}
          <div className="mt-10 flex items-center gap-3" style={{ color: "rgba(255,255,255,0.15)" }}>
            <div style={{ width: 1, height: 32, backgroundColor: "rgba(255,255,255,0.1)" }} />
            <span className="font-inter" style={{ fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Scroll to explore
            </span>
          </div>
        </div>
      </div>

      {/* ── Sticky filter bar ── */}
      <div
        className="sticky top-0"
        style={{
          zIndex: 100,
          backgroundColor: "rgba(248,248,250,0.85)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          backdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4">
          {/* Source toggle */}
          <div className="flex items-center gap-1 mb-3 overflow-x-auto hide-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
            {SOURCE_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setSourceTab(tab.key); setMonthFilter(null); setTierFilter(null); }}
                className="flex-shrink-0 font-inter font-semibold rounded-lg transition-all"
                style={{
                  fontSize: 13,
                  padding: "7px 16px",
                  backgroundColor: sourceTab === tab.key ? "#1d1d1f" : "transparent",
                  color: sourceTab === tab.key ? "#fff" : "#86868b",
                  letterSpacing: "-0.01em",
                }}
              >
                {tab.label}
                <span
                  className="font-inter ml-1.5"
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: sourceTab === tab.key ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.2)",
                  }}
                >
                  {tab.key === "curated" ? CONFERENCES.length : tab.key === "community" ? communityEvents.length : CONFERENCES.length + communityEvents.length}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Month strip */}
            <div className="flex-1 min-w-0">
              <MonthStrip
                activeMonth={monthFilter}
                onSelect={setMonthFilter}
                eventCounts={eventCounts}
              />
            </div>

            {/* Tier filter */}
            <div className="hidden sm:flex items-center gap-2">
              {Object.entries(TIER_CONFIG)
                .filter(([key]) => {
                  // Only show relevant tiers for current source
                  if (sourceTab === "curated") return !["community", "conference"].includes(key);
                  return true;
                })
                .map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setTierFilter(tierFilter === key ? null : key)}
                  className="font-inter font-medium rounded-full transition-all"
                  style={{
                    fontSize: 12,
                    padding: "6px 14px",
                    backgroundColor: tierFilter === key ? cfg.color : "transparent",
                    color: tierFilter === key ? "#fff" : "#86868b",
                    border: tierFilter === key ? "none" : "1px solid rgba(0,0,0,0.08)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Conference list ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        {grouped.map((group) => (
          <div key={group.month} className="mb-10">
            {/* Month header */}
            <div className="flex items-center gap-4 mb-5">
              <h2
                className="font-mont font-bold"
                style={{
                  fontSize: 14,
                  color: "#86868b",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {group.month}
              </h2>
              <div className="flex-1" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.06)" }} />
              <span className="font-inter" style={{ fontSize: 12, color: "#c7c7cc" }}>
                {group.events.length} event{group.events.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {group.events.map((conf) => (
                <EventCard key={conf.id} conf={conf} onSelect={setSelectedConf} />
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-inter" style={{ fontSize: 15, color: "#86868b" }}>
              No events match your filters.
            </p>
            <button
              onClick={() => { setMonthFilter(null); setTierFilter(null); }}
              className="font-inter font-medium mt-3"
              style={{ fontSize: 14, color: "#FF872A" }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* ── Crypto Weeks section ── */}
      <div style={{ backgroundColor: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <h2
            className="font-mont font-black"
            style={{ fontSize: 28, color: "#1d1d1f", letterSpacing: "-0.03em" }}
          >
            Crypto Weeks
          </h2>
          <p className="font-inter mt-2" style={{ fontSize: 15, color: "#86868b", letterSpacing: "-0.01em", maxWidth: 500 }}>
            Conference seasons where entire cities become crypto hubs. Hundreds of side events, networking dinners, and parties.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {CRYPTO_WEEKS.map((cw) => (
              <div
                key={cw.name}
                className="rounded-xl p-5"
                style={{
                  backgroundColor: "#f8f8fa",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <div className="font-mont font-bold" style={{ fontSize: 16, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                  {cw.name}
                </div>
                <div className="font-inter mt-1.5" style={{ fontSize: 13, color: "#86868b" }}>
                  {cw.when} / {cw.location}
                </div>
                <div className="font-inter mt-2" style={{ fontSize: 12, color: "#c7c7cc" }}>
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

      {/* Hide scrollbar utility */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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
