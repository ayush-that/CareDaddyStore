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

  const { name, disease, image, price, rating, shipsTo } = product;

  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    });

    // Visual feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="group w-[250px] bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border-2 border-[#dcdcdc]">
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
      <div className="p-4 bg-[#f3fafb] group-hover:bg-[#7cb1b0] transition-colors duration-300">
        <Link href={`/product/${slug}`}>
          <h3 className="font-medium mb-1 text-gray-900 group-hover:text-white">
            {name}
          </h3>
          <div className="text-xs text-gray-600 uppercase mb-2 group-hover:text-white/90">
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
          <span className="text-sm text-gray-600 group-hover:text-white/90">
            / {rating || "0.0"} out of 5
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-bold text-red-500 group-hover:text-white">
            ${price?.toFixed(2) || "0.00"}
          </span>
          <span className="text-sm text-gray-600 group-hover:text-white/90">
            PILL
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-4 group-hover:text-white/90">
          <p>Delivery period: 2-5 Days</p>
          <p>Ships to {shipsTo || "N/A"}</p>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full flex items-center justify-center gap-2 bg-[#88bdbc] hover:bg-[#254e58] text-white transition-all ${
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
