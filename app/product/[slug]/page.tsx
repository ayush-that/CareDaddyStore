'use client';

import { useEffect, useState } from 'react';
import { ProductDetail } from '@/components/ui/product-detail';
import { ProductService } from '@/lib/api';
import { ClientWrapper } from '@/components/ui/client-wrapper';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await ProductService.getProductBySlug(params.slug);
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  const content = loading ? (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  ) : error ? (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
        <p className="text-gray-600">
          The product you're looking for could not be found. Please check the URL and try again.
        </p>
      </div>
    </div>
  ) : (
    <ProductDetail product={product} />
  );

  return <ClientWrapper>{content}</ClientWrapper>;
}
