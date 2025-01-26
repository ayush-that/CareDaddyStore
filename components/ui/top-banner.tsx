"use client";

import { Phone } from "lucide-react";
import Image from "next/image";

export function TopBanner() {
  return (
    <div className="w-full bg-[#254e58] text-white py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* US Phone 1 */}
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="text-sm font-bold">US: +1 917 520-2876</span>
          </div>

          {/* US Phone 2 */}
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="text-sm font-bold">US: +1 928 859-6278</span>
          </div>

          {/* 24/7 Support */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white font-bold">24/7</span>
            <span className="text-white font-bold">Customer Support</span>
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
