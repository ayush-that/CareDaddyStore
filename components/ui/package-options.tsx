"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/context/cart-context";

interface Package {
  productName: string;
  packCost: number;
  perPillCost: number;
  shippingCost: number;
  totalCost: number;
}

interface DosageConfig {
  packages: Package[];
}

type ProductSlug =
  | "viagra"
  | "cialis"
  | "super-ed-trial-pack"
  | "cialis-professional";

interface ProductConfig {
  dosages: string[];
  dosageConfigs: Record<string, DosageConfig>;
}

interface PackageOptionsProps {
  productName: string;
  productSku: string;
  productImage: string;
  slug: ProductSlug;
}

// Product-specific configurations
const PRODUCT_CONFIGS: Record<ProductSlug, ProductConfig> = {
  viagra: {
    dosages: ["100mg", "150mg", "200mg"],
    dosageConfigs: {
      "100mg": {
        packages: [
          {
            productName: "10 Tabs pack",
            packCost: 24.99,
            perPillCost: 2.499,
            shippingCost: 17.99,
            totalCost: 45.479,
          },
          {
            productName: "20 Tabs pack",
            packCost: 34.99,
            perPillCost: 1.7495,
            shippingCost: 17.99,
            totalCost: 54.7295,
          },
          {
            productName: "45 Tabs pack",
            packCost: 64.99,
            perPillCost: 1.444222222,
            shippingCost: 17.99,
            totalCost: 82.98,
          },
        ],
      },
      "150mg": {
        packages: [
          {
            productName: "10 Tabs pack",
            packCost: 27.99,
            perPillCost: 2.799,
            shippingCost: 17.99,
            totalCost: 45.98,
          },
          {
            productName: "20 Tabs pack",
            packCost: 39.99,
            perPillCost: 1.555333333,
            shippingCost: 17.99,
            totalCost: 87.98,
          },
          {
            productName: "45 Tabs pack",
            packCost: 69.99,
            perPillCost: 1.555333333,
            shippingCost: 17.99,
            totalCost: 87.98,
          },
        ],
      },
      "200mg": {
        packages: [
          {
            productName: "10 Tabs pack",
            packCost: 27.99,
            perPillCost: 2.799,
            shippingCost: 17.99,
            totalCost: 45.98,
          },
          {
            productName: "20 Tabs pack",
            packCost: 39.99,
            perPillCost: 1.9995,
            shippingCost: 17.99,
            totalCost: 57.98,
          },
          {
            productName: "45 Tabs pack",
            packCost: 69.99,
            perPillCost: 1.555333333,
            shippingCost: 17.99,
            totalCost: 87.98,
          },
        ],
      },
    },
  },
  cialis: {
    dosages: ["20mg", "40mg", "60mg"],
    dosageConfigs: {
      "20mg": {
        packages: [
          {
            productName: "10 Tabs pack",
            packCost: 24.99,
            perPillCost: 2.499,
            shippingCost: 17.99,
            totalCost: 45.479,
          },
          {
            productName: "20 Tabs pack",
            packCost: 34.99,
            perPillCost: 1.7495,
            shippingCost: 17.99,
            totalCost: 54.7295,
          },
          {
            productName: "45 Tabs pack",
            packCost: 64.99,
            perPillCost: 1.444222222,
            shippingCost: 17.99,
            totalCost: 82.98,
          },
        ],
      },
      "40mg": {
        packages: [
          {
            productName: "10 Tabs pack",
            packCost: 27.99,
            perPillCost: 2.799,
            shippingCost: 17.99,
            totalCost: 45.98,
          },
          {
            productName: "20 Tabs pack",
            packCost: 39.99,
            perPillCost: 1.9995,
            shippingCost: 17.99,
            totalCost: 57.98,
          },
          {
            productName: "45 Tabs pack",
            packCost: 69.99,
            perPillCost: 1.555333333,
            shippingCost: 17.99,
            totalCost: 87.98,
          },
        ],
      },
      "60mg": {
        packages: [
          {
            productName: "10 Tabs pack",
            packCost: 27.99,
            perPillCost: 2.799,
            shippingCost: 17.99,
            totalCost: 45.98,
          },
          {
            productName: "20 Tabs pack",
            packCost: 39.99,
            perPillCost: 1.9995,
            shippingCost: 17.99,
            totalCost: 57.98,
          },
          {
            productName: "45 Tabs pack",
            packCost: 69.99,
            perPillCost: 1.555333333,
            shippingCost: 17.99,
            totalCost: 87.98,
          },
        ],
      },
    },
  },
  "super-ed-trial-pack": {
    dosages: ["840mg"],
    dosageConfigs: {
      "840mg": {
        packages: [
          {
            productName: "6 Viagra + 6 Cialis + 6 Levitra",
            packCost: 37.99,
            perPillCost: 3.799,
            shippingCost: 17.99,
            totalCost: 55.98,
          },
        ],
      },
    },
  },
  "cialis-professional": {
    dosages: ["20mg"],
    dosageConfigs: {
      "20mg": {
        packages: [
          {
            productName: "10 Tabs pack",
            packCost: 29.99,
            perPillCost: 2.999,
            shippingCost: 17.99,
            totalCost: 47.98,
          },
          {
            productName: "20 Tabs pack",
            packCost: 42.99,
            perPillCost: 2.2495,
            shippingCost: 17.99,
            totalCost: 60.98,
          },
          {
            productName: "45 Tabs pack",
            packCost: 74.99,
            perPillCost: 1.666444444,
            shippingCost: 17.99,
            totalCost: 92.98,
          },
        ],
      },
    },
  },
} as const satisfies Record<ProductSlug, ProductConfig>;

