'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Info, FileText, Phone, HelpCircle } from 'lucide-react';

export function MenuBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['/banner3.png'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border-b bg-white">
      <div className="container">
        <div className="flex items-center justify-between my-1.5">
          {/* Menu */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium hover:text-teal-600 transition-colors"
            >
              <Home className="h-4 w-4 text-[#254e58]" />
              <span className="text-[#254e58] font-bold text-base">Home</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 text-sm font-medium hover:text-teal-600 transition-colors"
            >
              <Info className="h-4 w-4 text-[#254e58]" />
              <span className="text-[#254e58] font-bold text-base">About us</span>
            </Link>
            <Link
              href="/faq"
              className="flex items-center gap-2 text-sm font-medium hover:text-teal-600 transition-colors"
            >
              <HelpCircle className="h-4 w-4 text-[#254e58]" />
              <span className="text-[#254e58] font-bold">FAQ</span>
            </Link>
            <Link
              href="/policy"
              className="flex items-center gap-2 text-sm font-medium hover:text-teal-600 transition-colors"
            >
              <FileText className="h-4 w-4 text-[#254e58]" />
              <span className="text-[#254e58] font-bold text-base">Policy</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-sm font-medium hover:text-teal-600 transition-colors"
            >
              <Phone className="h-4 w-4 text-[#254e58]" />
              <span className="text-[#254e58] font-bold text-base">Contact Us</span>
            </Link>
          </div>

          {/* Banners */}
          <div className="flex gap-2 h-[60px]">
            {/* Slider */}
            <div className="relative w-[400px] rounded overflow-hidden">
              {slides.map((slide, index) => (
                <Image
                  key={slide}
                  src={slide}
                  alt={`Banner ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className={`object-contain transition-opacity ${
                    currentSlide === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  priority={index === 0}
                />
              ))}
            </div>

            {/* Fixed Banner */}
            <div className="relative w-[180px] rounded overflow-hidden">
              <Image
                src="/banner4.png"
                alt="Special Offer"
                fill
                sizes="(max-width: 768px) 100vw, 180px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
