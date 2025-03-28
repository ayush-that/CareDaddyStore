'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { PackageOptions } from './package-options';

interface ProductDetailProps {
  product: {
    name: string;
    rating: number;
    sku: string;
    description: string;
    longDescription: string;
    safetyInfo: string;
    sideEffects: string;
    image: string;
    price: number;
    disease?: string;
    slug?: string;
  };
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isSafetyInfoExpanded, setIsSafetyInfoExpanded] = useState(false);
  const [isSideEffectsExpanded, setIsSideEffectsExpanded] = useState(false);
  const maxLength = 300;

  const truncateText = (text: string, isExpanded: boolean) => {
    if (text.length <= maxLength) return text;
    return isExpanded ? text : `${text.substring(0, maxLength)}...`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Product Header with Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6">
        {/* Image */}
        <div className="relative h-[300px] sm:h-[400px] bg-white p-4 sm:p-6 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2 sm:p-4"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex flex-col gap-2 text-sm mb-4">
              <div className="text-green-600 font-medium">
                Availability: In Stock {product.sku} packs
              </div>
              <div className="inline-flex items-center gap-2 flex-wrap">
                <span className="text-gray-500">Treats:</span>
                <span className="bg-gradient-to-r from-[#88bdbc] to-[#619695] text-white px-3 py-1 rounded-full text-xs font-medium">
                  {product.disease || 'General'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-4 flex-wrap">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 sm:w-5 h-4 sm:h-5 ${
                      i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">/ {product.rating} out of 5</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-2xl sm:text-3xl font-bold text-[#88bdbc]">
              ${product.price.toFixed(2)}
              <span className="text-xs sm:text-sm font-normal text-gray-600 ml-2">/ Per Pill</span>
            </div>
            <p className="product-description text-gray-600 text-sm sm:text-base">
              {truncateText(product.description, isDescriptionExpanded)}
            </p>
            {product.description.length > maxLength && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-[#88bdbc] hover:text-[#619695] font-medium text-sm"
              >
                {isDescriptionExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 border-t">
        {(product.slug === 'viagra' ||
          product.slug === 'cialis' ||
          product.slug === 'super-ed-trial-pack' ||
          product.slug === 'cialis-professional' ||
          product.slug === 'levitra') && (
          <PackageOptions
            productName={product.name}
            productSku={product.sku}
            productImage={product.image}
            slug={product.slug}
          />
        )}

        {/* Detailed Description */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            Detailed Description
          </h2>
          <p className="product-description text-gray-600 whitespace-pre-line text-sm sm:text-base">
            {truncateText(product.longDescription, isDescriptionExpanded)}
          </p>
          {product.longDescription.length > maxLength && (
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="text-[#88bdbc] hover:text-[#619695] font-medium mt-2 text-sm"
            >
              {isDescriptionExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Safety Information */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            Safety Information
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-3 sm:p-4 rounded-md border border-blue-100">
            <p className="product-description text-gray-600 text-sm sm:text-base">
              {truncateText(product.safetyInfo, isSafetyInfoExpanded)}
            </p>
            {product.safetyInfo.length > maxLength && (
              <button
                onClick={() => setIsSafetyInfoExpanded(!isSafetyInfoExpanded)}
                className="text-[#88bdbc] hover:text-[#619695] font-medium mt-2 text-sm"
              >
                {isSafetyInfoExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
        </div>

        {/* Side Effects */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Side Effects</h2>
          <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-3 sm:p-4 rounded-md border border-red-100">
            <p className="product-description text-gray-600 text-sm sm:text-base">
              {truncateText(product.sideEffects, isSideEffectsExpanded)}
            </p>
            {product.sideEffects.length > maxLength && (
              <button
                onClick={() => setIsSideEffectsExpanded(!isSideEffectsExpanded)}
                className="text-[#88bdbc] hover:text-[#619695] font-medium mt-2 text-sm"
              >
                {isSideEffectsExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
