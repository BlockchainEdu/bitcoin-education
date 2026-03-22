import { Router } from "express";
import Stripe from "stripe";
import { db } from "../db";
import { colivingAvailability, application } from "../db/schema";
import { eq, gte, lte, lt, and } from "drizzle-orm";

const router = Router();

const AIRBNB_LISTING_ID = "565218907633405155";
const AIRBNB_API_KEY = "d306zoyjsyarp7ifhu67rjxn52tv0t20";
const PROPERTY_SLUG = "casa-datcha";
const MONTHS_AHEAD = 12;

const PRICING: Record<string, { nightly: number; label: string }> = {
  peak: { nightly: 2800, label: "Peak Season" },
  high: { nightly: 2000, label: "High Season" },
  low: { nightly: 1400, label: "Low Season" },
};
const CLEANING_FEE = 550;
const MIN_NIGHTS = 3;
const MAX_GUESTS = 28;
const CHECKIN_TIME = "15:00";
const CHECKOUT_TIME = "11:00";

function getSeason(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const month = d.getMonth() + 1;
  const day = d.getDate();
  if (
    (month === 6 && day >= 15) ||
    (month >= 7 && month <= 8) ||
    (month === 9 && day <= 15)
  )
    return "peak";
  if (
    month === 5 ||
    (month === 6 && day < 15) ||
    (month === 9 && day > 15) ||
    month === 10
  )
    return "high";
  return "low";
}

async function fetchAirbnbLive(year: number, month: number) {
  try {
    const url =
      `https://www.airbnb.com/api/v2/homes_pdp_availability_calendar` +
      `?key=${AIRBNB_API_KEY}&currency=USD&locale=en` +
      `&listing_id=${AIRBNB_LISTING_ID}&month=${month}&year=${year}&count=1`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    });

    if (!res.ok) return null;
    const data = await res.json();
    const calMonth = data.calendar_months?.[0];
    if (!calMonth) return null;

    return calMonth.days.map((d: any) => ({
      date: d.date,
      available: d.available && d.available_for_checkin,
      min_nights: d.min_nights || MIN_NIGHTS,
    }));
  } catch {
    return null;
  }
}

// GET /api/coliving/availability
router.get("/availability", async (req, res) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=300"
  );

  const month = req.query.month as string | undefined;
  if (!month || !/^\d{4}-\d{2}$/.test(month)) {
    return res.status(400).json({ error: "month param required (YYYY-MM)" });
  }

  const [year, mon] = month.split("-").map(Number);
  const startDate = `${month}-01`;
  const lastDay = new Date(year, mon, 0).getDate();
  const endDate = `${month}-${String(lastDay).padStart(2, "0")}`;

  try {
    const data = await db
      .select({
        date: colivingAvailability.date,
        available: colivingAvailability.available,
        min_nights: colivingAvailability.min_nights,
      })
      .from(colivingAvailability)
      .where(
        and(
          eq(colivingAvailability.property, "casa-datcha"),
          gte(colivingAvailability.date, startDate),
          lte(colivingAvailability.date, endDate)
        )
      )
      .orderBy(colivingAvailability.date);

    let dayRows = data && data.length > 0 ? data : null;

    if (!dayRows) {
      const live = await fetchAirbnbLive(year, mon);
      if (live) dayRows = live;
    }

    const today = new Date().toISOString().split("T")[0];
    const days: any[] = [];

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
      source: dayRows
        ? data && data.length > 0
          ? "synced"
          : "live"
        : "fallback",
    });
  } catch (err) {
    console.error("[availability]", err);
    return res.status(500).json({ error: "Failed to load availability" });
  }
});

