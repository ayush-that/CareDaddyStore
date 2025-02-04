"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { useCart } from "@/lib/context/cart-context";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  disease: string;
  image: string;
  price: number;
  rating: number;
  shipsTo?: string;
  slug: string;
  bestseller?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  if (!product || !product.name) {
    return null;
  }

  const { name, disease, image, price, rating, shipsTo, slug, bestseller } =
    product;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="group sm:w-[250px] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border-2 border-gray-100">
      {/* Image Container */}
      <div className="relative h-[180px] bg-white p-4">
        <Image
          src={image || "/placeholder.png"}
          alt={name}
          fill
          className="object-contain"
        />
      </div>

      {/* Info Container */}
      <div className="p-4 bg-gradient-to-b from-[#f3fafb] to-[#e5f4f5] group-hover:bg-gradient-to-b group-hover:from-[#88bdbc] group-hover:to-[#629796] transition-colors duration-300">
        <Link href={`/product/${slug}`}>
          <h3 className="font-semibold text-xl mb-1 text-gray-700 group-hover:text-white">
            {name}
          </h3>
          <div className="text-xs font-semibold text-gray-600 uppercase mb-2 group-hover:text-gray-900">
            {disease}
          </div>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400">
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600 group-hover:text-white">
            / {rating || "0.0"} out of 5
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-bold text-red-500 group-hover:text-white">
            ${price?.toFixed(2) || "0.00"}
          </span>
          <span className="text-sm text-gray-600 group-hover:text-white">
            / PILL
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-4 group-hover:text-gray-900">
          <p>
            Delivery period:{" "}
            <span className="font-bold group-hover:text-white">
              {bestseller
                ? "USPS Priority Mail Overnight Shipping"
                : "2-5 Days"}
            </span>
          </p>
          {!bestseller && (
            <p>
              Ships to{" "}
              <span className="font-bold group-hover:text-white">
                {shipsTo || "N/A"}
              </span>
            </p>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full flex items-center justify-center gap-2 bg-[#88bdbc] group-hover:bg-[#f7766e] text-white transition-all ${
            isAdding ? "opacity-75" : ""
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isAdding ? "Adding..." : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}
