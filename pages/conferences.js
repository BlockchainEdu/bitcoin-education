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

// ─── Month nav ──────────────────────────────────────────
const MONTHS = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_MAP = { Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };

function MonthStrip({ activeMonth, onSelect, eventCounts }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
      <button
        onClick={() => onSelect(null)}
        className="flex-shrink-0 font-inter font-semibold rounded-full"
        style={{
          fontSize: 15,
          padding: "10px 22px",
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
            className="flex-shrink-0 flex items-center gap-2 font-inter font-semibold rounded-full"
            style={{
              fontSize: 15,
              padding: "10px 20px",
              backgroundColor: active ? "#1d1d1f" : "rgba(0,0,0,0.04)",
              color: active ? "#fff" : count ? "#1d1d1f" : "#c7c7cc",
              opacity: count ? 1 : 0.4,
            }}
          >
            {m}
            {count > 0 && (
              <span style={{ fontSize: 13, fontWeight: 500, color: active ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.2)" }}>
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
  const tier = TIER_CONFIG[conf.tier] || TIER_CONFIG.major;
  const hasSideEvents = conf.sideEvents?.length > 0;
  const isPast = status === "past";
  const hasLuma = isLumaUrl(conf.url) || isLumaUrl(conf.ticketUrl);

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
      {conf.coverImage ? (
        <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
          <img src={conf.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(transparent, #fff)" }} />
        </div>
      ) : (
        <div style={{ height: 4, backgroundColor: tier.color }} />
      )}

      <div className="px-6 pb-6" style={{ paddingTop: conf.coverImage ? 0 : 24 }}>
        {/* Tier + countdown row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className="font-inter font-bold rounded-full"
              style={{
                fontSize: 11,
                padding: "4px 12px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: tier.color,
                backgroundColor: tier.color + "10",
              }}
            >
              {tier.label}
            </span>
            {hasLuma && (
              <span className="font-inter font-semibold rounded-full" style={{ fontSize: 10, padding: "4px 10px", backgroundColor: "rgba(99,102,241,0.08)", color: "#6366f1", letterSpacing: "0.03em" }}>
                LUMA
              </span>
            )}
            {conf.cryptoWeek && (
              <span className="font-inter hidden sm:inline" style={{ fontSize: 12, color: "#86868b" }}>
                {conf.cryptoWeek}
              </span>
            )}
          </div>
          {!isPast && days >= 0 && (
            <span
              className="font-inter font-semibold"
              style={{ fontSize: 13, color: days <= 7 ? "#FF872A" : "#86868b" }}
            >
              {daysLabel(days)}
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          className="font-mont font-black leading-tight"
          style={{ fontSize: 24, color: "#1d1d1f", letterSpacing: "-0.025em" }}
        >
          {conf.name}
        </h3>

        {/* Date + Location */}
        <div className="mt-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span className="font-inter font-medium" style={{ fontSize: 16, color: "#1d1d1f" }}>
              {conf.dates}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.8" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="font-inter" style={{ fontSize: 15, color: "#86868b" }}>
              {conf.flag} {conf.location}
            </span>
          </div>
        </div>

        {/* Description */}
        {conf.description && (
          <p
            className="font-inter mt-4"
            style={{
              fontSize: 15,
              lineHeight: 1.65,
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
        <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <div className="flex items-center gap-4">
            {conf.attendees && (
              <span className="font-inter font-semibold" style={{ fontSize: 14, color: "#1d1d1f" }}>
                {conf.attendees}
              </span>
            )}
            {hasSideEvents && (
              <span className="font-inter font-medium" style={{ fontSize: 13, color: "#FF872A" }}>
                {conf.sideEvents.length} side events
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
                  fontSize: 14,
                  padding: "8px 18px",
                  backgroundColor: hasLuma ? "#6366f1" : "#FF872A",
                  color: "#fff",
                }}
              >
                {hasLuma ? "RSVP" : "Tickets"}
              </a>
            )}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c7c7cc" strokeWidth="2" strokeLinecap="round">
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
  const tier = TIER_CONFIG[conf.tier] || TIER_CONFIG.major;
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
          <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
            <img src={conf.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(transparent, #fff)" }} />
          </div>
        ) : (
          <div style={{ height: 4, backgroundColor: tier.color }} />
        )}

        <div className="px-7 sm:px-10 pt-6 pb-8 sm:pb-10">
          {/* Tier + countdown */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="font-inter font-bold rounded-full"
              style={{ fontSize: 12, padding: "5px 14px", textTransform: "uppercase", letterSpacing: "0.05em", color: tier.color, backgroundColor: tier.color + "10" }}
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
            {conf.attendees && (
              <div>
                <div className="font-mont font-black" style={{ fontSize: 22, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                  {conf.attendees}
                </div>
                <div className="font-inter" style={{ fontSize: 13, color: "#86868b", marginTop: 2 }}>Attendees</div>
              </div>
            )}
            {conf.priceRange && (
              <div>
                <div className="font-mont font-black" style={{ fontSize: 22, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                  {conf.priceRange}
                </div>
                <div className="font-inter" style={{ fontSize: 13, color: "#86868b", marginTop: 2 }}>Tickets</div>
              </div>
            )}
          </div>

          {/* Description */}
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
            <div className="flex flex-wrap gap-2.5 mt-6">
              {conf.tags.map((t) => (
                <span key={t} className="font-inter" style={{ fontSize: 14, color: "#86868b", backgroundColor: "rgba(0,0,0,0.04)", borderRadius: 100, padding: "6px 16px" }}>
                  {t}
                </span>
              ))}
              {(conf.topics || []).map((t) => (
                <span key={t} className="font-inter" style={{ fontSize: 14, color: "#06b6d4", backgroundColor: "rgba(6,182,212,0.06)", borderRadius: 100, padding: "6px 16px" }}>
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

// ─── Source tabs ─────────────────────────────────────────
const SOURCE_TABS = [
  { key: "curated", label: "Main Conferences" },
  { key: "community", label: "Side Events & Community" },
  { key: "all", label: "All Events" },
];

// ─── Page ───────────────────────────────────────────────
export default function ConferencesPage({ communityEvents = [] }) {
  const [monthFilter, setMonthFilter] = useState(null);
  const [tierFilter, setTierFilter] = useState(null);
  const [sourceTab, setSourceTab] = useState("curated");
  const [selectedConf, setSelectedConf] = useState(null);

  const allEvents = useMemo(() => {
    if (sourceTab === "curated") return [...CONFERENCES];
    if (sourceTab === "community") return communityEvents;
    const merged = [...CONFERENCES, ...communityEvents];
    merged.sort((a, b) => a.startDate.localeCompare(b.startDate));
    return merged;
  }, [sourceTab, communityEvents]);

  const eventCounts = useMemo(() => {
    const counts = {};
    allEvents.forEach((c) => {
      const m = c.startDate.slice(5, 7);
      counts[m] = (counts[m] || 0) + 1;
    });
    return counts;
  }, [allEvents]);

  const filtered = useMemo(() => {
    let list = [...allEvents];
    if (monthFilter) list = list.filter((c) => c.startDate.slice(5, 7) === monthFilter);
    if (tierFilter) list = list.filter((c) => c.tier === tierFilter);
    return list;
  }, [monthFilter, tierFilter, allEvents]);

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f5f7" }}>
      <Head>
        <title>Crypto Conferences & Side Events 2026 | BEN</title>
        <meta name="robots" content="index,follow" />
        <meta name="description" content="Every major crypto conference, hackathon, and side event in 2026. Luma RSVPs, calendar links, and curated picks for the BEN community." />
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
            <span style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#FF872A" }} />
            {upcomingCount} upcoming events
          </div>

          <h1 className="font-mont font-black" style={{ fontSize: "clamp(40px, 7vw, 72px)", lineHeight: 1.02, color: "#fff", letterSpacing: "-0.04em", maxWidth: 700 }}>
            Crypto{" "}
            <span style={{ background: "linear-gradient(135deg, #FF872A, #ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Conferences
            </span>
          </h1>

          <p className="font-inter mt-5" style={{ fontSize: "clamp(17px, 2.2vw, 21px)", lineHeight: 1.55, color: "rgba(255,255,255,0.4)", maxWidth: 520 }}>
            Every major event, hackathon, and side event worth attending in 2026. RSVP links, calendar sync, and curated picks.
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
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-4">
          {/* Source toggle */}
          <div className="flex gap-1 mb-3 overflow-x-auto hide-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
            {SOURCE_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setSourceTab(tab.key); setMonthFilter(null); setTierFilter(null); }}
                className="flex-shrink-0 font-inter font-bold rounded-xl"
                style={{
                  fontSize: 15,
                  padding: "10px 20px",
                  backgroundColor: sourceTab === tab.key ? "#1d1d1f" : "transparent",
                  color: sourceTab === tab.key ? "#fff" : "#86868b",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {tab.label}
                <span className="font-inter ml-2" style={{ fontSize: 13, fontWeight: 500, color: sourceTab === tab.key ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.15)" }}>
                  {tab.key === "curated" ? CONFERENCES.length : tab.key === "community" ? communityEvents.length : CONFERENCES.length + communityEvents.length}
                </span>
              </button>
            ))}
          </div>

          <MonthStrip activeMonth={monthFilter} onSelect={setMonthFilter} eventCounts={eventCounts} />
        </div>
      </div>

      {/* ── Event list ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {grouped.map((group) => (
          <div key={group.month} className="mb-12">
            {/* Month header */}
            <div className="flex items-center gap-5 mb-6 px-2">
              <h2 className="font-mont font-black" style={{ fontSize: 20, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                {group.month}
              </h2>
              <div className="flex-1" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.08)" }} />
              <span className="font-inter font-semibold" style={{ fontSize: 14, color: "#86868b" }}>
                {group.events.length} event{group.events.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Cards - single column on mobile for bigger cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
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
              onClick={() => { setMonthFilter(null); setTierFilter(null); }}
              className="font-inter font-semibold mt-4"
              style={{ fontSize: 16, color: "#FF872A", border: "none", background: "none", cursor: "pointer" }}
            >
              Clear filters
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
