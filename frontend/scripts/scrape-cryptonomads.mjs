#!/usr/bin/env node
/**
 * Scrape cryptonomads.org for crypto events & side events.
 * Uses Playwright to bypass Cloudflare, extracts __NEXT_DATA__ JSON.
 *
 * Usage:
 *   node scripts/scrape-cryptonomads.mjs              # homepage only (headless)
 *   node scripts/scrape-cryptonomads.mjs --with-series # also scrape series pages (headed, visible browser)
 *
 * Output: content/cryptonomads-events.json
 */

import { chromium } from "playwright";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUTPUT = join(ROOT, "content", "cryptonomads-events.json");

// Parse CLI flags
const WITH_SERIES = process.argv.includes("--with-series");
const HEADED = process.argv.includes("--headed") || WITH_SERIES;

async function scrape() {
  console.log(`Launching browser (${HEADED ? "headed" : "headless"})...`);
  if (WITH_SERIES) console.log("Series scraping enabled — will scrape all crypto week pages");
  const browser = await chromium.launch({
    headless: !HEADED,
    channel: process.argv.includes("--chrome") ? "chrome" : undefined,
    args: [
      "--disable-blink-features=AutomationControlled",
      "--no-sandbox",
    ],
  });
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

  // Remove webdriver detection to avoid Cloudflare bot detection
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    // Remove Playwright/headless indicators
    delete window.__playwright;
    delete window.__pw_manual;
  });

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

    // Extract all available data from pageProps
    const allEvents = pp.allEvents || pp.events || [];
    const series = pp.seriesMenuItems || pp.series || [];
    const colivingEvents = pp.colivingEvents || [];
    const companies = pp.companies || [];
    const featuredEvents = pp.featuredEvents || [];
    const cityGuides = pp.cityGuides || [];

    console.log(`Found ${allEvents.length} events`);
    console.log(`Found ${series.length} series/crypto weeks`);
    console.log(`Found ${colivingEvents.length} coliving events`);
    console.log(`Found ${companies.length} companies`);
    console.log(`Found ${featuredEvents.length} featured events`);
    console.log(`Found ${cityGuides.length} city guides`);

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

    // Normalize series (capture full metadata for banner/logo fallback)
    const normalizedSeries = series.map((s) => ({
      id: s.id,
      title: s.title || "",
      slug: s.slug || s.shortSlug || "",
      shortSlug: s.shortSlug || "",
      location: s.location || "",
      date: s.date || null,
      endDate: s.endDate || null,
      numEvents: s.numEvents || 0,
      image: s.image || null,
      banner: s.banner || null,
      logo: s.logo || null,
      color: s.color || null,
      visible: s.visible || false,
      clickable: s.clickable || false,
    }));

    const output = {
      scrapedAt: new Date().toISOString(),
      stats: {
        events: events.length,
        series: normalizedSeries.length,
        colivingEvents: colivingEvents.length,
        companies: companies.length,
        featuredEvents: featuredEvents.length,
      },
      events,
      series: normalizedSeries,
      companies: companies.map((c) => ({
        id: c.id,
        name: c.name || c.title || "",
        logo: c.logo || null,
        url: c.url || c.link || null,
      })),
      featuredEvents: featuredEvents.map((e) => e.id || e.slug),
    };

    console.log(
      `\nTop series by event count:`
    );
    normalizedSeries
      .sort((a, b) => b.numEvents - a.numEvents)
      .slice(0, 15)
      .forEach((s) => {
        console.log(`  ${s.numEvents} events — ${s.title} (${s.location})`);
      });

    // ── Phase 2: Scrape series pages for side events ──
    // Series pages live at /{slug} (NOT /series/{slug}!).
    // They use different pageProps keys: sideEvents + mainEvents (not allEvents).
    // Side event objects have a different shape from homepage events.
    const sideEvents = [];
    const seenIds = new Set(events.map((e) => e.id));

    if (WITH_SERIES) {
      const topSeries = normalizedSeries
        .filter((s) => s.numEvents > 0 && s.slug)
        .sort((a, b) => b.numEvents - a.numEvents);

      console.log(`\nScraping ${topSeries.length} series pages for side events...`);
      let consecutiveFailures = 0;

      for (const s of topSeries) {
        if (consecutiveFailures >= 5) {
          console.log(`\n  Stopping — ${consecutiveFailures} consecutive failures`);
          break;
        }

        try {
          // URL format: /{slug} (no /series/ prefix)
          const seriesUrl = `https://cryptonomads.org/${s.slug}`;
          console.log(`  Loading: ${s.title} (${s.numEvents} listed)...`);

          await page.goto(seriesUrl, { waitUntil: "domcontentloaded", timeout: 45000 });

          try {
            await page.waitForSelector("script#__NEXT_DATA__", { state: "attached", timeout: 20000 });
          } catch (_) {
            console.log(`    Waiting for page to load...`);
            await page.waitForTimeout(5000);
            try {
              await page.waitForSelector("script#__NEXT_DATA__", { state: "attached", timeout: 10000 });
            } catch (__) {
              console.log(`    Skipping ${s.title} — page didn't load`);
              consecutiveFailures++;
              continue;
            }
          }

          const seriesData = await page.evaluate(() => {
            const el = document.getElementById("__NEXT_DATA__");
            return el ? JSON.parse(el.textContent) : null;
          });

          const sp = seriesData?.props?.pageProps;
          if (!sp) {
            consecutiveFailures++;
            continue;
          }

          // Series pages use sideEvents + mainEvents (different from homepage's allEvents)
          const pageSideEvents = sp.sideEvents || [];
          const pageMainEvents = sp.mainEvents || [];
          const allSeriesEvents = [...pageSideEvents, ...pageMainEvents];

          let newCount = 0;
          for (const e of allSeriesEvents) {
            const eid = e.id || e.slug;
            if (seenIds.has(eid)) continue;
            seenIds.add(eid);
            newCount++;

            // Series page events have a different shape — normalize to match homepage format
            const tags = typeof e.tags === "string" ? [e.tags] : (e.tags || []);
            const chain = e.chain || [];
            const allTags = [...new Set([...tags, ...chain])];

            sideEvents.push({
              id: eid,
              name: e.name || e.event || "",
              slug: e.slug || e.shortSlug || "",
              description: e.cached_description || e.description || "",
              startDate: e.startDate ? e.startDate.split("T")[0] : null,
              endDate: e.endDate ? e.endDate.split("T")[0] : null,
              timezone: e.timezone || null,
              cities: e.city ? [e.city] : [],
              countries: e.country ? [e.country] : [],
              regions: e.region ? [e.region] : [],
              link: e.website || null,
              organizer: e.organizer || null,
              twitter: null,
              telegram: null,
              tags: allTags,
              topics: e.topics || [],
              series: [{
                id: sp.currentSeries?.id || null,
                title: e.seriesName || s.title,
                slug: e.seriesSlug || s.slug,
                banner: sp.currentSeries?.banner || null,
                logo: sp.currentSeries?.logo || null,
              }],
              banner: e.cached_banner || e.image || null,
              logo: e.logo || null,
              paidEvent: e.paidEvent || false,
              promoted: e.promoStatus === "Promoted",
              goingCount: (e.usersGoing || []).length,
              interestedCount: (e.usersInterested || []).length,
              isSideEvent: true,
              parentSeries: e.seriesName || s.title,
            });
          }
          console.log(`    ${s.title}: ${pageSideEvents.length} side + ${pageMainEvents.length} main, ${newCount} new`);
          consecutiveFailures = 0;

          // Human-like delay (2-4s)
          const delay = 2000 + Math.random() * 2000;
          await page.waitForTimeout(delay);
        } catch (err) {
          console.log(`    Error on ${s.title}: ${err.message.slice(0, 80)}`);
          consecutiveFailures++;
        }
      }
    } else {
      console.log(`\nSkipping series pages (run with --with-series to scrape side events)`);
    }

    console.log(`\nFound ${sideEvents.length} additional side events from series pages`);

    // Merge side events into main events list
    const allMergedEvents = [...events, ...sideEvents];

    output.stats.sideEvents = sideEvents.length;
    output.stats.totalEvents = allMergedEvents.length;
    output.events = allMergedEvents;

    writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
    console.log(`\nSaved ${allMergedEvents.length} total events to ${OUTPUT}`);

    // Show upcoming events
    const now = new Date().toISOString().split("T")[0];
    const upcoming = allMergedEvents
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
