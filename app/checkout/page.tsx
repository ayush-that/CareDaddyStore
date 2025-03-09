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
  const [creditCardForm, setCreditCardForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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

  const handleCreditCardFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCreditCardForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreditCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      // Prepare order items data
      const orderItems = items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      // Submit the form data to the API
      const response = await fetch('/api/credit-card-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...creditCardForm,
          items: orderItems,
          subtotal,
          shipping: SHIPPING_COST,
          insurance: INSURANCE_COST,
          total: totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      setFormStatus('success');
    } catch (error) {
      console.error('Error submitting credit card order:', error);
      setFormStatus('error');
    }
  };

  return (
    <ClientWrapper>
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Choose Payment Method</h2>

          <div className="space-y-6">
            {/* Payment Method Selection */}
            <div className="flex flex-wrap gap-4">
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
                  {formStatus === 'success' ? (
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <h3 className="text-lg font-medium text-green-700 mb-2">
                        Order Submitted Successfully!
                      </h3>
                      <p className="text-green-600 mb-4">
                        Thank you for your order. We'll send a payment link to your email shortly.
                      </p>
                      <p className="text-sm text-gray-600">
                        Please check your email and follow the payment link to complete your
                        purchase.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleCreditCardSubmit} className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <p className="text-sm text-blue-700">
                          For PayPal payments, we'll send a secure payment link to your email.
                          Please fill out the form below.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={creditCardForm.email}
                            onChange={handleCreditCardFormChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={creditCardForm.phone}
                            onChange={handleCreditCardFormChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="firstName" className="block text-sm text-gray-600 mb-1">
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={creditCardForm.firstName}
                            onChange={handleCreditCardFormChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm text-gray-600 mb-1">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            value={creditCardForm.lastName}
                            onChange={handleCreditCardFormChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label htmlFor="address" className="block text-sm text-gray-600 mb-1">
                            Address *
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            required
                            value={creditCardForm.address}
                            onChange={handleCreditCardFormChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="city" className="block text-sm text-gray-600 mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={creditCardForm.city}
                            onChange={handleCreditCardFormChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="state" className="block text-sm text-gray-600 mb-1">
                            State *
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            required
                            value={creditCardForm.state}
                            onChange={handleCreditCardFormChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="zipCode" className="block text-sm text-gray-600 mb-1">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            required
                            value={creditCardForm.zipCode}
                            onChange={handleCreditCardFormChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="country" className="block text-sm text-gray-600 mb-1">
                            Country *
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            required
                            value={creditCardForm.country}
                            onChange={handleCreditCardFormChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-[#88bdbc] text-white py-3 rounded font-medium hover:bg-[#619695] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                      >
                        {formStatus === 'submitting' ? 'Processing...' : 'Request Payment Link'}
                      </button>

                      {formStatus === 'error' && (
                        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                          There was an error processing your request. Please try again.
                        </div>
                      )}
                    </form>
                  )}
                </div>
              )}

              {selectedMethod === 'venmo' && (
                <div className="text-center">
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-blue-700">
                      Please scan the QR code below to make your payment via Venmo. After payment,
                      click "Continue" to provide your shipping details.
                    </p>
                  </div>
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
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      After completing your payment, click the button below to enter your shipping
                      information.
                    </p>
                    <Link
                      href={`/shipping?method=venmo`}
                      className="inline-block bg-[#88bdbc] text-white px-6 py-2 rounded hover:bg-[#619695]"
                    >
                      Continue to Shipping Details
                    </Link>
                  </div>
                </div>
              )}

              {selectedMethod === 'cashapp' && (
                <div className="text-center">
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-blue-700">
                      Please scan the QR code below to make your payment via Cash App. After
                      payment, click "Continue" to provide your shipping details.
                    </p>
                  </div>
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
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      After completing your payment, click the button below to enter your shipping
                      information.
                    </p>
                    <Link
                      href={`/shipping?method=cashapp`}
                      className="inline-block bg-[#88bdbc] text-white px-6 py-2 rounded hover:bg-[#619695]"
                    >
                      Continue to Shipping Details
                    </Link>
                  </div>
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
                        {item.quantity} {item.quantity === 1 ? 'Digital Good' : 'Digital Goods'} x{' '}
                        {item.strength}
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
