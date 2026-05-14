import Session from '../models/Session.js';
import { createPaymentIntent, constructWebhookEvent } from '../services/stripe.service.js';
import { success, fail } from '../utils/response.js';

export const initiatePayment = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return fail(res, 'Session not found', 404);
    if (session.userId.toString() !== req.user.id) return fail(res, 'Forbidden', 403);
    if (session.paymentStatus === 'PAID') return fail(res, 'Session already paid', 400);

    const { clientSecret, paymentIntentId } = await createPaymentIntent(session.price, session._id);
    session.paymentIntentId = paymentIntentId;
    await session.save();

    success(res, { clientSecret });
  } catch (err) { next(err); }
};

export const handleWebhook = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = constructWebhookEvent(req.body, sig);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object;
    await Session.findOneAndUpdate(
      { paymentIntentId: intent.id },
      { paymentStatus: 'PAID', status: 'CONFIRMED' }
    );
  }

  res.json({ received: true });
};
