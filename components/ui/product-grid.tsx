"use client";

import { useProducts } from "@/lib/contexts/product-context";
import { useCart } from "@/lib/context/cart-context";
import { ShoppingCart } from "lucide-react";

export function ProductGrid() {
  const { products, selectedLetter } = useProducts();
  const { addToCart } = useCart();

  const filteredProducts =
    selectedLetter === null || selectedLetter === ""
      ? products
      : products.filter((product) =>
          product.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
        );

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 md:px-6">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg overflow-hidden flex md:block"
        >
          <div className="w-1/3 md:w-full p-4 bg-white flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
          </div>
          <div className="w-2/3 md:w-full p-4 bg-[#88bdbc] text-white">
            <h3 className="font-medium text-sm md:text-base mb-1">
              {product.name}
            </h3>
            <div className="text-xs uppercase mb-1 md:mb-2">
              {product.disease}
            </div>
            <div className="hidden md:flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-white/90">
                / {product.rating || "0.0"} out of 5
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
              <div className="text-lg md:text-xl font-bold">
                ${product.price.toFixed(2)}
                <span className="text-sm font-normal ml-1">PILL</span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-white text-[#88bdbc] px-3 py-1.5 md:px-4 md:py-2 rounded text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
            <div className="hidden md:block text-sm text-white/90">
              <p>Delivery period: 2-5 Days</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
