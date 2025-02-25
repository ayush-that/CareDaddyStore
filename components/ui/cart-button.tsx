'use client';

import { useCart } from '@/lib/context/cart-context';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export function CartButton() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-6 h-6 text-[#00bcd4]" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#ff7675] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
