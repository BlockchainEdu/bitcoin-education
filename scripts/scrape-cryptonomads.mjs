#!/usr/bin/env node
/**
 * Scrape cryptonomads.org for crypto events & side events.
 * Uses Playwright to bypass Cloudflare, extracts __NEXT_DATA__ JSON.
 *
 * Usage: node scripts/scrape-cryptonomads.mjs
 * Output: content/cryptonomads-events.json
 */

import { chromium } from "playwright";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT = join(ROOT, "content", "cryptonomads-events.json");

async function scrape() {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  // Cloudflare + session cookies (set via env vars)
  const cfClearance = process.env.CF_CLEARANCE || "";
  const sessionToken = process.env.CN_SESSION || "";

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  });

  const cookies = [];
  if (cfClearance) {
    cookies.push({
      name: "cf_clearance",
      value: cfClearance,
      domain: ".cryptonomads.org",
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
  }
  if (sessionToken) {
    cookies.push({
      name: "__session",
      value: sessionToken,
      domain: ".cryptonomads.org",
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    });
    // Also try next-auth session token
    cookies.push({
      name: "next-auth.session-token",
      value: sessionToken,
      domain: ".cryptonomads.org",
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    });
    cookies.push({
      name: "__Secure-next-auth.session-token",
      value: sessionToken,
      domain: "cryptonomads.org",
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    });
  }
  if (cookies.length) {
    await context.addCookies(cookies);
    console.log(`Using ${cookies.length} cookies`);
  }
  const page = await context.newPage();

  try {
    console.log("Loading cryptonomads.org...");
    await page.goto("https://cryptonomads.org/", {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    // Cloudflare may show a challenge page first — wait for it to resolve
    console.log("Waiting for page to fully load...");
    try {
      await page.waitForSelector("script#__NEXT_DATA__", { state: "attached", timeout: 30000 });
    } catch (_) {
      console.log("Waiting for Cloudflare challenge to resolve...");
      await page.waitForTimeout(10000);
      await page.waitForSelector("script#__NEXT_DATA__", { state: "attached", timeout: 15000 });
    }

    // Extract the JSON
    const nextData = await page.evaluate(() => {
      const el = document.getElementById("__NEXT_DATA__");
      return el ? JSON.parse(el.textContent) : null;
    });

    if (!nextData?.props?.pageProps) {
      console.error("Could not extract __NEXT_DATA__");
      await browser.close();
      process.exit(1);
    }

    const pp = nextData.props.pageProps;

    // Extract events
    const allEvents = pp.allEvents || pp.events || [];
    const series = pp.seriesMenuItems || pp.series || [];
    const colivingEvents = pp.colivingEvents || [];

    console.log(`Found ${allEvents.length} events`);
    console.log(`Found ${series.length} series/crypto weeks`);
    console.log(`Found ${colivingEvents.length} coliving events`);

    // Normalize events into our format
    const events = allEvents.map((e) => ({
      id: e.id || e.slug,
      name: e.event || e.name || e.title || "",
      slug: e.slug || e.shortSlug || "",
      description: e.description || "",
      startDate: e.startDate || null,
      endDate: e.endDate || null,
      timezone: e.timezone || null,
      cities: e.city || [],
      countries: e.country || [],
      regions: e.region || [],
      link: e.link || null,
      organizer: e.organizer || null,
      twitter: e.twitter || null,
      telegram: e.telegram || null,
      tags: e.tags || [],
      topics: e.topics || [],
      series: e.series || [],
      banner: e.banner || null,
      logo: e.logo || null,
      paidEvent: e.paidEvent || false,
      promoted: e.promoted || false,
      goingCount: (e.usersGoingObj || []).length,
      interestedCount: (e.usersInterestedObj || []).length,
    }));

    // Normalize series
    const normalizedSeries = series.map((s) => ({
      id: s.id,
      title: s.title || "",
      slug: s.slug || s.shortSlug || "",
      location: s.location || "",
      date: s.date || null,
      endDate: s.endDate || null,
      numEvents: s.numEvents || 0,
      image: s.image || null,
    }));

    const output = {
      scrapedAt: new Date().toISOString(),
      stats: {
        events: events.length,
        series: normalizedSeries.length,
        colivingEvents: colivingEvents.length,
      },
      events,
      series: normalizedSeries,
    };

    writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
    console.log(`\nSaved to ${OUTPUT}`);
    console.log(
      `\nTop series by event count:`
    );
    normalizedSeries
      .sort((a, b) => b.numEvents - a.numEvents)
      .slice(0, 15)
      .forEach((s) => {
        console.log(`  ${s.numEvents} events — ${s.title} (${s.location})`);
      });

    // Show upcoming events
    const now = new Date().toISOString().split("T")[0];
    const upcoming = events
      .filter((e) => e.startDate && e.startDate >= now)
      .sort((a, b) => a.startDate.localeCompare(b.startDate));
    console.log(`\nUpcoming events: ${upcoming.length}`);
    upcoming.slice(0, 20).forEach((e) => {
      console.log(
        `  ${e.startDate} — ${e.name} (${e.cities.join(", ") || "TBA"}) [${e.tags.join(", ")}]`
      );
    });
  } catch (err) {
    console.error("Scrape failed:", err.message);
    // Try Wayback Machine fallback
    console.log("\nTrying Wayback Machine fallback...");
    await tryWayback(browser);
  } finally {
    await browser.close();
  }
}

async function tryWayback(browser) {
  const page = await browser.newPage();
  try {
    // Get the latest cached version from Wayback Machine
    const cdxUrl =
      "https://web.archive.org/cdx/search/cdx?url=cryptonomads.org&output=json&limit=1&fl=timestamp&sort=desc";
    await page.goto(cdxUrl, { timeout: 15000 });
    const cdxText = await page.evaluate(() => document.body.innerText);
    const cdx = JSON.parse(cdxText);

    if (cdx.length < 2) {
      console.error("No Wayback Machine cache found");
      return;
    }

    const ts = cdx[1][0];
    console.log(`Using Wayback cache from: ${ts}`);

    const waybackUrl = `https://web.archive.org/web/${ts}/https://cryptonomads.org/`;
    await page.goto(waybackUrl, { waitUntil: "domcontentloaded", timeout: 30000 });

    const nextData = await page.evaluate(() => {
      const el = document.getElementById("__NEXT_DATA__");
      return el ? JSON.parse(el.textContent) : null;
    });

    if (nextData?.props?.pageProps) {
      const pp = nextData.props.pageProps;
      const events = (pp.allEvents || []).map((e) => ({
        id: e.id || e.slug,
        name: e.event || e.name || "",
        slug: e.slug || "",
        description: e.description || "",
        startDate: e.startDate || null,
        endDate: e.endDate || null,
        cities: e.city || [],
        countries: e.country || [],
        tags: e.tags || [],
        topics: e.topics || [],
        series: e.series || [],
        link: e.link || null,
        banner: e.banner || null,
        logo: e.logo || null,
      }));

      const output = {
        scrapedAt: new Date().toISOString(),
        source: "wayback",
        waybackTimestamp: ts,
        stats: { events: events.length },
        events,
        series: (pp.seriesMenuItems || []).map((s) => ({
          id: s.id,
          title: s.title || "",
          slug: s.slug || "",
          numEvents: s.numEvents || 0,
        })),
      };

      writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
      console.log(`Saved ${events.length} events from Wayback cache to ${OUTPUT}`);
    }
  } catch (err) {
    console.error("Wayback fallback also failed:", err.message);
  }
}

scrape().catch(console.error);
