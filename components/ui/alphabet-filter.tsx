"use client";

import { Button } from "@/components/ui/button";

interface AlphabetFilterProps {
  selectedLetter: string | null;
  onLetterSelect: (letter: string | null) => void;
}

export function AlphabetFilter({
  selectedLetter,
  onLetterSelect,
}: AlphabetFilterProps) {
  const letters = [
    "ALL",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      <div className="flex items-center px-4 py-3">
        <div className="text-sm font-medium text-gray-500 mr-4">ALPHABET:</div>
        <div className="flex items-center gap-1 flex-1">
          {letters.map((letter) => (
            <Button
              key={letter}
              variant="ghost"
              onClick={() => onLetterSelect(letter === "ALL" ? null : letter)}
              className={`h-7 min-w-[28px] px-2 rounded hover:bg-[#88bdbc] hover:text-white transition-colors ${
                (letter === "ALL" && selectedLetter === null) ||
                letter === selectedLetter
                  ? "bg-[#88bdbc] text-white px-3"
                  : "bg-transparent text-gray-600"
              }`}
            >
              {letter}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
