export const SHIPPING_COST = 29.95;
export const INSURANCE_COST = 6.95;

interface PaymentOption {
  value: string;
  imageSrc: string;
  alt: string;
  css: string;
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    value: 'PayPal',
    imageSrc: '/images/checkout/paypal.png',
    alt: 'PayPal',
    css: 'object-contain p-1',
  },
  {
    value: 'Venmo',
    imageSrc: '/images/checkout/venmo.png',
    alt: 'Venmo',
    css: 'object-contain p-1',
  },
  {
    value: 'CashApp',
    imageSrc: '/images/checkout/cashapp.png',
    alt: 'Cash App',
    css: 'object-contain p-1',
  },
  {
    value: 'Bitcoin',
    imageSrc: '/images/checkout/bitcoin.png',
    alt: 'Bitcoin',
    css: 'object-contain p-1',
  },
];
