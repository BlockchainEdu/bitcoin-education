#!/usr/bin/env node
/**
 * Merge cryptonomads events into conferences.js data.
 * Adds events that don't already exist in the curated list.
 * Generates content/community-events.json for the page to consume.
 *
 * Uses series banner images as fallback cover images for events
 * that don't have their own banner.
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

// Build series banner lookup from event series associations
// Each event's series field contains objects with {title, banner, logo}
const seriesBanners = {};
(cnData.events || []).forEach((e) => {
  (e.series || []).forEach((s) => {
    if (s.title && s.banner && !seriesBanners[s.title]) {
      seriesBanners[s.title] = { banner: s.banner, logo: s.logo || null };
    }
  });
});
console.log(`Found ${Object.keys(seriesBanners).length} series with banner images`);

// Country → flag emoji mapping
const FLAGS = {
  "USA": "🇺🇸", "United States": "🇺🇸", "US": "🇺🇸",
  "France": "🇫🇷", "UAE": "🇦🇪", "Singapore": "🇸🇬",
  "India": "🇮🇳", "South Korea": "🇰🇷", "Korea": "🇰🇷",
  "Portugal": "🇵🇹", "Netherlands": "🇳🇱", "England": "🇬🇧", "UK": "🇬🇧",
  "Hong Kong": "🇭🇰", "Japan": "🇯🇵", "Germany": "🇩🇪", "Spain": "🇪🇸",
  "Italy": "🇮🇹", "Switzerland": "🇨🇭", "Thailand": "🇹🇭", "Brazil": "🇧🇷",
  "Mexico": "🇲🇽", "Argentina": "🇦🇷", "Colombia": "🇨🇴", "Turkey": "🇹🇷",
  "Poland": "🇵🇱", "Honduras": "🇭🇳", "Czech Republic": "🇨🇿", "Czechia": "🇨🇿",
  "Austria": "🇦🇹", "Belgium": "🇧🇪", "Canada": "🇨🇦", "Australia": "🇦🇺",
  "China": "🇨🇳", "Taiwan": "🇹🇼", "Vietnam": "🇻🇳", "Indonesia": "🇮🇩",
  "Philippines": "🇵🇭", "Malaysia": "🇲🇾", "Nigeria": "🇳🇬", "Kenya": "🇰🇪",
};

// Tag → tier mapping
function inferTier(tags, isSideEvent) {
  if (isSideEvent) return "side-event";
  if (tags.includes("Hack")) return "hackathon";
  if (tags.includes("Coliving") || tags.includes("Festival")) return "community";
  return "conference";
}

// Get the best image for an event: own banner → series banner → null
function getBestImage(e) {
  if (e.banner) return e.banner;
  // Try series banner
  for (const s of (e.series || [])) {
    if (s.banner) return s.banner;
    if (s.title && seriesBanners[s.title]) return seriesBanners[s.title].banner;
  }
  return null;
}

// Infer crypto week from series association
function inferCryptoWeek(e) {
  for (const s of (e.series || [])) {
    if (s.title && s.visible) return s.title;
  }
  return e.parentSeries || null;
}

// Use today's date as cutoff
const today = new Date().toISOString().split("T")[0];

// Normalize cryptonomads events
const cnEvents = cnData.events
  .filter((e) => e.startDate && e.startDate >= today)
  .map((e) => {
    const country = e.countries?.[0] || "";
    const flag = FLAGS[country] || "";
    return {
      id: `cn-${e.id || e.slug}`,
      name: e.name,
      tier: inferTier(e.tags || [], e.isSideEvent),
      dates: formatDates(e.startDate, e.endDate),
      startDate: e.startDate,
      endDate: e.endDate || e.startDate,
      location: [e.cities?.[0], e.countries?.[0]].filter(Boolean).join(", ") || "TBA",
      flag,
      venue: null,
      description: e.description || "",
      url: cleanLink(e.link),
      ticketUrl: cleanLink(e.link),
      coverImage: getBestImage(e),
      logo: e.logo || null,
      attendees: e.goingCount > 0 ? `${e.goingCount} going` : null,
      priceRange: e.paidEvent ? "Paid" : null,
      tags: e.tags || [],
      topics: e.topics || [],
      cryptoWeek: inferCryptoWeek(e),
      sideEvents: [],
      source: "cryptonomads",
      isSideEvent: e.isSideEvent || false,
      parentSeries: e.parentSeries || null,
    };
  });

function cleanLink(url) {
  if (!url) return null;
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

console.log(`\nGenerated ${cnEvents.length} community events to content/community-events.json`);

// Stats
const withImages = cnEvents.filter((e) => e.coverImage).length;
const withCryptoWeek = cnEvents.filter((e) => e.cryptoWeek).length;
const sideEventCount = cnEvents.filter((e) => e.isSideEvent).length;
console.log(`\nStats:`);
console.log(`  With cover images: ${withImages} / ${cnEvents.length}`);
console.log(`  With crypto week: ${withCryptoWeek} / ${cnEvents.length}`);
console.log(`  Side events: ${sideEventCount}`);
console.log(`  Main events: ${cnEvents.length - sideEventCount}`);

console.log(`\nBy tier:`);
const tierCounts = {};
cnEvents.forEach((e) => { tierCounts[e.tier] = (tierCounts[e.tier] || 0) + 1; });
Object.entries(tierCounts).forEach(([t, c]) => console.log(`  ${t}: ${c}`));
