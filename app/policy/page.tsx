"use client";

import { ClientWrapper } from "@/components/ui/client-wrapper";

export default function PolicyPage() {
  return (
    <ClientWrapper>
      <div className="p-6 space-y-8">
        {/* Shipping Policy */}
        <section>
          <h2 className="text-[#00bcd4] text-xl font-normal mb-4">
            Shipping policy
          </h2>
          <div className="text-[#7a7a7a] space-y-4">
            <p>
              We send parcels to your local PO where postmen deliver them to the
              address you indicated in your order list. If you are not at home
              at the moment of delivery, a postman leaves a special notice.
            </p>

            <div className="space-y-2">
              <p>Available shipping methods:</p>
              <ul className="space-y-4 list-none pl-4">
                <li>
                  <strong>AirMail</strong> - Actual delivery time may vary, and
                  it may take up to 2-3 weeks for Air Mail. Online Tracking is
                  not available. Free AirMail shipping available for orders over
                  $200
                </li>
                <li>
                  <strong>EMS</strong> - Express Mail Service (EMS) is the
                  fastest service provided by post office. Tracking Number will
                  become available when your order is shipped. The Approximate
                  delivery time 3-8 days. Free EMS shipping available for orders
                  over $200
                </li>
              </ul>
            </div>

            <p>
              You should also bear in mind some possible delays at customs we
              are not responsible for. Therefore, why some parcels may arrive a
              bit later or earlier than expected.
            </p>

            <p>
              The orders are usually processed within 24 hours. As soon as your
              order is registered, you receive an automatic e-mail message.
              Sometimes, such notifications get into spam folders. Look for a
              notification there if you have not received one. We make every
              effort to deliver your parcels in time.
            </p>

            <p>
              All the medications you can see on our site are usually on stock.
              If you have some problems with the delivery, we will try to solve
              it as soon as possible. Our Customer Care Specialists are at your
              disposal and ready to connect with you any moment.
            </p>
          </div>
        </section>

        {/* Return Policy */}
        <section>
          <h2 className="text-[#00bcd4] text-xl font-normal mb-4">
            Return policy
          </h2>
          <div className="text-[#7a7a7a] space-y-4">
            <p>
              If you received damaged or defective medication or the company
              shipped the incorrect product we will resend your order free of
              charge.
            </p>

            <p>
              The quality of our products is beyond exception, but if you are
              not satisfied with it, contact our Customer Care Specialists.
            </p>

            <p>
              In case that your pills are damaged, we will resend you a new
              package free of charge.
            </p>

            <p>
              Be informed that the return of medications is strictly prohibited
              by International rules.
            </p>
          </div>
        </section>

        {/* Privacy Policy */}
        <section>
          <h2 className="text-[#00bcd4] text-xl font-normal mb-4">
            Privacy policy
          </h2>
          <div className="text-[#7a7a7a] space-y-4">
            <div>
              <h3 className="font-medium mb-2">Use of cookies:</h3>
              <p>
                Cookies are short text files our Web server sends to your
                computer. They are used to fix such session information as the
                previous activity on a site or Web page content based on your
                browser type. This helps us provide better service for the
                customers when they return to our site, and imply an access to
                some specific sections on our site.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Collection of information:</h3>
              <p>
                Only our customers' domain names or IP addresses - but not
                e-mail addresses - are automatically recognized by our server.
                We never divulge your private information.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Contacting us:</h3>
              <p>
                Ask your questions in the section "Contact us". We are glad to
                solve any problem arisen.
              </p>
            </div>
          </div>
        </section>
      </div>
    </ClientWrapper>
  );
}
