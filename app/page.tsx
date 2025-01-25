"use client";

import { ProductCard } from "@/components/ui/product-card";
import { useProducts } from "@/lib/contexts/product-context";
import { ClientWrapper } from "@/components/ui/client-wrapper";

interface Product {
  id: number;
  name: string;
  disease: string;
  price: number;
  image: string;
  rating?: number;
}

function ProductGrid() {
  const { products, loading, selectedLetter } = useProducts();

  // Filter products based only on selected letter
  const filteredProducts = products.filter((product: Product) => {
    const matchesLetter =
      !selectedLetter ||
      product.name.charAt(0).toUpperCase() === selectedLetter;
    return matchesLetter;
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-[300px] bg-gray-100 animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <ClientWrapper>
      <ProductGrid />
    </ClientWrapper>
  );
}
