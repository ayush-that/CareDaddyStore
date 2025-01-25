"use client";

import { useProducts } from "@/lib/contexts/product-context";

export function AlphabetFilter() {
  const { selectedLetter, setSelectedLetter } = useProducts();
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="w-full bg-[#f5f9fa] p-2">
      <div className="flex flex-wrap items-center gap-1">
        <button
          onClick={() => setSelectedLetter(null)}
          className={`min-w-[2.5rem] px-2 py-1 rounded text-sm font-medium transition-colors ${
            selectedLetter === null
              ? "bg-[#88bdbc] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          ALL
        </button>
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => setSelectedLetter(letter)}
            className={`min-w-[2rem] px-2 py-1 rounded text-sm font-medium transition-colors ${
              selectedLetter === letter
                ? "bg-[#88bdbc] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
