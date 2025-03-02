'use client';

import { ClientWrapper } from '@/components/ui/client-wrapper';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Country, State } from 'country-state-city';

export default function ShippingPage() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get('method');
  const orderId = searchParams.get('orderId');

  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState(State.getStatesOfCountry(''));
  const [status, setStatus] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    address: '',
    phone: '',
    email: '',
    paymentProof: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    if (id === 'country') {
      setStates(State.getStatesOfCountry(value));
      setFormData(prev => ({ ...prev, state: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, paymentProof: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('processing');

    // Create FormData for file upload
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value);
      }
    });
    data.append('paymentMethod', paymentMethod || '');
    if (orderId) {
      data.append('orderId', orderId);
    }

    try {
      // TODO: Replace with your EspoCRM API endpoint
      const response = await fetch('/api/shipping', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to submit shipping details');
      }

      setStatus('success');
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus('error');
    }
  };

  return (
    <ClientWrapper>
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Shipping Details</h2>

          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
              Thank you! Your shipping details have been submitted.
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
              Failed to submit shipping details. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm text-gray-600 mb-1">
                  First name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm text-gray-600 mb-1">
                  Last name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm text-gray-600 mb-1">
                  Country *
                </label>
                <select
                  id="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="state" className="block text-sm text-gray-600 mb-1">
                  State / Province *
                </label>
                <select
                  id="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!formData.country}
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="city" className="block text-sm text-gray-600 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm text-gray-600 mb-1">
                  ZIP/Postal code *
                </label>
                <input
                  type="text"
                  id="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
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
                  required
                  value={formData.address}
                  onChange={handleChange}
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
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Payment Proof Upload */}
            {paymentMethod !== 'paypal' && (
              <div>
                <label htmlFor="paymentProof" className="block text-sm text-gray-600 mb-1">
                  Payment Proof *
                </label>
                <input
                  type="file"
                  id="paymentProof"
                  required
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Please upload a screenshot of your payment confirmation
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'processing'}
              className="w-full bg-[#88bdbc] text-white py-3 rounded font-medium hover:bg-[#619695] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'processing' ? 'Processing...' : 'Submit Shipping Details'}
            </button>
          </form>
        </div>
      </div>
    </ClientWrapper>
  );
}
