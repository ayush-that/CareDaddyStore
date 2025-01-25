"use client";

import { ClientWrapper } from "@/components/ui/client-wrapper";
import { useCart } from "@/lib/context/cart-context";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  return (
    <ClientWrapper>
      <div className="p-6 space-y-6">
        <h1 className="text-[#00bcd4] text-2xl font-normal mb-6">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <p className="text-[#7a7a7a] text-center py-8">Your cart is empty</p>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-[#00bcd4] font-medium">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
              <div>
                <p className="text-lg font-medium text-gray-900">Total</p>
                <p className="text-sm text-gray-500">Including all taxes</p>
              </div>
              <p className="text-2xl font-medium text-[#00bcd4]">
                ${total.toFixed(2)}
              </p>
            </div>

            <div className="flex justify-end">
              <button className="bg-[#00bcd4] text-white px-8 py-3 rounded-lg hover:bg-[#00acc1] transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </ClientWrapper>
  );
}
