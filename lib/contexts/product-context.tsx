'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProductService, Product } from '@/lib/api';

interface ProductContextType {
  products: Product[];
  allProducts: Product[];
  loading: boolean;
  selectedLetter: string | null;
  setSelectedLetter: (letter: string | null) => void;
  selectedDisease: string | null;
  setSelectedDisease: (disease: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
        console.error('Error fetching products:', error);
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

  const filteredProducts: Product[] = allProducts.filter((product): product is Product => {
    const matchesLetter =
      selectedLetter === null || product.name.charAt(0).toUpperCase() === selectedLetter;
    const matchesDisease = selectedDisease === null || product.disease === selectedDisease;
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.disease.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLetter && matchesDisease && matchesSearch;
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
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
