"use client";

import Image from "next/image";
import { useProducts } from "@/lib/contexts/product-context";
import { Button } from "@/components/ui/button";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { products } = useProducts();

  // Find the product by slug
  const product = products.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === params.slug
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="relative h-[400px] bg-white">
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 uppercase">
                {product.disease}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-lg text-gray-600">
                / {product.rating} out of 5
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-red-500">
                ${product.price}
              </span>
              <span className="text-xl text-gray-600">PER PILL</span>
            </div>

            <div className="text-gray-600 space-y-2">
              {product.deliveryPeriod && (
                <p>Delivery period: {product.deliveryPeriod}</p>
              )}
              <p>Ships to {product.shipsTo}</p>
            </div>

            <div className="pt-6">
              <Button className="w-full h-12 text-lg bg-[#88bdbc] hover:bg-[#254e58] text-white">
                Add to cart
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border-t">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Description
            </h2>
            <div className="prose max-w-none">
              <p>
                Prevents the occurrence of epileptic seizures, allodynia and
                hyperalgesia, and neuropathic pain. The drug is used to treat
                diabetic polyneuropathy, post-herpetic neuralgia, and
                fibromyalgia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
