"use client";

import { ClientWrapper } from "@/components/ui/client-wrapper";
import { useCart } from "@/lib/context/cart-context";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  return (
    <ClientWrapper>
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl mb-6">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#7a7a7a] mb-4">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block bg-[#88bdbc] text-white px-6 py-2 rounded hover:bg-[#619695]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div>
            {/* Cart Table */}
            <div className="bg-[#88bdbc] text-white">
              <div className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 px-6 py-3">
                <div>PRODUCT</div>
                <div className="text-right">PRICE</div>
                <div className="text-center">QTY</div>
                <div className="text-right">SUBTOTAL</div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="divide-y border border-gray-200">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 px-6 py-4 items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 relative bg-white p-2 border border-gray-200 rounded">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <div className="text-right">${item.price.toFixed(2)}</div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-[#f1f1f1] hover:bg-[#e5e5e5]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-10 h-8 text-center border-y border-[#f1f1f1]"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-[#f1f1f1] hover:bg-[#e5e5e5]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-4">
                    <span className="text-[#ff7675]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-[#ff7675]"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Total */}
            <div className="flex justify-between items-center mt-6">
              <Link
                href="/"
                className="px-6 py-3 bg-[#f1f1f1] hover:bg-[#e5e5e5] text-gray-700"
              >
                Continue shopping
              </Link>
              <div className="flex items-center gap-8">
                <div className="text-xl">
                  Total:{" "}
                  <span className="text-[#ff7675]">${total.toFixed(2)}</span>
                </div>
                <button className="px-6 py-3 bg-[#88bdbc] text-white hover:bg-[#619695]">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClientWrapper>
  );
}
