'use client';

import { ClientWrapper } from '@/components/ui/client-wrapper';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    orderId: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'c90e41df-71f6-438d-a957-dd005e2828d4',
          from_name: `${formData.firstName} ${formData.lastName}`,
          subject: formData.subject,
          message: `
            Order ID: ${formData.orderId}
            Email: ${formData.email}
            Message: ${formData.message}
          `,
          email_to: 'shopwe820@gmail.com',
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          orderId: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <ClientWrapper>
      <div className="p-6 space-y-6">
        <section>
          <h1 className="text-[#00bcd4] text-2xl font-normal mb-4">Contact Us</h1>

          <div className="text-[#7a7a7a] space-y-4 mb-6">
            <p>
              Our customer support service work 7 days a week, 24 hours a day. Please, feel free to
              contact us in case you have any question, request or comment. Specify your name and
              e-mail address so we could respond to your inquiry.
            </p>
          </div>

          {status === 'success' && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              Thank you for your message. We will get back to you soon!
            </div>
          )}

          {status === 'error' && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              Something went wrong. Please try again later.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-[#7a7a7a] mb-2">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-[#7a7a7a] mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label htmlFor="orderId" className="block text-[#7a7a7a] mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={formData.orderId}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#7a7a7a] mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-[#7a7a7a] mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[#7a7a7a] mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full p-2 border border-gray-300 rounded resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-[#ff7675] text-white px-8 py-2 rounded hover:bg-[#ff6b6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending...' : 'Send'}
            </button>
          </form>
        </section>
      </div>
    </ClientWrapper>
  );
}
