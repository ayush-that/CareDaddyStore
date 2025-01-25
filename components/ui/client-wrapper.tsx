"use client";

import { Suspense } from "react";
import { TopBanner } from "./top-banner";
import { Navbar } from "./navbar";
import { MenuBanner } from "./menu-banner";
import { Footer } from "./footer";
import { useProducts } from "@/lib/contexts/product-context";
import { AlphabetFilter } from "./alphabet-filter";
import { DiseaseSidebar } from "./disease-sidebar";

function Loading() {
  return <div className="h-screen bg-gray-100 animate-pulse" />;
}

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const {
    allProducts,
    loading,
    selectedLetter,
    setSelectedLetter,
    selectedDisease,
    setSelectedDisease,
  } = useProducts();

  // Calculate disease counts from all products
  const diseaseCounts = allProducts.reduce(
    (acc: { [key: string]: number }, product) => {
      if (product.disease) {
        acc[product.disease] = (acc[product.disease] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  const diseaseList = Object.entries(diseaseCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <TopBanner />
      <Navbar />
      <MenuBanner />
      <main>
        <div className="container py-8" id="main-content">
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-72 flex-shrink-0">
              <DiseaseSidebar
                diseases={diseaseList}
                products={allProducts}
                selectedDisease={selectedDisease}
                onDiseaseSelect={setSelectedDisease}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-6">
                <AlphabetFilter
                  selectedLetter={selectedLetter}
                  onLetterSelect={setSelectedLetter}
                />
              </div>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