export function PackageOptions({
  productName,
  productSku,
  productImage,
  slug,
}: PackageOptionsProps) {
  const config = PRODUCT_CONFIGS[slug];

  // If no configuration exists for this product, don't render anything
  if (!config) return null;

  const { addToCart } = useCart();
  const [selectedDosage, setSelectedDosage] = useState<string>(
    config.dosages[0]
  );
  const [isAdding, setIsAdding] = useState(false);

  // Get the packages for the selected dosage
  const currentDosageConfig =
    config.dosageConfigs[selectedDosage as keyof typeof config.dosageConfigs];
  const currentPackages = currentDosageConfig?.packages || [];

  const handleAddToCart = (pkg: Package) => {
    setIsAdding(true);
    addToCart({
      id: productSku,
      name: `${productName} ${selectedDosage} - ${pkg.productName}`,
      price: pkg.totalCost,
      image: productImage,
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Dosage Selection */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Select dosage:
        </h2>
        <div className="flex flex-wrap gap-2">
          {config.dosages.map((dosage) => (
            <button
              key={dosage}
              onClick={() => setSelectedDosage(dosage)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedDosage === dosage
                  ? "bg-[#ff7675] text-white"
                  : "bg-[#88bdbc] text-white hover:bg-[#619695]"
              }`}
            >
              {dosage}
            </button>
          ))}
        </div>
      </div>

      {/* Package Table */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {productName} {selectedDosage}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#88bdbc] text-white">
              <tr>
                <th className="py-3 px-4 text-left">PACKAGE</th>
                <th className="py-3 px-4 text-left">PER PILL</th>
                <th className="py-3 px-4 text-left">PACK COST</th>
                <th className="py-3 px-4 text-left">SHIPPING</th>
                <th className="py-3 px-4 text-left">TOTAL</th>
                <th className="py-3 px-4 text-left">ORDER</th>
              </tr>
            </thead>
            <tbody>
              {currentPackages.map((pkg: Package, index: number) => (
                <tr key={index} className="border-b">
                  <td className="py-4 px-4">{pkg.productName}</td>
                  <td className="py-4 px-4">${pkg.perPillCost.toFixed(2)}</td>
                  <td className="py-4 px-4">${pkg.packCost.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    {pkg.shippingCost > 0
                      ? `$${pkg.shippingCost.toFixed(2)}`
                      : "Free"}
                  </td>
                  <td className="py-4 px-4">${pkg.totalCost.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleAddToCart(pkg)}
                      disabled={isAdding}
                      className="bg-[#88bdbc] hover:bg-[#619695] text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {isAdding ? "Adding..." : "Add to cart"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
