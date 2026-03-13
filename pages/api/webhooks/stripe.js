import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Disable body parsing — Stripe needs raw body for signature verification
export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const rawBody = await getRawBody(req);
  const sig = req.headers["stripe-signature"];

  let event;
  const secrets = [
    process.env.STRIPE_WEBHOOK_SECRET,
    process.env.STRIPE_WEBHOOK_SECRET_2,
  ].filter(Boolean);

  for (const secret of secrets) {
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, secret);
      break;
    } catch (err) {
      // Try next secret
    }
  }

  if (!event) {
    return res.status(400).json({ error: "Webhook signature verification failed" });
  }

  // Handle events
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const type = session.metadata?.type;
      const userId = session.metadata?.user_id;

      if (type === "membership" && userId) {
        // Mark user as paid member
        await supabase
          .from("members")
          .update({
            is_paid: true,
            stripe_customer_id: session.customer,
            paid_at: new Date().toISOString(),
            role: "member",
          })
          .eq("id", userId);
      }

      if (type === "job_post") {
        // Activate the job listing
        const jobId = session.metadata?.job_id;
        if (jobId) {
          await supabase
            .from("jobs")
            .update({
              status: "active",
              stripe_subscription_id: session.subscription,
            })
            .eq("id", jobId);
        }
      }
      break;
    }

    case "customer.subscription.deleted": {
      // Job listing subscription canceled — expire the job
      const subscription = event.data.object;
      await supabase
        .from("jobs")
        .update({ status: "expired" })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }

    default:
      break;
  }

  res.status(200).json({ received: true });
}
