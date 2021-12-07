import { formatAmountForStripe } from '../../../utils/stripe-helpers';
import { giftFrequency } from "../../../components/modals/donateModal";

import Stripe from 'stripe';

const currency = 'usd';

function getExtraParams(origin, amount) {
  const success_url = `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${origin}/`;
  if (amount.frequency === giftFrequency.monthly) {
    return {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            product_data: {
              name: 'Monthly donation',
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
  return {
    submit_type: 'donate',
    payment_method_types: ['card'],
    line_items: [
      {
          name: 'Custom amount donation',
          amount: formatAmountForStripe(amount.amount, currency),
          currency: currency,
        quantity: 1,
      },
    ],
    success_url,
    cancel_url,
  };
}

export default async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-03-02',
  });
  if (req.method === 'POST') {
    try {
      const amount = req.body.amount;
      // Create Checkout Sessions from body params.
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
