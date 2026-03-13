/**
 * POST /api/checkout/coliving
 * Creates a Stripe Checkout session for Casa Datcha booking in USD.
 * Body: { checkin, checkout, guests, email }
 */
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const PRICING = { peak: 2800, high: 2000, low: 1400 }; // USD per night
const CLEANING_FEE = 550; // USD
const MIN_NIGHTS = 3;
const MAX_GUESTS = 28;

const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "https://www.blockchainedu.org";

function getSeason(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const month = d.getMonth() + 1;
  const day = d.getDate();
  if ((month === 6 && day >= 15) || (month >= 7 && month <= 8) || (month === 9 && day <= 15)) return "peak";
  if (month === 5 || (month === 6 && day < 15) || (month === 9 && day > 15) || month === 10) return "high";
  return "low";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { checkin, checkout, guests, email } = req.body;

  if (!checkin || !checkout || !email) {
    return res.status(400).json({ error: "checkin, checkout, and email are required" });
  }

  const start = new Date(checkin + "T00:00:00");
  const end = new Date(checkout + "T00:00:00");
  const nights = Math.round((end - start) / (1000 * 60 * 60 * 24));

  if (nights < MIN_NIGHTS) {
    return res.status(400).json({ error: `Minimum ${MIN_NIGHTS} nights required` });
  }
  if (guests && guests > MAX_GUESTS) {
    return res.status(400).json({ error: `Maximum ${MAX_GUESTS} guests` });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // ── Verify availability ──
  const { data: avail, error: availErr } = await supabase
    .from("coliving_availability")
    .select("date, available")
    .eq("property", "casa-datcha")
    .gte("date", checkin)
    .lt("date", checkout);

  if (availErr) {
    console.error("[checkout/coliving] availability check:", availErr);
    return res.status(500).json({ error: "Could not verify availability" });
  }

  const unavailable = (avail || []).filter((d) => !d.available).map((d) => d.date);
  if (unavailable.length > 0) {
    return res.status(409).json({ error: "Some dates are no longer available", unavailableDates: unavailable });
  }

  // ── Calculate pricing in USD ──
  const nightlyBreakdown = {};
  const cursor = new Date(start);
  while (cursor < end) {
    const dateStr = cursor.toISOString().split("T")[0];
    const season = getSeason(dateStr);
    if (!nightlyBreakdown[season]) nightlyBreakdown[season] = { nights: 0, rate: PRICING[season] };
    nightlyBreakdown[season].nights++;
    cursor.setDate(cursor.getDate() + 1);
  }

  const lineItems = [];
  for (const [season, info] of Object.entries(nightlyBreakdown)) {
    lineItems.push({
      quantity: info.nights,
      price_data: {
        currency: "usd",
        product_data: {
          name: `Casa Datcha — ${season.charAt(0).toUpperCase() + season.slice(1)} Season`,
          description: `$${info.rate}/night, ${checkin} to ${checkout}`,
        },
        unit_amount: info.rate * 100, // cents
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

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });

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

    // Mark dates as pending
    const pending = [];
    const c = new Date(start);
    while (c < end) {
      pending.push({
        property: "casa-datcha",
        date: c.toISOString().split("T")[0],
        available: false,
        source: "ben-booking-pending",
        synced_at: new Date().toISOString(),
      });
      c.setDate(c.getDate() + 1);
    }
    await supabase.from("coliving_availability").upsert(pending, { onConflict: "property,date" });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("[checkout/coliving]", err);
    return res.status(500).json({ error: "Payment processing error. Please try again." });
  }
}
