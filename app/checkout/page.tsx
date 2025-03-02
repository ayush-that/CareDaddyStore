'use client';

import { ClientWrapper } from '@/components/ui/client-wrapper';
import { useCart } from '@/lib/context/cart-context';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js';
import Link from 'next/link';

import { SHIPPING_COST, INSURANCE_COST } from '@/config/checkout';

export default function CheckoutPage() {
  const { items, total } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAmount = subtotal + SHIPPING_COST + INSURANCE_COST;
  const [{ isResolved }] = usePayPalScriptReducer();
  const [selectedMethod, setSelectedMethod] = useState<'paypal' | 'venmo' | 'cashapp'>('paypal');
  const [paymentMethods, setPaymentMethods] = useState<any>(null);

  useEffect(() => {
    // Fetch payment QR codes from API
    fetch('/api/payment-methods')
      .then(res => res.json())
      .then(data => {
        console.log('Payment Methods Response:', data);
        setPaymentMethods(data);
      })
      .catch(err => console.error('Error fetching payment methods:', err));
  }, []);

  const handlePaypalCreateOrder = async (data: CreateOrderData, actions: CreateOrderActions) => {
    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            value: totalAmount.toString(),
            currency_code: 'USD',
          },
          description: `Order from CareCaddy Store - ${items.length} items`,
        },
      ],
    });
  };

  const handlePaypalApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    try {
      const details = await actions.order?.capture();
      if (!details) {
        throw new Error('Failed to capture order');
      }

      // Redirect to shipping form with payment details
      window.location.href = `/shipping?orderId=${details.id}&method=paypal`;
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <ClientWrapper>
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Choose Payment Method</h2>

          <div className="space-y-6">
            {/* Payment Method Selection */}
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedMethod('paypal')}
                className={`flex-1 border rounded-lg ${
                  selectedMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <Image
                  src="/images/checkout/paypal.png"
                  alt="PayPal"
                  width={100}
                  height={40}
                  className="mx-auto h-14 w-auto"
                />
              </button>
              <button
                onClick={() => setSelectedMethod('venmo')}
                className={`border flex-1 rounded-lg ${
                  selectedMethod === 'venmo' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <Image
                  src="/images/checkout/venmo.png"
                  alt="Venmo"
                  width={100}
                  height={40}
                  className="mx-auto h-14 w-auto"
                />
              </button>
              <button
                onClick={() => setSelectedMethod('cashapp')}
                className={`flex-1 p-4 border rounded-lg ${
                  selectedMethod === 'cashapp' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <Image
                  src="/images/checkout/cashapp.png"
                  alt="Cash App"
                  width={100}
                  height={40}
                  className="mx-auto h-14 w-auto"
                />
              </button>
            </div>

            {/* Payment Method Content */}
            <div className="mt-6">
              {selectedMethod === 'paypal' && (
                <div>
                  {isResolved ? (
                    <PayPalButtons
                      createOrder={handlePaypalCreateOrder}
                      onApprove={handlePaypalApprove}
                      style={{ layout: 'vertical' }}
                    />
                  ) : (
                    <div className="text-center p-4">Loading PayPal...</div>
                  )}
                </div>
              )}

              {selectedMethod === 'venmo' && (
                <div className="text-center">
                  <div className="mb-4">
                    <div className="relative w-[300px] h-[300px] mx-auto">
                      <Image
                        src={paymentMethods?.venmo?.qrCode || '/images/qr/venmo-qr.png'}
                        alt="Venmo QR Code"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  <Link
                    href={`/shipping?method=venmo`}
                    className="inline-block bg-[#88bdbc] text-white px-6 py-2 rounded hover:bg-[#619695]"
                  >
                    Continue to Shipping Details
                  </Link>
                </div>
              )}

              {selectedMethod === 'cashapp' && (
                <div className="text-center">
                  <div className="mb-4">
                    <div className="relative w-[300px] h-[300px] mx-auto">
                      <Image
                        src={paymentMethods?.cashapp?.qrCode || '/images/qr/cashapp-qr.png'}
                        alt="Cash App QR Code"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  <Link
                    href={`/shipping?method=cashapp`}
                    className="inline-block bg-[#88bdbc] text-white px-6 py-2 rounded hover:bg-[#619695]"
                  >
                    Continue to Shipping Details
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-medium mb-4">Order Summary</h3>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <div className="w-12 h-12 relative bg-white rounded overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} {item.quantity === 1 ? 'Pill' : 'Pills'} x {item.strength}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${SHIPPING_COST.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Insurance</span>
                  <span>${INSURANCE_COST.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientWrapper>
  );
}
