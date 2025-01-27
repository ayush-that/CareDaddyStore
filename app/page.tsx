"use client";

import { ProductCard } from "@/components/ui/product-card";
import { useProducts } from "@/lib/contexts/product-context";
import { ClientWrapper } from "@/components/ui/client-wrapper";

interface Product {
  id: any;
  name: any;
  disease: any;
  price: any;
  image: any;
  rating?: any;
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
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-[300px] bg-gray-100 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
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
