export const calculateFees = (sessionPrice) => {
  const COMMISSION_RATE = 0.25; // 25% comission (includes Stripe fees)
  const platformFee = sessionPrice * COMMISSION_RATE;
  const trainerPayout = sessionPrice - platformFee;

  return {
    sessionPrice,
    platformFee,
    trainerPayout
  };
};

// In the future, here goes Stripe integration (Payment Intents, Webhooks)
export const createPaymentIntent = async (amount, currency = 'eur') => {
  // Mock function for now
  return {
    clientSecret: 'mock_client_secret',
    amount,
    currency
  };
};
