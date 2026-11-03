'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import ProductCard from '@/components/common/ProductCard';
import { getBestsellers, products as defaultProducts } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import type { ProductCategory } from '@/types';

export default function BestsellersSection() {
  const { products: storeProducts } = useStore();
  const allProducts = storeProducts && storeProducts.length > 0 ? storeProducts : defaultProducts;
  const [selectedCat, setSelectedCat] = useState<'all' | ProductCategory>('all');
  
  const allBestsellers = allProducts.filter((p) => p.isBestSeller || p.isFeatured);
  const displayProducts =
    selectedCat === 'all'
      ? (allBestsellers.length > 0 ? allBestsellers : allProducts).slice(0, 8)
      : allProducts.filter((p) => p.category === selectedCat).slice(0, 8);

  const categories = [
    { id: 'all', label: 'All Bestsellers' },
    { id: 'chains', label: 'Chains' },
    { id: 'bangles', label: 'Bangles' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'cosmetics', label: 'Cosmetics' },
    { id: 'fancy-items', label: 'Fancy Items' },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5">
        <SectionHeader
          label="Proven Customer Favourites"
          title="Bestsellers Showcase"
          subtitle="The most-adored gold chains, colourful bangles, and long-stay cosmetics loved by our Coimbatore clientele."
        />

        {/* Filter Pills with Luxury Styling */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 self-start md:self-auto">
          {categories.map((c) => {
            const isActive = selectedCat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id as 'all' | ProductCategory)}
                className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ECC880] via-[#D3AA57] to-[#B88E3E] text-[#1A0B10] shadow-md border border-[#D3AA57]'
                    : 'bg-white border border-[#E8D8C8] text-[#33241F] hover:border-[#D3AA57] hover:text-[#591B2B]'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: 2 mobile, 3 tablet, 4 desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/shop"
          className="btn-gold-royal inline-flex items-center gap-2.5 px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300"
        >
          <span>Explore All 50 Designs</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
