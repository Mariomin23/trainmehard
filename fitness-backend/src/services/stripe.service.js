import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripeEnabled = stripeKey && !stripeKey.includes('your_stripe_key');
const stripe = stripeEnabled ? new Stripe(stripeKey) : null;

const COMMISSION_RATE = 0.50;

export const calculateFees = (sessionPrice) => {
  const platformFee = +(sessionPrice * COMMISSION_RATE).toFixed(2);
  const trainerPayout = +(sessionPrice - platformFee).toFixed(2);
  return { sessionPrice, platformFee, trainerPayout };
};

export const createPaymentIntent = async (amountEur, sessionId) => {
  if (!stripeEnabled) throw new Error('Stripe not configured. Set STRIPE_SECRET_KEY in .env');
  const amountCents = Math.round(amountEur * 100);

  const intent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: 'eur',
    metadata: { sessionId: sessionId.toString() },
    automatic_payment_methods: { enabled: true },
  });

  return {
    clientSecret: intent.client_secret,
    paymentIntentId: intent.id,
    amount: amountEur,
  };
};

export const constructWebhookEvent = (payload, signature) => {
  if (!stripeEnabled) throw new Error('Stripe not configured. Set STRIPE_SECRET_KEY in .env');
  return stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
};
