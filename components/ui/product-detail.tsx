"use client";

import { Star, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/context/cart-context";

interface ProductDetailProps {
  product: {
    name: string;
    rating: number;
    sku: string;
    description: string;
    longDescription: string;
    safetyInfo: string;
    sideEffects: string;
    image: string;
    price: number;
  };
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.sku,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Product Header with Image */}
      <div className="grid md:grid-cols-2 gap-8 p-6 border-b">
        {/* Image */}
        <div className="relative h-[300px] bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < product.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">SKU: {product.sku}</span>
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="space-y-4">
            <div className="text-3xl font-bold text-[#88bdbc]">
              ${product.price.toFixed(2)}
            </div>
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 bg-[#88bdbc] hover:bg-[#619695] h-10 px-4 rounded text-white"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 space-y-8">
        {/* Quick Description */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Description
          </h2>
          <p className="text-gray-600">{product.description}</p>
        </div>

        {/* Detailed Description */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Detailed Description
          </h2>
          <p className="text-gray-600 whitespace-pre-line">
            {product.longDescription}
          </p>
        </div>

        {/* Safety Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Safety Information
          </h2>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-gray-600">{product.safetyInfo}</p>
          </div>
        </div>

        {/* Side Effects */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Side Effects
          </h2>
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-gray-600">{product.sideEffects}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
