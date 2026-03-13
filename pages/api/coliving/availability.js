/**
 * GET /api/coliving/availability?month=2026-06
 * Returns real availability synced from Airbnb + our pricing.
 * Falls back to live Airbnb API fetch if DB has no data yet.
 */
import { createClient } from "@supabase/supabase-js";

const AIRBNB_LISTING_ID = "565218907633405155";
const AIRBNB_API_KEY = "d306zoyjsyarp7ifhu67rjxn52tv0t20";

// Pricing tiers (USD per night, whole villa)
const PRICING = {
  peak: { nightly: 2800, label: "Peak Season" },   // Jun 15 - Sep 15
  high: { nightly: 2000, label: "High Season" },    // May, Oct
  low: { nightly: 1400, label: "Low Season" },      // Nov - Apr
};

const CLEANING_FEE = 550; // USD
const MIN_NIGHTS = 3;
const MAX_GUESTS = 28;
const CHECKIN_TIME = "15:00";
const CHECKOUT_TIME = "11:00";

function getSeason(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const month = d.getMonth() + 1;
  const day = d.getDate();
  if ((month === 6 && day >= 15) || (month >= 7 && month <= 8) || (month === 9 && day <= 15)) return "peak";
  if (month === 5 || (month === 6 && day < 15) || (month === 9 && day > 15) || month === 10) return "high";
  return "low";
}

// Fetch live from Airbnb if DB has no data
async function fetchAirbnbLive(year, month) {
  try {
    const url =
      `https://www.airbnb.com/api/v2/homes_pdp_availability_calendar` +
      `?key=${AIRBNB_API_KEY}&currency=USD&locale=en` +
      `&listing_id=${AIRBNB_LISTING_ID}&month=${month}&year=${year}&count=1`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    });

    if (!res.ok) return null;
    const data = await res.json();
    const calMonth = data.calendar_months?.[0];
    if (!calMonth) return null;

    return calMonth.days.map((d) => ({
      date: d.date,
      available: d.available && d.available_for_checkin,
      min_nights: d.min_nights || MIN_NIGHTS,
    }));
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "public, s-maxage=120, stale-while-revalidate=300");

  const { month } = req.query;
  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return res.status(400).json({ error: "month param required (YYYY-MM)" });
  }

  const [year, mon] = month.split("-").map(Number);
  const startDate = `${month}-01`;
  const lastDay = new Date(year, mon, 0).getDate();
  const endDate = `${month}-${String(lastDay).padStart(2, "0")}`;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  try {
    // Try Supabase first
    const { data, error } = await supabase
      .from("coliving_availability")
      .select("date, available, min_nights")
      .eq("property", "casa-datcha")
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date");

    let dayRows = data && data.length > 0 ? data : null;

    // Fall back to live Airbnb API if DB empty
    if (!dayRows) {
      const live = await fetchAirbnbLive(year, mon);
      if (live) {
        dayRows = live;
      }
    }

    // Build response with pricing
    const today = new Date().toISOString().split("T")[0];
    const days = [];

    if (dayRows) {
      for (const row of dayRows) {
        const season = getSeason(row.date);
        const isPast = row.date < today;
        days.push({
          date: row.date,
          available: isPast ? false : row.available,
          price: PRICING[season].nightly,
          season: PRICING[season].label,
          minNights: row.min_nights || MIN_NIGHTS,
        });
      }
    } else {
      // Absolute fallback: show all as unavailable (safe default)
      for (let d = 1; d <= lastDay; d++) {
        const dateStr = `${month}-${String(d).padStart(2, "0")}`;
        const season = getSeason(dateStr);
        days.push({
          date: dateStr,
          available: false,
          price: PRICING[season].nightly,
          season: PRICING[season].label,
          minNights: MIN_NIGHTS,
        });
      }
    }

    return res.status(200).json({
      property: "casa-datcha",
      month,
      days,
      pricing: PRICING,
      cleaningFee: CLEANING_FEE,
      currency: "USD",
      minNights: MIN_NIGHTS,
      maxGuests: MAX_GUESTS,
      checkin: CHECKIN_TIME,
      checkout: CHECKOUT_TIME,
      source: dayRows ? (data && data.length > 0 ? "synced" : "live") : "fallback",
    });
  } catch (err) {
    console.error("[availability]", err);
    return res.status(500).json({ error: "Failed to load availability" });
  }
}
