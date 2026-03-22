import Stripe from "stripe";
import { getUserFromRequest } from "../../../lib/auth-helpers";

const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "https://www.blockchainedu.org";

const PLAN_CONFIG = {
  monthly: {
    mode: "subscription",
    price_data: {
      currency: "usd",
      product_data: {
        name: "BEN Membership",
        description: "Full access to courses, community, job board, partner deals, and more.",
      },
      unit_amount: 2900, // $29.00
      recurring: { interval: "month" },
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  const payload = getUserFromRequest(req);
  const userId = payload?.id || null;
  const userEmail = payload?.email || null;

  try {
    const plan = "monthly";
    const config = PLAN_CONFIG[plan];

    const params = {
      mode: config.mode,
      line_items: [
        {
          quantity: 1,
          price_data: config.price_data,
        },
      ],
      success_url: `${ALLOWED_ORIGIN}/dashboard?welcome=true`,
      cancel_url: `${ALLOWED_ORIGIN}/pricing`,
      metadata: {
        type: "membership",
        plan,
        user_id: userId || "",
      },
    };

    if (userEmail) {
      params.customer_email = userEmail;
    }

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: "Payment processing error. Please try again." });
  }
}
