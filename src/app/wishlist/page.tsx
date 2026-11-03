'use client';

import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/common/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistItems, wishlistCount } = useStore();

  if (wishlistCount === 0) {
    return (
      <div className="bg-[#FAF8F3] min-h-[75vh] flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md bg-white border border-[#E8DDD0] p-10 sm:p-14">
          <div className="w-16 h-16 bg-[#FAF8F3] rounded-full flex items-center justify-center mx-auto mb-6 text-[#A98243]">
            <Heart size={28} />
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#30251D] mb-3"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Your Wishlist is Empty
          </h1>
          <p className="text-sm text-[#6B5744] mb-8 leading-relaxed">
            Save pieces you love by clicking the heart icon on any design. Come back anytime
            to review or order them.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C6A15B] text-[#30251D] text-xs font-bold uppercase tracking-wider hover:bg-[#A98243] transition-colors"
          >
            Discover Jewellery <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F3] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-[#E8DDD0]">
          <h1
            className="text-3xl sm:text-4xl font-bold text-[#30251D]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Saved Items ({wishlistCount})
          </h1>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-[#A98243] hover:underline"
          >
            Browse More
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistItems.map((item) => (
            <ProductCard key={item.product.id} product={item.product} />
          ))}
        </div>
      </div>
    </div>
  );
}

