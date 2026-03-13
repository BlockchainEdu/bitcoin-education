#!/usr/bin/env node
/**
 * Merge cryptonomads events into conferences.js data.
 * Adds events that don't already exist in the curated list.
 * Generates content/all-events.json for the page to consume.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Load cryptonomads data
const cnData = JSON.parse(
  readFileSync(join(ROOT, "content", "cryptonomads-events.json"), "utf-8")
);

// Tag → tier mapping
function inferTier(tags) {
  if (tags.includes("Hack")) return "hackathon";
  if (tags.includes("Coliving") || tags.includes("Festival")) return "community";
  return "conference";
}

// Normalize cryptonomads events
const cnEvents = cnData.events
  .filter((e) => e.startDate && e.startDate >= "2026-03-13") // only future
  .map((e) => ({
    id: `cn-${e.id || e.slug}`,
    name: e.name,
    tier: inferTier(e.tags || []),
    dates: formatDates(e.startDate, e.endDate),
    startDate: e.startDate,
    endDate: e.endDate || e.startDate,
    location: [e.cities?.[0], e.countries?.[0]].filter(Boolean).join(", ") || "TBA",
    flag: "",
    venue: null,
    description: e.description || "",
    url: cleanLink(e.link),
    ticketUrl: cleanLink(e.link),
    coverImage: e.banner || null,
    logo: e.logo || null,
    attendees: null,
    priceRange: null,
    tags: e.tags || [],
    topics: e.topics || [],
    cryptoWeek: null,
    sideEvents: [],
    source: "cryptonomads",
  }));

function cleanLink(url) {
  if (!url) return null;
  // Remove wayback prefix if present
  return url.replace(/^https?:\/\/web\.archive\.org\/web\/\d+\//, "");
}

function formatDates(start, end) {
  if (!start) return "TBA";
  const s = new Date(start + "T00:00:00");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const sm = months[s.getMonth()];
  const sd = s.getDate();

  if (!end || end === start) return `${sm} ${sd}, ${s.getFullYear()}`;

  const e = new Date(end + "T00:00:00");
  const em = months[e.getMonth()];
  const ed = e.getDate();

  if (sm === em) return `${sm} ${sd}-${ed}, ${s.getFullYear()}`;
  return `${sm} ${sd} - ${em} ${ed}, ${s.getFullYear()}`;
}

// Write merged output
const output = {
  generatedAt: new Date().toISOString(),
  events: cnEvents,
  series: cnData.series || [],
};

writeFileSync(
  join(ROOT, "content", "community-events.json"),
  JSON.stringify(output, null, 2)
);

console.log(`Generated ${cnEvents.length} community events to content/community-events.json`);
console.log(`\nBy tier:`);
const tierCounts = {};
cnEvents.forEach((e) => { tierCounts[e.tier] = (tierCounts[e.tier] || 0) + 1; });
Object.entries(tierCounts).forEach(([t, c]) => console.log(`  ${t}: ${c}`));