// GET|POST /api/coliving/sync-availability
router.all("/sync-availability", async (req, res) => {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (process.env.NODE_ENV === "production") {
    const hasSecret =
      req.headers.authorization === `Bearer ${process.env.CRON_SECRET}`;
    if (!hasSecret) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  try {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const url =
      `https://www.airbnb.com/api/v2/homes_pdp_availability_calendar` +
      `?key=${AIRBNB_API_KEY}` +
      `&currency=USD&locale=en` +
      `&listing_id=${AIRBNB_LISTING_ID}` +
      `&month=${currentMonth}&year=${currentYear}` +
      `&count=${MONTHS_AHEAD}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Airbnb API failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const calendarMonths = data.calendar_months;

    if (!calendarMonths || calendarMonths.length === 0) {
      throw new Error("No calendar data returned from Airbnb");
    }

    const today = now.toISOString().split("T")[0];
    const rows: any[] = [];
    let blockedCount = 0;
    let availableCount = 0;

    for (const month of calendarMonths) {
      for (const day of month.days) {
        if (day.date < today) continue;
        const isAvailable = day.available && day.available_for_checkin;
        if (isAvailable) availableCount++;
        else blockedCount++;
        rows.push({
          property: PROPERTY_SLUG,
          date: day.date,
          available: isAvailable,
          min_nights: day.min_nights || 3,
          source: "airbnb-api",
          synced_at: new Date(),
        });
      }
    }

    let upserted = 0;
    for (let i = 0; i < rows.length; i += 100) {
      const batch = rows.slice(i, i + 100);
      for (const row of batch) {
        await db
          .insert(colivingAvailability)
          .values(row)
          .onConflictDoUpdate({
            target: [colivingAvailability.property, colivingAvailability.date],
            set: {
              available: row.available,
              min_nights: row.min_nights,
              source: row.source,
              synced_at: row.synced_at,
            },
          });
      }
      upserted += batch.length;
    }

    await db
      .delete(colivingAvailability)
      .where(
        and(
          eq(colivingAvailability.property, PROPERTY_SLUG),
          lt(colivingAvailability.date, today)
        )
      );

    const result = {
      success: true,
      synced: upserted,
      blocked: blockedCount,
      available: availableCount,
      months: calendarMonths.length,
      timestamp: new Date().toISOString(),
    };

    console.log("[sync-availability]", JSON.stringify(result));
    return res.status(200).json(result);
  } catch (err: any) {
    console.error("[sync-availability] Fatal:", err.message);
    return res.status(500).json({
      error: "Sync failed",
      message: err.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// POST /api/coliving/apply
router.post("/apply", async (req, res) => {
  try {
    const body = req.body;

    if (!body.name || !body.email) {
      return res.status(400).json({ error: "Name and email required" });
    }

    const [data] = await db
      .insert(application)
      .values({
        type: body.type || "coliving",
        name: body.name,
        email: body.email,
        telegram: body.telegram || null,
        linkedin: body.linkedin || null,
        github: body.github || null,
        country: body.country || null,
        role: body.role || null,
        startup_name: body.startup_name || null,
        one_liner: body.one_liner || null,
        stage: body.stage || null,
        what_building: body.what_building || null,
        pitch_url: body.pitch_url || null,
        preferred_location: body.preferred_location || null,
        preferred_dates: body.preferred_dates || null,
        why_join: body.why_join || null,
        what_contribute: body.what_contribute || null,
        dietary: body.dietary || null,
        how_heard: body.how_heard || null,
        status: body.status || "pending",
      })
      .returning();

    return res.status(201).json({ success: true, id: data.id });
  } catch (err) {
    console.error("Coliving apply error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/coliving/checkout (also mounted at /api/checkout/coliving via index.ts)
router.post("/checkout", async (req, res) => {
  const { checkin, checkout, guests, email } = req.body;

  if (!checkin || !checkout || !email) {
    return res
      .status(400)
      .json({ error: "checkin, checkout, and email are required" });
  }

  const start = new Date(checkin + "T00:00:00");
  const end = new Date(checkout + "T00:00:00");
  const nights = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  if (nights < MIN_NIGHTS) {
    return res
      .status(400)
      .json({ error: `Minimum ${MIN_NIGHTS} nights required` });
  }
  if (guests && guests > MAX_GUESTS) {
    return res.status(400).json({ error: `Maximum ${MAX_GUESTS} guests` });
  }

  const avail = await db
    .select({
      date: colivingAvailability.date,
      available: colivingAvailability.available,
    })
    .from(colivingAvailability)
    .where(
      and(
        eq(colivingAvailability.property, "casa-datcha"),
        gte(colivingAvailability.date, checkin),
        lt(colivingAvailability.date, checkout)
      )
    );

  const unavailable = (avail || [])
    .filter((d) => !d.available)
    .map((d) => d.date);
  if (unavailable.length > 0) {
    return res.status(409).json({
      error: "Some dates are no longer available",
      unavailableDates: unavailable,
    });
  }

  const nightlyBreakdown: Record<string, { nights: number; rate: number }> = {};
  const cursor = new Date(start);
  while (cursor < end) {
    const dateStr = cursor.toISOString().split("T")[0];
    const season = getSeason(dateStr);
    if (!nightlyBreakdown[season])
      nightlyBreakdown[season] = { nights: 0, rate: PRICING[season].nightly };
    nightlyBreakdown[season].nights++;
    cursor.setDate(cursor.getDate() + 1);
  }

  const lineItems: any[] = [];
  for (const [season, info] of Object.entries(nightlyBreakdown)) {
    lineItems.push({
      quantity: info.nights,
      price_data: {
        currency: "usd",
        product_data: {
          name: `Casa Datcha — ${season.charAt(0).toUpperCase() + season.slice(1)} Season`,
          description: `$${info.rate}/night, ${checkin} to ${checkout}`,
        },
        unit_amount: info.rate * 100,
      },
    });
  }

  lineItems.push({
    quantity: 1,
    price_data: {
      currency: "usd",
      product_data: { name: "Cleaning Fee" },
      unit_amount: CLEANING_FEE * 100,
    },
  });

  const ALLOWED_ORIGIN =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.blockchainedu.org";

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16" as any,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: lineItems,
      success_url: `${ALLOWED_ORIGIN}/coliving/ibiza?booked=true&checkin=${checkin}&checkout=${checkout}`,
      cancel_url: `${ALLOWED_ORIGIN}/coliving/ibiza#booking`,
      metadata: {
        type: "coliving-booking",
        property: "casa-datcha",
        checkin,
        checkout,
        guests: String(guests || ""),
        nights: String(nights),
      },
    });

    const pending: any[] = [];
    const c = new Date(start);
    while (c < end) {
      pending.push({
        property: "casa-datcha",
        date: c.toISOString().split("T")[0],
        available: false,
        source: "ben-booking-pending",
        synced_at: new Date(),
      });
      c.setDate(c.getDate() + 1);
    }

    for (const row of pending) {
      await db
        .insert(colivingAvailability)
        .values(row)
        .onConflictDoUpdate({
          target: [colivingAvailability.property, colivingAvailability.date],
          set: {
            available: row.available,
            source: row.source,
            synced_at: row.synced_at,
          },
        });
    }

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("[checkout/coliving]", err);
    return res
      .status(500)
      .json({ error: "Payment processing error. Please try again." });
  }
});

export default router;
