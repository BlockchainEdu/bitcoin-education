import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "https://www.blockchainedu.org";

// Server-side price validation — never trust client-sent total
const BASE_PRICE = 299;
const ADDON_PRICES = {
  show_logo: 49,
  highlight: 49,
  sticky_day: 99,
  sticky_week: 199,
  sticky_month: 597,
  email_blast: 99,
};

function calculateTotal(addons) {
  let total = BASE_PRICE;
  if (!addons || typeof addons !== "object") return total * 100;
  for (const [key, active] of Object.entries(addons)) {
    if (active && ADDON_PRICES[key]) {
      total += ADDON_PRICES[key];
    }
  }
  return total * 100; // cents
}

function buildProductName(addons) {
  const parts = ["BEN Jobs Listing"];
  if (addons?.sticky_month) parts.push("+ Pinned 30d");
  else if (addons?.sticky_week) parts.push("+ Pinned 7d");
  else if (addons?.sticky_day) parts.push("+ Pinned 24h");
  if (addons?.highlight) parts.push("+ Highlighted");
  if (addons?.show_logo) parts.push("+ Logo");
  if (addons?.email_blast) parts.push("+ Email Blast");
  return parts.join(" ") + " (Monthly)";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  // Verify auth
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const { job_id, addons } = req.body;
  if (!job_id) {
    return res.status(400).json({ error: "job_id is required" });
  }

  const unitAmount = calculateTotal(addons);
  const productName = buildProductName(addons);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            recurring: { interval: "month" },
            product_data: {
              name: productName,
              description: "Your job listing stays active as long as the subscription is active. Cancel anytime.",
            },
            unit_amount: unitAmount,
          },
        },
      ],
      success_url: `${ALLOWED_ORIGIN}/jobs?posted=true`,
      cancel_url: `${ALLOWED_ORIGIN}/post-job`,
      customer_email: user.email,
      metadata: {
        type: "job_post",
        job_id: String(job_id),
        user_id: user.id,
        addons: JSON.stringify(addons || {}),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: "Payment processing error. Please try again." });
  }
}
