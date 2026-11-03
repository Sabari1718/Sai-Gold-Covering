import { Suspense } from 'react';
import ShopClient from '@/components/shop/ShopClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop All Collections | Sai Gold Covering',
  description:
    'Explore our complete catalogue of gold covering imitation jewellery, bridal collections, lipsticks, skincare, and fashionable hair accessories.',
};

export default function ShopPage() {
  return (
    <div className="bg-[#FAF7F1] min-h-screen">
      {/* Editorial Header */}
      <div className="border-b border-[#E8DFD3] py-14 sm:py-20 text-center px-4 bg-[#F1EADF]/40">
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#A98243] block mb-2">
          The Full Emporium
        </span>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#54252C] mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          All Collections
        </h1>
        <div className="w-12 h-0.5 bg-[#C6A15B] mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-[#5A473E] max-w-lg mx-auto leading-relaxed">
          From traditional temple gold covering sets to velvet lipsticks and hair jadai billais —
          discover pieces crafted for everyday beauty and festive grandeur.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-20 text-xs text-[#8E7A70]">Loading emporium...</div>}>
        <ShopClient />
      </Suspense>
    </div>
  );
}
