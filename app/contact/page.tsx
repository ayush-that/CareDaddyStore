"use client";

import { ClientWrapper } from "@/components/ui/client-wrapper";

export default function ContactPage() {
  return (
    <ClientWrapper>
      <div className="p-6 space-y-6">
        <section>
          <h1 className="text-[#00bcd4] text-2xl font-normal mb-4">
            Contact Us
          </h1>

          <div className="text-[#7a7a7a] space-y-4 mb-6">
            <p>
              Our customer support service work 7 days a week, 24 hours a day.
              Please, feel free to contact us in case you have any question,
              request or comment. Specify your name and e-mail address so we
              could respond to your inquiry.
            </p>
            <p>Have is an Affiliate Program. Write who has traf!</p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-[#7a7a7a] mb-2"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
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
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[#7a7a7a] mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full p-2 border border-gray-300 rounded resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#ff7675] text-white px-8 py-2 rounded hover:bg-[#ff6b6b] transition-colors"
            >
              Send
            </button>
          </form>
        </section>
      </div>
    </ClientWrapper>
  );
}
