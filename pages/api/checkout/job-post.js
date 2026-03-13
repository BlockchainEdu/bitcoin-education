import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "https://www.blockchainedu.org";

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

  const { job_id, tier } = req.body;
  if (!job_id) {
    return res.status(400).json({ error: "job_id is required" });
  }

  const isFeatured = tier === "featured";
  const unitAmount = isFeatured ? 49900 : 29900;
  const productName = isFeatured
    ? "BEN Jobs — Featured Listing (Monthly)"
    : "BEN Jobs — Standard Listing (Monthly)";

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
      cancel_url: `${ALLOWED_ORIGIN}/jobs?post=true`,
      customer_email: user.email,
      metadata: {
        type: "job_post",
        job_id: String(job_id),
        user_id: user.id,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: "Payment processing error. Please try again." });
  }
}
