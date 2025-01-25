"use client";

import { Suspense, useState } from "react";
import { TopBanner } from "./top-banner";
import { Navbar } from "./navbar";
import { MenuBanner } from "./menu-banner";
import { Footer } from "./footer";
import { useProducts } from "@/lib/contexts/product-context";
import { AlphabetFilter } from "./alphabet-filter";
import { DiseaseSidebar } from "./disease-sidebar";
import { Filter } from "lucide-react";

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

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

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
      <div className="hidden md:block">
        <TopBanner />
      </div>
      <Navbar />
      <MenuBanner />
      <main>
        <div className="container py-8" id="main-content">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-[#88bdbc] text-white rounded-md"
            >
              <Filter className="w-4 h-4" />
              {isMobileFiltersOpen ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div
              className={`${
                isMobileFiltersOpen ? "block" : "hidden"
              } md:block md:w-72 md:flex-shrink-0 space-y-4`}
            >
              {/* Alphabet Filter - Mobile */}
              <div className="md:hidden overflow-x-auto">
                <AlphabetFilter
                  selectedLetter={selectedLetter}
                  onLetterSelect={setSelectedLetter}
                />
              </div>

              {/* Disease Sidebar */}
              <DiseaseSidebar
                diseases={diseaseList}
                products={allProducts}
                selectedDisease={selectedDisease}
                onDiseaseSelect={setSelectedDisease}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Alphabet Filter - Desktop */}
              <div className="hidden md:block mb-6">
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
