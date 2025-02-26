'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface DiseaseSidebarProps {
  diseases: Array<{ name: string; count: number }>;
  products: Array<{
    id: string | number;
    name: string;
    disease: string;
    slug: string;
    bestseller?: boolean;
  }>;
  selectedDisease: string | null;
  onDiseaseSelect: (disease: string | null) => void;
}

export function DiseaseSidebar({ diseases, products }: DiseaseSidebarProps) {
  const [expandedDisease, setExpandedDisease] = useState<string | null>(null);

  const handleDiseaseClick = (disease: string) => {
    if (expandedDisease === disease) {
      setExpandedDisease(null);
    } else {
      setExpandedDisease(disease);
    }
  };

  // Get bestseller products
  const bestsellerProducts = products.filter(product => product.bestseller);

  // Add dummy diseases
  const allDiseases = [
    ...diseases,
    { name: "Women's Health", count: 0 },
    { name: 'Anti-Acidity', count: 0 },
    { name: 'Anti-Allergic/Asthma', count: 0 },
    { name: 'Anti-Depressant', count: 0 },
    { name: 'Anti-Diabetic', count: 0 },
    { name: 'Anti-Fungus', count: 0 },
    { name: 'Anti-Herpes', count: 0 },
    { name: 'Blood Pressure', count: 0 },
    { name: 'Cholesterol', count: 0 },
    { name: 'Erectile Dysfunction', count: 0 },
    { name: 'Gastrointestinal', count: 0 },
    { name: 'General Health', count: 0 },
    { name: 'Healthy Bones', count: 0 },
    { name: 'Heart Disease', count: 0 },
    { name: 'Herbal', count: 0 },
    { name: "Men's Health", count: 0 },
    { name: 'Other', count: 0 },
    { name: 'Pain Relief', count: 0 },
    { name: 'Skin Care', count: 0 },
    { name: 'Stop Smoking', count: 0 },
    { name: 'Weight Loss', count: 0 },
  ];

  return (
    <div className="bg-gradient-to-b from-[#eff9fa] to-[#e5f4f5] rounded-lg px-4 py-3">
      {/* Mobile view - horizontal scrollable row */}
      <div className="md:hidden">
        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex flex-row space-x-2 whitespace-nowrap">
            {/* Bestsellers for mobile */}
            {bestsellerProducts.length > 0 && (
              <button
                onClick={() => handleDiseaseClick('Bestsellers')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap
                  ${expandedDisease === 'Bestsellers' ? 'bg-[#c6e0e0] text-black' : 'bg-[#e0ecec] text-gray-800 hover:bg-[#d4e3e3]'}`}
              >
                Bestsellers ({bestsellerProducts.length})
              </button>
            )}

            {/* Disease buttons for mobile */}
            {allDiseases.map(disease => (
              <button
                key={`mobile-${disease.name}`}
                onClick={() => handleDiseaseClick(disease.name)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap
                  ${expandedDisease === disease.name ? 'bg-[#c6e0e0] text-black' : 'bg-[#e0ecec] text-gray-800 hover:bg-[#d4e3e3]'}`}
              >
                {disease.name} {disease.count > 0 && `(${disease.count})`}
              </button>
            ))}
          </div>
        </div>

        {/* Expanded section for mobile only */}
        {expandedDisease && (
          <div className="mt-3 border-t border-[#d4e3e3] pt-3">
            <div className="space-y-1">
              {expandedDisease === 'Bestsellers'
                ? bestsellerProducts.map(product => (
                    <Link
                      key={`mobile-product-${product.id}`}
                      href={`/product/${product.slug}`}
                      className="block py-1 px-3 text-sm text-gray-600 hover:text-gray-900"
                    >
                      {product.name}
                    </Link>
                  ))
                : products
                    .filter(product => product.disease === expandedDisease)
                    .map(product => (
                      <Link
                        key={`mobile-product-${product.id}`}
                        href={`/product/${product.slug}`}
                        className="block py-1 px-3 text-sm text-gray-600 hover:text-gray-900"
                      >
                        {product.name}
                      </Link>
                    ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop view - vertical list with original functionality */}
      <div className="hidden md:block space-y-1 smooth-scroll">
        {/* Bestsellers Category */}
        {bestsellerProducts.length > 0 && (
          <div>
            <button
              onClick={() => handleDiseaseClick('Bestsellers')}
              className="text-base font-semibold w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-[#e0ecec]"
            >
              <span className="flex items-center gap-2">
                {expandedDisease === 'Bestsellers' ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                Bestsellers
              </span>
              <span className="text-sm text-gray-500">{bestsellerProducts.length}</span>
            </button>
            {expandedDisease === 'Bestsellers' && (
              <div className="ml-4 mt-1">
                {bestsellerProducts.map(product => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="block py-1 px-3 text-base text-gray-600 hover:text-gray-900"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Disease Categories */}
        {allDiseases.map(disease => (
          <div key={disease.name}>
            <button
              onClick={() => handleDiseaseClick(disease.name)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-semibold transition-colors hover:bg-[#e0ecec]"
            >
              <span className="flex items-center gap-2">
                {expandedDisease === disease.name ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                {disease.name}
              </span>
              <span className="text-base text-gray-500">{disease.count}</span>
            </button>
            {expandedDisease === disease.name && (
              <div className="ml-4 mt-1">
                {products
                  .filter(product => product.disease === disease.name)
                  .map(product => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className="block py-1 px-3 text-base text-gray-600 hover:text-gray-900"
                    >
                      {product.name}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
