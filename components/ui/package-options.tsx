'use client';

import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/context/cart-context';

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

type ProductSlug = 'viagra' | 'cialis' | 'super-ed-trial-pack' | 'cialis-professional' | 'levitra';

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
    dosages: ['100mg', '150mg', '200mg'],
    dosageConfigs: {
      '100mg': {
        packages: [
          {
            productName: 'Viagra 100 Mg 10 Tabs pack',
            packCost: 24.99,
            perPillCost: 2.499,
            shippingCost: 17.99,
            totalCost: 45.479,
          },
          {
            productName: 'Viagra 100 Mg 20 Tabs pack',
            packCost: 34.99,
            perPillCost: 1.7495,
            shippingCost: 17.99,
            totalCost: 54.7295,
          },
          {
            productName: 'Viagra 100 Mg 45 Tabs pack',
            packCost: 64.99,
            perPillCost: 1.444222222,
            shippingCost: 17.99,
            totalCost: 82.98,
          },
        ],
      },
      '150mg': {
        packages: [
          {
            productName: 'Viagra 150 Mg 10 Tabs pack',
            packCost: 27.99,
            perPillCost: 2.799,
            shippingCost: 17.99,
            totalCost: 45.98,
          },
          {
            productName: 'Viagra 150 Mg 20 Tabs pack',
            packCost: 39.99,
            perPillCost: 1.555333333,
            shippingCost: 17.99,
            totalCost: 87.98,
          },
          {
            productName: 'Viagra 150 Mg 45 Tabs pack',
            packCost: 69.99,
            perPillCost: 1.555333333,
            shippingCost: 17.99,
            totalCost: 87.98,
          },
        ],
      },
      '200mg': {
        packages: [
          {
            productName: 'Viagra 200 Mg 10 Tabs pack',
            packCost: 27.99,
            perPillCost: 2.799,
            shippingCost: 17.99,
            totalCost: 45.98,
          },
          {
            productName: 'Viagra 200 Mg 20 Tabs pack',
            packCost: 39.99,
            perPillCost: 1.9995,
            shippingCost: 17.99,
            totalCost: 57.98,
          },
          {
            productName: 'Viagra 200 Mg 45 Tabs pack',
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
    dosages: ['20mg', '40mg', '60mg'],
    dosageConfigs: {
      '20mg': {
        packages: [
          {
            productName: 'Cialis 20 Mg 10 Tabs pack',
            packCost: 24.99,
            perPillCost: 2.499,
            shippingCost: 17.99,
            totalCost: 45.479,
          },
          {
            productName: 'Cialis 20 Mg 20 Tabs pack',
            packCost: 34.99,
            perPillCost: 1.7495,
            shippingCost: 17.99,
            totalCost: 54.7295,
          },
          {
            productName: 'Cialis 20 Mg 45 Tabs pack',
            packCost: 64.99,
            perPillCost: 1.444222222,
            shippingCost: 17.99,
            totalCost: 82.98,
          },
        ],
      },
      '40mg': {
        packages: [
          {
            productName: 'Cialis 40 Mg 10 Tabs pack',
            packCost: 27.99,
            perPillCost: 2.799,
            shippingCost: 17.99,
            totalCost: 45.98,
          },
          {
            productName: 'Cialis 40 Mg 20 Tabs pack',
            packCost: 39.99,
            perPillCost: 1.9995,
            shippingCost: 17.99,
            totalCost: 57.98,
          },
          {
            productName: 'Cialis 40 Mg 45 Tabs pack',
            packCost: 69.99,
            perPillCost: 1.555333333,
            shippingCost: 17.99,
            totalCost: 87.98,
          },
        ],
      },
      '60mg': {
        packages: [
          {
            productName: 'Cialis 60 Mg 10 Tabs pack',
            packCost: 27.99,
            perPillCost: 2.799,
            shippingCost: 17.99,
            totalCost: 45.98,
          },
          {
            productName: 'Cialis 60 Mg 20 Tabs pack',
            packCost: 39.99,
            perPillCost: 1.9995,
            shippingCost: 17.99,
            totalCost: 57.98,
          },
          {
            productName: 'Cialis 60 Mg 45 Tabs pack',
            packCost: 69.99,
            perPillCost: 1.555333333,
            shippingCost: 17.99,
            totalCost: 87.98,
          },
        ],
      },
    },
  },
  'super-ed-trial-pack': {
    dosages: ['840mg'],
    dosageConfigs: {
      '840mg': {
        packages: [
          {
            productName: '6 Viagra + 6 Cialis + 6 Levitra',
            packCost: 37.99,
            perPillCost: 3.799,
            shippingCost: 17.99,
            totalCost: 55.98,
          },
        ],
      },
    },
  },
  'cialis-professional': {
    dosages: ['20mg'],
    dosageConfigs: {
      '20mg': {
        packages: [
          {
            productName: 'Cialis Professional 20 Mg 10 Tabs pack',
            packCost: 29.99,
            perPillCost: 2.999,
            shippingCost: 17.99,
            totalCost: 47.98,
          },
          {
            productName: 'Cialis Professional 20 Mg 20 Tabs pack',
            packCost: 42.99,
            perPillCost: 2.2495,
            shippingCost: 17.99,
            totalCost: 60.98,
          },
          {
            productName: 'Cialis Professional 20 Mg 45 Tabs pack',
            packCost: 74.99,
            perPillCost: 1.666444444,
            shippingCost: 17.99,
            totalCost: 92.98,
          },
        ],
      },
    },
  },
  levitra: {
    dosages: ['20mg'],
    dosageConfigs: {
      '20mg': {
        packages: [
          {
            productName: 'Levitra 20 Mg 10 Tabs pack',
            packCost: 29.99,
            perPillCost: 2.999,
            shippingCost: 17.99,
            totalCost: 47.98,
          },
          {
            productName: 'Levitra 20 Mg 20 Tabs pack',
            packCost: 42.99,
            perPillCost: 2.1495,
            shippingCost: 17.99,
            totalCost: 60.98,
          },
          {
            productName: 'Levitra 20 Mg 45 Tabs pack',
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
  const [selectedDosage, setSelectedDosage] = useState<string>(config.dosages[0]);
  const [addingPackageId, setAddingPackageId] = useState<string | null>(null);

  // Get the packages for the selected dosage
  const currentDosageConfig =
    config.dosageConfigs[selectedDosage as keyof typeof config.dosageConfigs];
  const currentPackages = currentDosageConfig?.packages || [];

  const handleAddToCart = (pkg: Package) => {
    // Use the package name as a unique identifier
    setAddingPackageId(pkg.productName);

    addToCart({
      id: productSku,
      name: `${productName} ${selectedDosage} - ${pkg.productName}`,
      price: pkg.totalCost,
      image: productImage,
    });

    setTimeout(() => {
      setAddingPackageId(null);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Dosage Selection */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select dosage:</h2>
        <div className="flex flex-wrap gap-2">
          {config.dosages.map(dosage => (
            <button
              key={dosage}
              onClick={() => setSelectedDosage(dosage)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedDosage === dosage
                  ? 'bg-[#ff7675] text-white'
                  : 'bg-[#88bdbc] text-white hover:bg-[#619695]'
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
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#88bdbc]">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider w-[20%]"
                  >
                    Package
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider w-[15%]"
                  >
                    Per Pill
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider w-[15%]"
                  >
                    Pack Cost
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider w-[15%]"
                  >
                    Shipping
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider w-[15%]"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 sm:px-4 text-left text-xs sm:text-sm font-semibold text-white uppercase tracking-wider w-[20%]"
                  >
                    Order
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {currentPackages.map((pkg: Package, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-900">
                      {pkg.productName}
                    </td>
                    <td className="whitespace-nowrap py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-900">
                      ${pkg.perPillCost.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-900">
                      ${pkg.packCost.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-900">
                      {pkg.shippingCost > 0 ? `$${pkg.shippingCost.toFixed(2)}` : 'Free'}
                    </td>
                    <td className="whitespace-nowrap py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-900">
                      ${pkg.totalCost.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap py-3 px-3 sm:px-4 text-xs sm:text-sm">
                      <button
                        onClick={() => handleAddToCart(pkg)}
                        disabled={addingPackageId === pkg.productName}
                        className="bg-[#88bdbc] hover:bg-[#619695] text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm flex items-center gap-1 sm:gap-2 whitespace-nowrap"
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">
                          {addingPackageId === pkg.productName ? 'Adding...' : 'Add to cart'}
                        </span>
                        <span className="sm:hidden">
                          {addingPackageId === pkg.productName ? '...' : 'Add'}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
