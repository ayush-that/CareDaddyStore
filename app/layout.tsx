import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { CartProvider } from "@/lib/context/cart-context";
import { ProductProvider } from "@/lib/contexts/product-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareCaddy Store",
  description: "Your trusted online pharmacy",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductProvider>
          <CartProvider>
            <Providers>{children}</Providers>
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
