/**
 * Cron: Sync Airbnb availability for Casa Datcha (listing 565218907633405155)
 * Runs every 2 hours via Vercel cron.
 */
import { db } from "../../../lib/db";
import { colivingAvailability } from "../../../lib/db/schema";
import { eq, lt, and } from "drizzle-orm";

const AIRBNB_LISTING_ID = "565218907633405155";
const AIRBNB_API_KEY = "d306zoyjsyarp7ifhu67rjxn52tv0t20";
const PROPERTY_SLUG = "casa-datcha";
const MONTHS_AHEAD = 12;

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Auth check for production
  if (process.env.NODE_ENV === "production") {
    const isCron = req.headers["x-vercel-cron"];
    const hasSecret =
      req.headers.authorization === `Bearer ${process.env.CRON_SECRET}`;
    if (!isCron && !hasSecret) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }

  try {
    // ── 1. Fetch calendar from Airbnb v2 API ──
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const url =
      `https://www.airbnb.com/api/v2/homes_pdp_availability_calendar` +
      `?key=${AIRBNB_API_KEY}` +
      `&currency=USD` +
      `&locale=en` +
      `&listing_id=${AIRBNB_LISTING_ID}` +
      `&month=${currentMonth}` +
      `&year=${currentYear}` +
      `&count=${MONTHS_AHEAD}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Airbnb API failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const calendarMonths = data.calendar_months;

    if (!calendarMonths || calendarMonths.length === 0) {
      throw new Error("No calendar data returned from Airbnb");
    }

    // ── 2. Build rows from Airbnb response ──
    const today = now.toISOString().split("T")[0];
    const rows = [];
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

    // ── 3. Upsert to DB in batches ──
    let upserted = 0;
    for (let i = 0; i < rows.length; i += 100) {
      const batch = rows.slice(i, i + 100);
      for (const row of batch) {
        await db
          .insert(colivingAvailability)
          .values(row)
          .onConflictDoUpdate({
            target: [
              colivingAvailability.property,
              colivingAvailability.date,
            ],
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

    // ── 4. Clean up old dates ──
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
  } catch (err) {
    console.error("[sync-availability] Fatal:", err.message);
    return res.status(500).json({
      error: "Sync failed",
      message: err.message,
      timestamp: new Date().toISOString(),
    });
  }
}
