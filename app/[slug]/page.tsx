"use client";

import { useEffect, useState } from "react";
import { ProductService } from "@/lib/api";
import { AlphabetFilter } from "@/components/ui/alphabet-filter";
import { DiseaseSidebar } from "@/components/ui/disease-sidebar";
import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cart";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  disease: string;
  price: number;
  rating: number;
  image: string;
  shipsTo: string | string[];
  description?: string;
  dosage?: string;
  sideEffects?: string;
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedLetter, setSelectedLetter] = useState("ALL");
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch all products for the sidebar
        const allProducts = await ProductService.getAllProducts();
        setProducts(allProducts);

        // Find the product that matches the slug
        const foundProduct = allProducts.find(
          (p) => p.name.toLowerCase().replace(/\s+/g, "-") === params.slug
        );

        if (!foundProduct) {
          throw new Error("Product not found");
        }

        setProduct(foundProduct);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.slug]);

  // Calculate disease counts from actual products
  const diseaseCounts = products.reduce((acc, product) => {
    if (!product.disease) return acc;
    if (!acc[product.disease]) {
      acc[product.disease] = { name: product.disease, count: 0 };
    }
    acc[product.disease].count++;
    return acc;
  }, {} as Record<string, { name: string; count: number }>);

  // Convert to array and sort by count
  const diseaseList = Object.values(diseaseCounts).sort(
    (a, b) => b.count - a.count
  );

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex gap-8">
          <div className="w-72 shrink-0">
            <Skeleton className="h-[calc(100vh-13rem)] w-full rounded-lg" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-[400px] w-full rounded-lg mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-red-500">
          {error || "Product not found"}
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Alphabet Filter */}
      <div className="mb-6">
        <AlphabetFilter
          selectedLetter={selectedLetter}
          onLetterSelect={setSelectedLetter}
        />
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-72 shrink-0">
          <DiseaseSidebar
            diseases={diseaseList}
            products={products}
            selectedDisease={selectedDisease}
            onDiseaseSelect={setSelectedDisease}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Product Header */}
            <div className="p-6 border-b">
              <div className="flex gap-8">
                {/* Product Image */}
                <div className="relative w-80 h-80 bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <div className="text-sm text-gray-600 uppercase mb-4">
                    {product.disease}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      / {product.rating} out of 5
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-rose-500">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-600 uppercase">
                      per pill
                    </span>
                  </div>

                  {/* Shipping Info */}
                  <div className="text-sm text-gray-600 space-y-1 mb-6">
                    <div>Delivery period: 3-8 days</div>
                    <div>
                      Ships to{" "}
                      {Array.isArray(product.shipsTo)
                        ? product.shipsTo.join(", ")
                        : product.shipsTo}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full sm:w-auto px-8 py-3 bg-teal-500 hover:bg-rose-500 text-white rounded-md font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h2>
                  <div className="text-gray-600">
                    {product.description || "No description available."}
                  </div>
                </div>

                {/* Dosage */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Dosage
                  </h2>
                  <div className="text-gray-600">
                    {product.dosage || "Dosage information not available."}
                  </div>
                </div>

                {/* Side Effects */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Side Effects
                  </h2>
                  <div className="text-gray-600">
                    {product.sideEffects ||
                      "Side effects information not available."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
