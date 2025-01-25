import { Phone } from "lucide-react";
import Image from "next/image";

export function TopBanner() {
  return (
    <div className="w-full bg-[#254e58] text-white py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* US Phone */}
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4" />
            <span className="text-gray-400">US:</span>
            <span>+1 (888) 243-74-06</span>
          </div>

          {/* GB Phone */}
          <div className="flex items-center gap-2 text-sm">
            <div className="bg-[#1d3d45] p-1.5 rounded-md">
              <Phone className="h-4 w-4" />
            </div>
            <span className="text-gray-400">GB:</span>
            <span>+44 (800) 041-87-44</span>
          </div>

          {/* 24/7 Support */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">24/7</span>
            <span>Customer Support</span>
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
