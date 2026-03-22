import { Router } from "express";
import Stripe from "stripe";

const router = Router();

const currency = "usd";
const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "https://www.blockchainedu.org";
const MIN_AMOUNT = 1;
const MAX_AMOUNT = 100000;

const rateLimitMap = new Map<string, { start: number; count: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    if (rateLimitMap.size > 1000) {
      for (const [key, val] of rateLimitMap) {
        if (now - val.start > RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(key);
      }
    }
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

function formatAmountForStripe(amount: number, curr: string) {
  const numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: curr,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (const part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

function getExtraParams(amount: { amount: number; frequency: string }) {
  const success_url = `${ALLOWED_ORIGIN}/donate?success=true&session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${ALLOWED_ORIGIN}/donate`;

  if (amount.frequency === "monthly") {
    return {
      mode: "subscription",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            product_data: { name: "Monthly Donation to BEN" },
            unit_amount_decimal: formatAmountForStripe(amount.amount, currency),
            recurring: { interval: "month" },
          },
        },
      ],
      success_url,
      cancel_url,
    };
  }

  return {
    mode: "payment",
    submit_type: "donate",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          product_data: { name: "Donation to BEN" },
          unit_amount: formatAmountForStripe(amount.amount, currency),
        },
      },
    ],
    success_url,
    cancel_url,
  };
}

// POST /api/checkout_sessions
router.post("/", async (req, res) => {
  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip))
    return res.status(429).json({ error: "Too many requests" });

  const rawAmount = req.body?.amount;
  if (!rawAmount || typeof rawAmount !== "object")
    return res.status(400).json({ error: "Invalid request body" });

  const numericAmount = Number(rawAmount.amount);
  if (
    !Number.isFinite(numericAmount) ||
    numericAmount < MIN_AMOUNT ||
    numericAmount > MAX_AMOUNT
  ) {
    return res.status(400).json({
      error: `Amount must be between $${MIN_AMOUNT} and $${MAX_AMOUNT.toLocaleString()}`,
    });
  }

  const frequency = rawAmount.frequency;
  if (frequency !== "monthly" && frequency !== "one time")
    return res.status(400).json({ error: "Invalid frequency" });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16" as any,
  });

  try {
    const params = getExtraParams({ amount: numericAmount, frequency });
    const checkoutSession = await stripe.checkout.sessions.create(params as any);
    res.status(200).json(checkoutSession);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Payment processing error. Please try again." });
  }
});

export default router;
