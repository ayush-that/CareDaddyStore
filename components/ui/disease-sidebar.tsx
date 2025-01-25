"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Disease {
  name: string;
  count: number;
}

interface Product {
  id: number;
  name: string;
  disease: string;
  slug: string;
}

interface DiseaseSidebarProps {
  diseases: Disease[];
  products: Product[];
  selectedDisease: string | null;
  onDiseaseSelect: (disease: string | null) => void;
}

export function DiseaseSidebar({
  diseases,
  products,
  selectedDisease,
  onDiseaseSelect,
}: DiseaseSidebarProps) {
  const [expandedDisease, setExpandedDisease] = useState<string | null>(null);

  const handleDiseaseClick = (disease: string) => {
    if (expandedDisease === disease) {
      setExpandedDisease(null);
    } else {
      setExpandedDisease(disease);
    }
  };

  return (
    <div className="bg-[#eff9fa] rounded-lg px-4 py-3">
      <h2 className="text-lg font-semibold mb-2">Categories</h2>
      <div className="space-y-1">
        {diseases.map((disease) => (
          <div key={disease.name}>
            <button
              onClick={() => handleDiseaseClick(disease.name)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors hover:bg-[#e0ecec]"
            >
              <span className="flex items-center gap-2">
                {expandedDisease === disease.name ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                {disease.name}
              </span>
              <span className="text-sm text-gray-500">{disease.count}</span>
            </button>
            {expandedDisease === disease.name && (
              <div className="ml-4 mt-1 space-y-1">
                {products
                  .filter((product) => product.disease === disease.name)
                  .map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className="block py-1 px-3 text-sm text-gray-600 hover:text-gray-900"
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
