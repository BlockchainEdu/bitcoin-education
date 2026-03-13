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

  // Get user from Supabase auth token
  const token = req.headers.authorization?.replace("Bearer ", "");
  let userId = null;
  let userEmail = null;

  if (token) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data: { user } } = await supabase.auth.getUser(token);
    if (user) {
      userId = user.id;
      userEmail = user.email;
    }
  }

  try {
    const params = {
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: "BEN Membership — Lifetime Access",
              description: "Courses, community, job applications, partner deals, events, and more.",
            },
            unit_amount: 19900, // $199.00
          },
        },
      ],
      success_url: `${ALLOWED_ORIGIN}/dashboard?welcome=true`,
      cancel_url: `${ALLOWED_ORIGIN}/academy`,
      metadata: {
        type: "membership",
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
