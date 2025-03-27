'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#f5f9fa] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Payment and Security Badges */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Image
              src="/images/footer/Visa_Inc._logo.svg"
              alt="Visa"
              width={51}
              height={16}
              className="h-4 w-auto"
              style={{ width: 'auto' }}
            />
            <Image
              src="/images/footer/mastercard-top.svg"
              alt="Mastercard"
              width={51}
              height={16}
              className="h-5 w-auto"
              style={{ width: 'auto' }}
            />
            <div className="h-8 border-l border-gray-300 mx-2"></div>
            <Image
              src="/images/footer/geotrust.webp"
              alt="GeoTrust Secured"
              width={114}
              height={31}
              className="h-5 w-auto"
              style={{ width: 'auto' }}
            />
            <Image
              src="/images/footer/visa-verified.svg"
              alt="Verified by Visa"
              width={57}
              height={31}
              className="h-5 w-auto"
              style={{ width: 'auto' }}
            />
            <Image
              src="/images/footer/ssl.svg"
              alt="SSL Secured"
              width={100}
              height={31}
              className="h-5 w-auto"
              style={{ width: 'auto' }}
            />
            <Image
              src="/images/footer/McAfee_logo_(2009-2016).png"
              alt="McAfee Secure"
              width={92}
              height={31}
              className="h-5 w-auto"
              style={{ width: 'auto' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left side - Logo */}
          <div className="flex justify-center md:justify-start">
            <Link href="/" className="inline-block">
              <Image
                src="/logo1.png"
                alt="CareCaddyLogo"
                width={625}
                height={447}
                className="h-20 w-auto"
                style={{ width: 'auto' }}
              />
            </Link>
          </div>

          {/* Middle - Tagline */}
          <div className="text-center">
            <p className="text-[#7a7a7a] text-sm leading-relaxed mt-4">
              Your trusted online pharmacy partner, delivering quality healthcare solutions
              worldwide with care and reliability.
            </p>
          </div>

          {/* Right side - Contact numbers */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="text-[#254e58] font-bold mb-1">
              <Phone className="inline-block w-4 h-4 mr-1" /> Call/WhatsApp
            </div>
            <div className="text-right">
              <div>
                <span className="text-sm font-bold text-[#7a7a7a]">US: </span>
                <a
                  href="tel:+19288596278"
                  className="text-sm font-bold text-[#7a7a7a] hover:text-[#88bdbc] transition-colors"
                >
                  +1 928 859-6278
                </a>
              </div>
              <div>
                <span className="text-sm font-bold text-[#7a7a7a]">UK: </span>
                <a
                  href="tel:+447497555555"
                  className="text-sm font-bold text-[#7a7a7a] hover:text-[#88bdbc] transition-colors"
                >
                  +44 7497 555555
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
