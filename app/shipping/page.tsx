'use client';

import { ClientWrapper } from '@/components/ui/client-wrapper';
import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Country, State } from 'country-state-city';
import { useCart } from '@/lib/context/cart-context';
import { UploadButton } from '../utils/uploadthing';

interface UploadResponse {
  name: string;
  size: number;
  type: string;
  serverData: {
    uploadedBy: string;
    fileUrl: string;
  };
}

function ShippingForm() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get('method');
  const items = searchParams.get('items');

  const { items: cartItems, total: cartTotal } = useCart();

  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState(State.getStatesOfCountry(''));
  const [status, setStatus] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

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
    paymentProof: null as UploadResponse | null,
    notes: '',
    items: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    if (id === 'country') {
      setStates(State.getStatesOfCountry(value));
      setFormData(prev => ({ ...prev, state: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('processing');

    console.log('Cart items from context:', cartItems);
    console.log('Cart total from context:', cartTotal);

    try {
      let orderItems = '';
      try {
        if (items) {
          const parsedItems = JSON.parse(decodeURIComponent(items));
          orderItems = parsedItems
            .map((item: any) => `- ${item.name} (Quantity: ${item.quantity})`)
            .join('\n');
          setFormData(prev => ({ ...prev, items: orderItems }));
        }
      } catch (e) {
        console.error('Error parsing items from URL:', e);
      }

      if ((!orderItems || orderItems === '') && cartItems.length > 0) {
        orderItems = cartItems
          .map(
            item => `- ${item.name} (Quantity: ${item.quantity}, Price: $${item.price.toFixed(2)})`
          )
          .join('\n');
        setFormData(prev => ({ ...prev, items: orderItems }));
      }

      if (!orderItems || orderItems === '') {
        orderItems = 'No items specified';
      }

      const countryName =
        countries.find(c => c.isoCode === formData.country)?.name || formData.country;
      const stateName = states.find(s => s.isoCode === formData.state)?.name || formData.state;
      const customerName = `${formData.firstName} ${formData.lastName}`;

      const orderDescription = `
Order Details:
- Customer: ${customerName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Address: ${formData.address}, ${formData.city}, ${stateName}, ${countryName}, ${formData.zipCode}
${formData.notes ? '- Notes: ' + formData.notes : ''}
${uploadedFileUrl ? '- Payment Proof: ' + uploadedFileUrl : ''}

Ordered Items:
${orderItems}`;

      const orderTotal = searchParams.get('amount') || (cartTotal > 0 ? cartTotal.toFixed(2) : '');

      function formatPhoneForEspo(phone: string): string {
        if (!phone) return '';
        if (phone.includes('-') || phone.includes('+')) return phone;

        const digits = phone.replace(/\D/g, '');

        if (digits.length === 10) {
          return `+1-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
        }

        return `+1-${digits}`;
      }

      const leadData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.email,
        phoneNumber: formatPhoneForEspo(formData.phone),
        addressStreet: formData.address,
        addressCity: formData.city,
        addressState: stateName,
        addressCountry: countryName,
        addressPostalCode: formData.zipCode,
        description: orderDescription,
        source: 'Web Site',
        status: 'New',
        campaign: 'CareDaddyStore',
      };

      let espoResult: { success: boolean; error?: string; warning?: string; data?: any } = {
        success: false,
      };

      try {
        console.log('Submitting to CRM:', JSON.stringify(leadData, null, 2));
        console.log('Using Lead Capture API directly (successful method from curl test)');

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://139.59.23.17/api/v1';
        const LEAD_CAPTURE_ID =
          process.env.NEXT_PUBLIC_ESPOCRM_LEAD_CAPTURE_ID || 'd6e603dda729de3fb3c8c13560b7e8cb';

        const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
        const ESPO_API_URL = `${baseUrl}/LeadCapture/${LEAD_CAPTURE_ID}`;

        console.log('Sending directly to:', ESPO_API_URL);

        const espoResponse = await fetch(ESPO_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(leadData),
        });

        console.log('EspoCRM API response status:', espoResponse.status, espoResponse.statusText);
        console.log('Request payload:', JSON.stringify(leadData, null, 2));

        const rawResponse = await espoResponse.text();
        console.log('Raw EspoCRM API response:', rawResponse);

        try {
          const jsonResponse = JSON.parse(rawResponse);
          console.log('Parsed EspoCRM response:', jsonResponse);
        } catch (e) {
          console.log('Response is not JSON:', rawResponse);
        }

        if (espoResponse.ok && rawResponse.trim() === 'true') {
          console.log('Lead successfully created in EspoCRM (direct API method)');
          espoResult = { success: true };
        } else {
          try {
            if (rawResponse && rawResponse.trim()) {
              espoResult = JSON.parse(rawResponse);
            } else {
              espoResult = { success: false, error: 'Empty response' };
            }
          } catch (jsonError) {
            console.error('Error parsing EspoCRM response:', jsonError);
            espoResult = { success: false, error: 'Failed to parse response' };
          }
        }

        console.log('Parsed EspoCRM response:', espoResult);

        if (!espoResult.success) {
          console.error('Error from CRM API:', espoResult);
        } else {
          console.log('CRM submission successful', espoResult);
        }
      } catch (espoError) {
        console.error('Error submitting to CRM:', espoError);
      }

      const formatOrderItemsForEmail = (itemsStr: string): string => {
        if (!itemsStr) return 'No items specified';

        if (itemsStr.includes('\n')) return itemsStr;

        try {
          if (itemsStr.startsWith('[') && itemsStr.includes('"name"')) {
            const items = JSON.parse(itemsStr);
            return items
              .map((item: any) => `- ${item.name} (Quantity: ${item.quantity})`)
              .join('\n');
          }
        } catch (e) {}

        return itemsStr;
      };

      const emailData = {
        name: customerName,
        email: formData.email,
        subject: 'New Shipping Form Submission',
        message: `
New shipping form submission from ${customerName}

Contact Details:
- Email: ${formData.email}
- Phone: ${formData.phone}

Shipping Address:
${formData.address}
${formData.city}, ${stateName} ${formData.zipCode}
${countryName}

${searchParams.get('orderId') ? 'Order ID: ' + searchParams.get('orderId') : ''}
${orderTotal ? 'Order Total: $' + orderTotal : ''}
${formData.notes ? 'Notes: ' + formData.notes : ''}
${uploadedFileUrl ? 'Payment Proof: ' + uploadedFileUrl : ''}

Ordered Items:
${formatOrderItemsForEmail(orderItems)}`,
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
      };

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        const result = await response.json();

        if (result.success) {
          console.log('Form submission successful');

          if (espoResult && espoResult.success) {
            console.log('Both services received the data successfully');
          } else {
            console.log('Web3forms submission successful, but EspoCRM submission failed');
          }

          setStatus('success');
          setFormData({
            firstName: '',
            lastName: '',
            country: '',
            state: '',
            city: '',
            zipCode: '',
            address: '',
            phone: '',
            email: '',
            paymentProof: null,
            notes: '',
            items: '',
          });
          setUploadedFileUrl(null);
        } else {
          console.error('Web3forms submission failed:', result);

          if (espoResult && espoResult.success) {
            console.log('EspoCRM submission was successful, continuing with success');
            setStatus('success');
            setFormData({
              firstName: '',
              lastName: '',
              country: '',
              state: '',
              city: '',
              zipCode: '',
              address: '',
              phone: '',
              email: '',
              paymentProof: null,
              notes: '',
              items: '',
            });
            setUploadedFileUrl(null);
          } else {
            console.error('Both services failed to receive the data');
            setStatus('error');
          }
        }
      } catch (error) {
        console.error('Submission error:', error);

        if (espoResult && espoResult.success) {
          console.log('EspoCRM submission was successful, continuing with success');
          setStatus('success');
          setFormData({
            firstName: '',
            lastName: '',
            country: '',
            state: '',
            city: '',
            zipCode: '',
            address: '',
            phone: '',
            email: '',
            paymentProof: null,
            notes: '',
            items: '',
          });
          setUploadedFileUrl(null);
        } else {
          setStatus('error');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Shipping Details</h2>

        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded">
            Thank you! Your shipping details have been submitted successfully.
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
            Failed to submit shipping details. Please check your information and try again. If the
            problem persists, please contact support with the error details from your browser
            console (F12).
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm text-gray-600 mb-1">
                First name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
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

          {paymentMethod !== 'paypal' && (
            <div>
              <label className="block text-sm text-gray-600 mb-1">Payment Proof *</label>
              <UploadButton
                endpoint="paymentProofUploader"
                onClientUploadComplete={res => {
                  if (res && res[0]) {
                    setUploadedFileUrl(res[0].serverData.fileUrl);
                    setFormData(prev => ({ ...prev, paymentProof: res[0] }));
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error('Upload error:', error);
                  setStatus('error');
                }}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {uploadedFileUrl && (
                <p className="mt-1 text-sm text-green-600">File uploaded successfully!</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Please upload your payment confirmation (Image or PDF, max 4MB)
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'processing' || (paymentMethod !== 'paypal' && !uploadedFileUrl)}
            className="w-full bg-[#88bdbc] text-white py-3 rounded font-medium hover:bg-[#619695] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'processing' ? 'Processing...' : 'Submit Shipping Details'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ShippingPage() {
  return (
    <ClientWrapper>
      <div className="w-full bg-gray-50 py-10">
        <Suspense
          fallback={
            <div className="max-w-2xl mx-auto p-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <ShippingForm />
        </Suspense>
      </div>
    </ClientWrapper>
  );
}
