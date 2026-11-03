'use client';

import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductReviewsSection from '@/components/product/ProductReviewsSection';
import ProductCard from '@/components/common/ProductCard';
import SectionHeader from '@/components/common/SectionHeader';
import type { Product } from '@/types';

interface Props {
  initialProduct?: Product | null;
  slug: string;
}

export default function ProductDetailClient({ initialProduct, slug }: Props) {
  const { getProductBySlug, products } = useStore();
  const product = getProductBySlug(slug) || initialProduct;

  if (!product) {
    return (
      <div className="bg-[#FFF9F0] min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1
          className="text-3xl font-bold text-[#591B2B] mb-3"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Product Not Found
        </h1>
        <p className="text-sm text-[#8E7A70] mb-6 max-w-md">
          The requested jewellery or cosmetic item might have been updated or removed from our catalog.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3 bg-[#591B2B] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#762C43] transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  // Related products from same category
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-[#FFF9F0] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#8E7A70] mb-8 uppercase tracking-wider overflow-x-auto pb-1">
          <Link href="/" className="hover:text-[#591B2B]">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#591B2B]">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-[#591B2B]"
          >
            {product.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-[#591B2B] font-bold truncate">{product.name}</span>
        </nav>

        {/* Gallery Left + Info Right Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-12 items-start">
          <ProductGallery images={product.gallery} name={product.name} />
          <ProductInfo product={product} />
        </div>

        {/* Customer Ratings & Reviews (Flipkart Style) */}
        <ProductReviewsSection product={product} />

        {/* Related Products */}
        {related.length > 0 && (
          <div className="border-t border-[#E8D8C8] pt-16">
            <SectionHeader
              label="Pair It With"
              title="Related Designs"
              subtitle={`More exquisite picks from our ${product.categoryLabel} collection.`}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

