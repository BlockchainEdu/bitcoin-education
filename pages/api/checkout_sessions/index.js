import { formatAmountForStripe } from '../../../utils/stripe-helpers';

import Stripe from 'stripe';

const currency = 'usd';

function getExtraParams(origin, amount) {
  const success_url = `${origin}/thank-you-donor?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${origin}/donate`;

  if (amount.frequency === 'monthly') {
    return {
      mode: 'subscription',
      // Omitting payment_method_types lets Stripe auto-enable Apple Pay, Google Pay, etc.
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            product_data: {
              name: 'Monthly Donation to BEN',
            },
            unit_amount_decimal: formatAmountForStripe(amount.amount, currency),
            recurring: {
              interval: 'month',
            },
          },
        },
      ],
      success_url,
      cancel_url,
    };
  }

  // One-time donation — modern format with price_data
  return {
    mode: 'payment',
    submit_type: 'donate',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          product_data: {
            name: 'Donation to BEN',
          },
          unit_amount: formatAmountForStripe(amount.amount, currency),
        },
      },
    ],
    success_url,
    cancel_url,
  };
}

export default async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });
  if (req.method === 'POST') {
    try {
      const amount = req.body.amount;
      const params = getExtraParams(req.headers.origin, amount);
      const checkoutSession =
            await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
