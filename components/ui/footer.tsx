"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#f5f9fa] to-[#e5f4f5] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left side - Logo and tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo2.png"
                alt="CareDaddyLogo"
                width={180}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-[#7a7a7a] text-sm max-w-sm leading-relaxed">
              Your trusted online pharmacy partner, delivering quality
              healthcare solutions worldwide with care and reliability.
            </p>
          </div>

          {/* Right side - Contact numbers */}
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <MessageSquare className="w-6 h-6 text-[#88bdbc] mt-1" />
              <div>
                <div className="text-[#254e58] font-medium mb-1">
                  WhatsApp Number
                </div>
                <div>
                  <span className="text-sm font-bold text-[#7a7a7a]">US: </span>
                  <a
                    href="tel:+19175202876"
                    className="text-sm font-bold text-[#7a7a7a] hover:text-[#88bdbc] transition-colors"
                  >
                    +1 917 520-2876
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-[#88bdbc] mt-1" />
              <div>
                <div className="text-[#254e58] font-medium mb-1">
                  Call or text
                </div>
                <div>
                  <span className="text-sm font-bold text-[#7a7a7a]">US: </span>
                  <a
                    href="tel:+19288596278"
                    className="text-sm font-bold text-[#7a7a7a] hover:text-[#88bdbc] transition-colors"
                  >
                    +1 928 859-6278
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
