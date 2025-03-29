import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { CartProvider } from '@/lib/context/cart-context';
import { ProductProvider } from '@/lib/contexts/product-context';
import { PayPalProvider } from '@/components/providers/paypal-provider';
import dynamic from 'next/dynamic';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';

const inter = Inter({ subsets: ['latin'] });
const PixelTracker = dynamic(() => import('@/components/PixelTracker'), { ssr: false });

export const metadata: Metadata = {
  title: 'CareCaddy Store',
  description: 'Your trusted online pharmacy',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PixelTracker />
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <PayPalProvider>
          <ProductProvider>
            <CartProvider>
              <Providers>{children}</Providers>
            </CartProvider>
          </ProductProvider>
        </PayPalProvider>
      </body>
    </html>
  );
}
