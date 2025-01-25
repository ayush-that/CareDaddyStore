"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "@/lib/contexts/product-context";
import { CartProvider } from "@/lib/context/cart-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <CartProvider>
          <ProductProvider>{children}</ProductProvider>
        </CartProvider>
      </body>
    </html>
  );
}
