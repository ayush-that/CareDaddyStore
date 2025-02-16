"use client";

import { ClientWrapper } from "@/components/ui/client-wrapper";
import { useCart } from "@/lib/context/cart-context";
import { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const shippingCost = 29.95;
  const insuranceCost = 6.95;
  const totalAmount = total + shippingCost + insuranceCost;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "India",
    state: "",
    city: "",
    zipCode: "",
    address: "",
    phone: "",
    email: "",
    paymentType: "PayPal",
    paypalEmail: "",
    venmoUsername: "",
    cashappUsername: "",
    bitcoinAddress: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("processing");
    // Add payment processing logic here
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  const renderPaymentFields = () => {
    switch (formData.paymentType) {
      case "PayPal":
        return (
          <div>
            <label
              htmlFor="paypalEmail"
              className="block text-sm text-gray-600 mb-1"
            >
              PayPal Email *
            </label>
            <input
              type="email"
              id="paypalEmail"
              required
              value={formData.paypalEmail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your PayPal email"
            />
          </div>
        );
      case "Venmo":
        return (
          <div>
            <label
              htmlFor="venmoUsername"
              className="block text-sm text-gray-600 mb-1"
            >
              Venmo Username *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                @
              </span>
              <input
                type="text"
                id="venmoUsername"
                required
                value={formData.venmoUsername}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-r focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="username"
              />
            </div>
          </div>
        );
      case "CashApp":
        return (
          <div>
            <label
              htmlFor="cashappUsername"
              className="block text-sm text-gray-600 mb-1"
            >
              Cash App Username *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                $
              </span>
              <input
                type="text"
                id="cashappUsername"
                required
                value={formData.cashappUsername}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-r focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="cashtag"
              />
            </div>
          </div>
        );
      case "Bitcoin":
        return (
          <div>
            <label
              htmlFor="bitcoinAddress"
              className="block text-sm text-gray-600 mb-1"
            >
              Bitcoin Address *
            </label>
            <input
              type="text"
              id="bitcoinAddress"
              required
              value={formData.bitcoinAddress}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your Bitcoin address"
            />
            <p className="mt-1 text-sm text-gray-500">
              The payment instructions will be sent to your email after order
              confirmation
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ClientWrapper>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Secure Checkout</h2>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Shipping Address Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm text-gray-600 mb-1"
                      >
                        First name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm text-gray-600 mb-1"
                      >
                        Last name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm text-gray-600 mb-1"
                      >
                        Country *
                      </label>
                      <select
                        id="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="India">India</option>
                        {/* Add more countries as needed */}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm text-gray-600 mb-1"
                      >
                        State / Province *
                      </label>
                      <select
                        id="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select State</option>
                        {/* Add states here */}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm text-gray-600 mb-1"
                      >
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block text-sm text-gray-600 mb-1"
                      >
                        ZIP/Postal code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm text-gray-600 mb-1"
                      >
                        Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm text-gray-600 mb-1"
                      >
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm text-gray-600 mb-1"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">
                    Payment Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="paymentType"
                        className="block text-sm text-gray-600 mb-1"
                      >
                        Payment type *
                      </label>
                      <select
                        id="paymentType"
                        required
                        value={formData.paymentType}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="PayPal">PayPal</option>
                        <option value="Venmo">Venmo</option>
                        <option value="CashApp">Cash App</option>
                        <option value="Bitcoin">Bitcoin</option>
                      </select>
                      <div className="flex mt-2">
                        <div className="w-16 h-12 relative bg-white rounded overflow-hidden">
                          <Image
                            src="/images/checkout/paypal.png"
                            alt="PayPal"
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="w-16 h-12 relative bg-white rounded overflow-hidden">
                          <Image
                            src="/images/checkout/venmo.png"
                            alt="Venmo"
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="w-16 h-12 relative bg-white rounded overflow-hidden">
                          <Image
                            src="/images/checkout/cashapp.png"
                            alt="Cash App"
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="w-16 h-12 relative bg-white rounded overflow-hidden">
                          <Image
                            src="/images/checkout/bitcoin.png"
                            alt="Bitcoin"
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                      </div>
                    </div>

                    {renderPaymentFields()}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "processing"}
                  className="w-full bg-[#88bdbc] text-white py-3 rounded font-medium hover:bg-[#619695] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "processing" ? "Processing..." : "Complete Order"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-80">
            <div className="bg-[#f5f5f5] rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-12 h-12 relative bg-white rounded overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.quantity}{" "}
                          {item.quantity === 1 ? "Pill" : "Pills"} x{" "}
                          {item.strength}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      {item.price === 0 ? (
                        <span className="text-green-500">FREE</span>
                      ) : (
                        `$${item.price.toFixed(2)}`
                      )}
                    </p>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total amount</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientWrapper>
  );
}
