"use client";

import { Headphones, Music, Phone } from "lucide-react";
import Image from "next/image";

export function TopBanner() {
  return (
    <div className="w-full bg-gradient-to-b from-[#254e58] to-[#1f3e47] text-white py-2">
      <div className="container mx-auto px-7 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* US Phone 1 */}
          <div className="flex items-center gap-2">
            <Phone className="h-7 w-7 bg-white/20 p-1 rounded-md" />
            <span className="text-sm font-bold">US: +1 917 520-2876</span>
          </div>

          {/* US Phone 2 */}
          <div className="flex items-center gap-2">
            <Phone className="h-7 w-7 bg-white/20 p-1 rounded-md" />
            <span className="text-sm font-bold">US: +1 928 859-6278</span>
          </div>

          {/* 24/7 Support */}
          <div className="flex items-center gap-2 text-sm">
            <Headphones className="h-7 w-7 bg-white/20 p-1 rounded-md" />
            <span className="text-white font-bold ">24/7</span>
            <span className="text-white">Customer Support</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex items-center gap-3">
          <Image
            src="/visa-top.svg"
            alt="Visa"
            width={48}
            height={30}
            className="h-7 w-auto"
          />
          <Image
            src="/mastercard-top.svg"
            alt="Mastercard"
            width={48}
            height={30}
            className="h-7 w-auto"
          />
        </div>
      </div>
    </div>
  );
}
