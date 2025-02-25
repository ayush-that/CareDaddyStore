'use client';

import { useProducts } from '@/lib/contexts/product-context';

interface AlphabetFilterProps {
  selectedLetter: string | null;
  onLetterSelect: (letter: string | null) => void;
}

export function AlphabetFilter({ selectedLetter, onLetterSelect }: AlphabetFilterProps) {
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="w-full bg-gradient-to-b from-[#f5f9fa] to-[#e5f4f5] p-2 rounded-lg overflow-x-auto">
      <div className="flex items-center justify-between min-w-max">
        <button
          onClick={() => onLetterSelect(null)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            selectedLetter === null ? 'bg-[#88bdbc] text-white' : 'text-gray-600 hover:bg-[#e0ecec]'
          }`}
        >
          ALL
        </button>
        {ALPHABET.map(letter => (
          <button
            key={letter}
            onClick={() => onLetterSelect(letter)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              selectedLetter === letter
                ? 'bg-[#88bdbc] text-white'
                : 'text-gray-600 hover:bg-[#e0ecec]'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}
