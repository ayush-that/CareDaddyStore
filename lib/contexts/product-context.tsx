"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductService } from "@/lib/api";

interface Product {
  id: number;
  name: string;
  disease: string;
  price: number;
  image: string;
  rating: number;
  slug: string;
}

interface ProductContextType {
  products: Product[];
  allProducts: Product[];
  loading: boolean;
  selectedLetter: string | null;
  setSelectedLetter: (letter: string | null) => void;
  selectedDisease: string | null;
  setSelectedDisease: (disease: string | null) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductService.getAllProducts();
        if (mounted) {
          setAllProducts(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = allProducts.filter((product) => {
    const matchesLetter =
      selectedLetter === null ||
      product.name.charAt(0).toUpperCase() === selectedLetter;
    const matchesDisease =
      selectedDisease === null || product.disease === selectedDisease;
    return matchesLetter && matchesDisease;
  });

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        allProducts,
        loading,
        selectedLetter,
        setSelectedLetter,
        selectedDisease,
        setSelectedDisease,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
