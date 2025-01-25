"use client";

import { CartProvider } from "@/lib/context/cart-context";
import { ProductProvider } from "@/lib/contexts/product-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ProductProvider>{children}</ProductProvider>
    </CartProvider>
  );
}
