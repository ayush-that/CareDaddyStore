'use client';

import { ClientWrapper } from '@/components/ui/client-wrapper';

export default function AboutPage() {
  return (
    <ClientWrapper>
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <section>
          <h1 className="text-[#00bcd4] text-2xl font-normal mb-4">Welcome to CareCaddy Store</h1>
          <p className="text-[#7a7a7a] italic mb-6">
            — where your health and happiness come first!
          </p>

          <div className="text-[#7a7a7a] space-y-4">
            <p>
              We are here to ensure that you and your loved ones stay healthy, active, and full of
              energy. Shop with ease for a healthier lifestyle, safe and convenient!
            </p>

            <p>
              Our mission is to help individuals access premium-quality generic and brand-name
              medications from trusted, globally recognized suppliers. Good health is not a
              luxury—it's the result of dedicated professionals and cutting-edge research, and we're
              here to deliver that to you.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section>
          <h2 className="text-[#00bcd4] text-xl font-normal mb-4">
            At CareCaddy Store, you can count on:
          </h2>

          <div className="text-[#7a7a7a] space-y-6">
            <div>
              <h3 className="font-medium mb-2">Safe and Superior Products</h3>
              <p>
                We partner only with reputable suppliers and provide thoroughly tested medications.
                All our products come with proper documentation and certifications to ensure the
                highest standards of quality. From world-renowned pharmaceutical institutions to
                your doorstep, we deliver the best for your well-being.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Fast and Reliable Service</h3>
              <p>
                Shopping at CareCaddy Store is quick and hassle-free. Place your order on our
                website and leave the rest to us! With fast shipping, 24/7 customer support, and
                secure payments, we make sure your experience is seamless and stress-free.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Complete Confidentiality</h3>
              <p>
                Your privacy is our priority. We guarantee total anonymity and the safety of your
                personal and financial information. Every order is discreetly packaged as a gift,
                ensuring no one else knows what's inside. We're committed to protecting your
                secrets!
              </p>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="text-[#7a7a7a] space-y-4">
          <p>
            Take a step back and let CareCaddy Store take care of your health and happiness. Shop
            with confidence, comfort, and complete peace of mind. Let's get started!
          </p>

          <p className="italic">
            P.S. Have questions? Click "Callback" anytime, even if it's 3 AM—we're always here to
            help!
          </p>
        </section>
      </div>
    </ClientWrapper>
  );
}
