'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Menu, Search } from 'lucide-react';
import { useCart } from '@/lib/context/cart-context';
import { useProducts } from '@/lib/contexts/product-context';
import { MobileMenu } from './mobile-menu';
import { useState } from 'react';

export function Navbar() {
  const { items, total } = useCart();
  const { searchQuery, setSearchQuery } = useProducts();
  const totalItems = items.reduce((sum: any, item: any) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="bg-white shadow-sm">
        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo2.png"
                alt="CareCaddyLogo"
                width={730}
                height={148}
                className="h-10 w-auto"
                priority
                style={{ width: 'auto' }}
              />
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 items-center gap-4 max-w-xl ml-4">
              <form onSubmit={handleSearch} className="relative flex-1 text-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full h-10 pl-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-[#88bdbc]"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </form>
            </div>

            <Link
              href="/cart"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <div className="relative">
                <div className="bg-[#88bdbc] hover:bg-[#619695] p-2 rounded-md">
                  <ShoppingCart className="h-5 w-5 text-white" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
                      {totalItems}
                    </span>
                  )}
                </div>
              </div>
              <div className="hidden md:block text-sm">
                <div className="text-xs font-semibold">Your Shopping Cart</div>
                <div className="text-gray-600 text-lg font-bold">${total.toFixed(2)}</div>
              </div>
            </Link>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full h-10 pl-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-[#88bdbc]"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
