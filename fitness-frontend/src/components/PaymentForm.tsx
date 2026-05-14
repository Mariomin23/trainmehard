'use client';
import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock } from 'lucide-react';

interface Props {
  sessionId: string;
  amount: number;
  onSuccess: () => void;
}

export default function PaymentForm({ amount, onSuccess }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError('');

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard?payment=success`,
      },
      redirect: 'if_required',
    });

    if (stripeError) {
      setError(stripeError.message || 'Error al procesar el pago');
      setProcessing(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700 font-medium">
        Modo sandbox — usa la tarjeta <span className="font-mono">4242 4242 4242 4242</span>
      </div>

      <PaymentElement />

      {error && (
        <p className="text-sm text-red-500 bg-red-50 p-3 rounded-xl">{error}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Lock size={14} />
        {processing ? 'Procesando...' : `Pagar ${amount}€`}
      </button>

      <p className="text-center text-xs text-gray-400">
        Pago seguro con Stripe · SSL
      </p>
    </form>
  );
}
