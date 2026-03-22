import { Router } from "express";
import Stripe from "stripe";
import { getUserFromRequest } from "../auth-helpers";

const router = Router();

const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "https://www.blockchainedu.org";

// POST /api/checkout/membership
router.post("/membership", async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16" as any,
  });

  const payload = getUserFromRequest(req);
  const userId = payload?.id || null;
  const userEmail = payload?.email || null;

  try {
    const params: any = {
      mode: "subscription",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: "BEN Membership",
              description: "Full access to courses, community, job board, partner deals, and more.",
            },
            unit_amount: 2900,
            recurring: { interval: "month" },
          },
        },
      ],
      success_url: `${ALLOWED_ORIGIN}/dashboard?welcome=true`,
      cancel_url: `${ALLOWED_ORIGIN}/pricing`,
      metadata: {
        type: "membership",
        plan: "monthly",
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
});

// POST /api/checkout/job-post
const BASE_PRICE = 299;
const ADDON_PRICES: Record<string, number> = {
  show_logo: 49,
  highlight: 49,
  sticky_day: 99,
  sticky_week: 199,
  sticky_month: 597,
  email_blast: 99,
};

function calculateTotal(addons: any) {
  let total = BASE_PRICE;
  if (!addons || typeof addons !== "object") return total * 100;
  for (const [key, active] of Object.entries(addons)) {
    if (active && ADDON_PRICES[key]) {
      total += ADDON_PRICES[key];
    }
  }
  return total * 100;
}

function buildProductName(addons: any) {
  const parts = ["BEN Jobs Listing"];
  if (addons?.sticky_month) parts.push("+ Pinned 30d");
  else if (addons?.sticky_week) parts.push("+ Pinned 7d");
  else if (addons?.sticky_day) parts.push("+ Pinned 24h");
  if (addons?.highlight) parts.push("+ Highlighted");
  if (addons?.show_logo) parts.push("+ Logo");
  if (addons?.email_blast) parts.push("+ Email Blast");
  return parts.join(" ") + " (Monthly)";
}

router.post("/job-post", async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16" as any,
  });

  const payload = getUserFromRequest(req);
  if (!payload) {
    return res.status(401).json({ error: "Authentication required" });
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
              description:
                "Your job listing stays active as long as the subscription is active. Cancel anytime.",
            },
            unit_amount: unitAmount,
          },
        },
      ],
      success_url: `${ALLOWED_ORIGIN}/jobs?posted=true`,
      cancel_url: `${ALLOWED_ORIGIN}/post-job`,
      customer_email: payload.email,
      metadata: {
        type: "job_post",
        job_id: String(job_id),
        user_id: payload.id,
        addons: JSON.stringify(addons || {}),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: "Payment processing error. Please try again." });
  }
});

export default router;
