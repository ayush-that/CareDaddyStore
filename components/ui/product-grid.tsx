"use client";

import { useProducts } from "@/lib/contexts/product-context";
import { useCart } from "@/lib/context/cart-context";
import { ShoppingCart } from "lucide-react";

export function ProductGrid() {
  const { products, selectedLetter } = useProducts();
  const { addToCart } = useCart();

  const filteredProducts = selectedLetter
    ? products.filter((product) =>
        product.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
      )
    : products;

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {product.name}
            </h3>
            <p className="text-[#00bcd4] font-medium mb-4">
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-[#00bcd4] text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-[#00acc1] transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
