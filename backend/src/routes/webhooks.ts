import { Router, raw } from "express";
import Stripe from "stripe";
import { db } from "../db";
import { member as memberTable, job as jobTable } from "../db/schema";
import { eq } from "drizzle-orm";

const router = Router();

// POST /api/webhooks/stripe
// Uses raw body parser for Stripe signature verification
router.post("/stripe", raw({ type: "application/json" }), async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16" as any,
  });

  const rawBody = req.body;
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event | undefined;
  const secrets = [
    process.env.STRIPE_WEBHOOK_SECRET,
    process.env.STRIPE_WEBHOOK_SECRET_2,
  ].filter(Boolean);

  for (const secret of secrets) {
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, secret!);
      break;
    } catch (err) {
      // Try next secret
    }
  }

  if (!event) {
    return res
      .status(400)
      .json({ error: "Webhook signature verification failed" });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as any;
      const type = session.metadata?.type;
      const userId = session.metadata?.user_id;

      if (type === "membership" && userId) {
        await db
          .update(memberTable)
          .set({
            is_paid: true,
            stripe_customer_id: session.customer,
            paid_at: new Date(),
            role: "member",
          })
          .where(eq(memberTable.id, userId));
      }

      if (type === "job_post") {
        const jobId = session.metadata?.job_id;
        if (jobId) {
          await db
            .update(jobTable)
            .set({
              status: "active",
              stripe_subscription_id: session.subscription,
            })
            .where(eq(jobTable.id, jobId));
        }
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as any;
      await db
        .update(jobTable)
        .set({ status: "expired" })
        .where(eq(jobTable.stripe_subscription_id, subscription.id));
      break;
    }

    default:
      break;
  }

  res.status(200).json({ received: true });
});

export default router;
