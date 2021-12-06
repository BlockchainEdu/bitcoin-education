import { NextApiRequest, NextApiResponse } from 'next'
import { formatAmountForStripe } from '../../../utils/stripe-helpers';

import Stripe from 'stripe';

const currency = 'usd';

export default async function handler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-03-02',
  });
  if (req.method === 'POST') {
    const amount = req.body.amount.amount;
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: 'donate',
        payment_method_types: ['card'],
        line_items: [
          {
            name: 'Custom amount donation',
            amount: formatAmountForStripe(amount, currency),
            currency: currency,
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
      };
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
