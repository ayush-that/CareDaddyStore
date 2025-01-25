"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/context/cart-context";

export function Navbar() {
  const { items, total } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo2.png"
            alt="365Happy"
            width={140}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full h-10 pl-4 pr-10 rounded-md border border-gray-200 focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Shopping Cart */}
        <Link
          href="/cart"
          className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
        >
          <div className="relative">
            <div className="bg-[#00bcd4] p-2 rounded-md">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-[#ff7675] text-white rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <div className="text-sm">
            <div className="font-medium">Your Shopping Cart</div>
            <div className="text-gray-600">
              {totalItems} {totalItems === 1 ? "item" : "items"} $
              {total.toFixed(2)}
            </div>
          </div>
        </Link>
      </div>
    </nav>
  );
}
