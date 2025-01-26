"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/lib/context/cart-context";
import { MobileMenu } from "./mobile-menu";
import { useState } from "react";

export function Navbar() {
  const { items, total } = useCart();
  const totalItems = items.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo2.png"
              alt="CareDaddyLogo"
              width={140}
              height={40}
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          <div className="flex-1 flex items-center gap-4 max-w-xl ml-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full h-10 pl-4 pr-24 rounded-lg border border-gray-200 focus:outline-none focus:border-[#88bdbc]"
              />
              <select className="absolute right-0 top-0 h-10 px-3 text-gray-600 border-l border-gray-200 rounded-r-lg bg-transparent focus:outline-none">
                <option>Everywhere</option>
              </select>
            </div>
          </div>

          <Link
            href="/cart"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <div className="relative">
              <div className="bg-[#88bdbc] hover:bg-[#619695] p-2 rounded-md">
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
            <div className="hidden md:block text-sm">
              <div className="text-xs">Your Shopping Cart</div>
              <div className="text-gray-600 text-lg">${total.toFixed(2)}</div>
            </div>
          </Link>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
