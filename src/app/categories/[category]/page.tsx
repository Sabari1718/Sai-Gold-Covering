import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ShopClient from '@/components/shop/ShopClient';
import type { ProductCategory } from '@/types';
import type { Metadata } from 'next';

const CATEGORY_MAP: Record<
  string,
  { label: string; description: string; category: ProductCategory }
> = {
  chains: {
    label: 'Chains & Long Chains',
    description: '10 distinct 1-gram gold covering chains, 30-inch cascading malas, and temple kasu chains.',
    category: 'chains',
  },
  bangles: {
    label: 'Colourful Bangles & Kadas',
    description: '10 distinct bangles: daily 4-piece sets, peacock screw kadas, glass dozens, and kemp stacks.',
    category: 'bangles',
  },
  necklaces: {
    label: 'Necklace Sets & Chokers',
    description: '10 distinct necklace sets: South Indian bridal sets, temple malas, chokers, and ruby stones.',
    category: 'necklaces',
  },
  cosmetics: {
    label: 'Cosmetics & Beauty Essentials',
    description: '10 distinct beauty essentials: velvet matte lipsticks, 24hr herbal kajal, compacts, and creams.',
    category: 'cosmetics',
  },
  'fancy-items': {
    label: 'Fancy Fashion Accessories',
    description: '10 distinct fashion accessories: bridal jadai billais, claw clips, velvet bindis, and kolusu anklets.',
    category: 'fancy-items',
  },
};

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((c) => ({
    category: c,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const info = CATEGORY_MAP[category];

  if (!info) return { title: 'Category Not Found' };

  return {
    title: `${info.label} | Sai Gold Covering`,
    description: info.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const info = CATEGORY_MAP[category];

  if (!info) {
    notFound();
  }

  return (
    <div className="bg-[#FFF9F0] min-h-screen">
      {/* Category Hero Banner */}
      <div className="border-b border-[#E8D8C8] py-14 sm:py-20 text-center px-4 bg-[#F7DDD1]/30">
        <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#D3AA57] mb-3">
          Category Collection
        </p>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#591B2B] mb-4"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {info.label}
        </h1>
        <div className="w-12 h-0.5 bg-[#D3AA57] mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-[#33241F]/80 max-w-lg mx-auto leading-relaxed">
          {info.description}
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-20 text-xs text-[#8E7A70]">Loading collection...</div>}>
        <ShopClient initialCategory={info.category} />
      </Suspense>
    </div>
  );
}
