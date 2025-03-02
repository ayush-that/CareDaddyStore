'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const paypalOptions = {
  clientId: 'AVYgTgdKo4nsx0a_DUG472pAdXDJkWlC7eq3zD5k0oE4tRTZOeQu69cEY9CUP2qEClKedznI70_58Mpk',
  currency: 'USD',
  intent: 'capture',
};

export function PayPalProvider({ children }: { children: React.ReactNode }) {
  return <PayPalScriptProvider options={paypalOptions}>{children}</PayPalScriptProvider>;
}
