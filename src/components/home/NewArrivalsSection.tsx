'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import ProductCard from '@/components/common/ProductCard';
import { getNewArrivals, products as defaultProducts } from '@/data/products';
import { useStore } from '@/context/StoreContext';

export default function NewArrivalsSection() {
  const { products: storeProducts } = useStore();
  const allProducts = storeProducts && storeProducts.length > 0 ? storeProducts : defaultProducts;
  const newProducts = allProducts.filter((p) => p.isNewArrival);
  const displayProducts = newProducts.length > 0 ? newProducts : allProducts.slice(0, 10);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-[#FFF9F0] via-[#FAF2E6] to-[#FFF9F0] border-b border-[#D3AA57]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-7 gap-4">
          <SectionHeader
            label="Seasonal Fresh Drops"
            title="New Arrivals Carousel"
            subtitle="Explore our newly arrived 1-gram gold chains, stone bangles, lipstick collections, and decorative hair accessories."
          />

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-none border-2 border-[#D3AA57] bg-white flex items-center justify-center text-[#591B2B] hover:bg-[#591B2B] hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Previous Products"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-none border-2 border-[#D3AA57] bg-white flex items-center justify-center text-[#591B2B] hover:bg-[#591B2B] hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Next Products"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="w-[260px] sm:w-[300px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/new-arrivals"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#591B2B] hover:text-[#D3AA57] transition-colors border-b-2 border-[#591B2B] pb-1 hover:border-[#D3AA57]"
          >
            <span>View All New Arrivals</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
