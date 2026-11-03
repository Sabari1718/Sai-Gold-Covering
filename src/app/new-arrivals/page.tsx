import { getNewArrivals, formatPrice } from '@/data/products';
import ProductCard from '@/components/common/ProductCard';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'New Arrivals | Sai Gold Covering',
  description:
    'Discover the latest additions to our gold covering collections, featuring fresh seasonal designs and bridal pieces.',
};

export default function NewArrivalsPage() {
  const newItems = getNewArrivals();

  return (
    <div className="bg-[#FAF8F3] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C6A15B]/15 text-[#A98243] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={13} />
            Just Added
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#30251D] mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            New Arrivals
          </h1>
          <div className="w-12 h-0.5 bg-[#C6A15B] mx-auto mb-4" />
          <p className="text-sm text-[#6B5744]">
            Be the first to wear our newest traditional and modern creations. Handpicked
            for discerning jewellery lovers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {newItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#30251D] text-[#FAF8F3] p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <h3
            className="text-xl sm:text-2xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Looking for something custom or specific?
          </h3>
          <p className="text-xs sm:text-sm text-[#FAF8F3]/70 mb-6 max-w-md mx-auto">
            Contact us directly on WhatsApp with your design preference or visit our store
            in Malumichampatti, Coimbatore.
          </p>
          <Link
            href="/contact"
            className="inline-block px-7 py-3 bg-[#C6A15B] text-[#30251D] text-xs font-bold uppercase tracking-wider hover:bg-[#A98243] transition-colors"
          >
            Visit Our Store
          </Link>
        </div>
      </div>
    </div>
  );
}

