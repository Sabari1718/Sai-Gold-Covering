'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';

const FEATURED_HIGHLIGHTS = [
  {
    tag: 'Festive & Temple',
    title: 'Jewellery Collection',
    subtitle: 'Pure 1-Gram Micro Gold Plated',
    description: 'Traditional gold covering chains, kasu malas, grand bridal harams, and intricate antique kemp necklace sets.',
    image: '/images/hero/hero-bridal-set.jpg',
    cta: 'Explore Jewellery',
    href: '/shop?category=necklaces',
  },
  {
    tag: 'Wrist Elegance',
    title: 'Colourful Bangles Collection',
    subtitle: 'Festive Glass, Metal & Kundan Stacks',
    description: 'Textured 4-piece daily bangles, peacock kadas, festive colourful glass dozens, and ruby-green stone sets.',
    image: '/images/hero/hero-bangles.jpg',
    cta: 'Shop Bangles',
    href: '/shop?category=bangles',
  },
  {
    tag: 'Everyday Radiance',
    title: 'Cosmetics & Beauty Essentials',
    subtitle: 'Enriched Beauty & Skincare Formulations',
    description: 'Velvet matte lipsticks, 24hr smudge-proof herbal kajal, SPF compact powders, and kumkumadi daily skin glow.',
    image: '/images/hero/hero-cosmetics.jpg',
    cta: 'Explore Cosmetics',
    href: '/shop?category=cosmetics',
  },
];

export default function FeaturedSection() {
  return (
    <section className="pt-6 sm:pt-8 md:pt-10 pb-10 sm:pb-14 bg-gradient-to-b from-[#FAF4EA] via-[#FFFDF9] to-[#FAF4EA] border-y border-[#D3AA57]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Handcrafted Highlights"
          title="Featured Collections"
          subtitle="Discover our three signature pillars: imitation gold jewellery, colourful bangles, and enriched beauty cosmetics."
          center
        />

        {/* 3 Ultra-Crisp High-Quality Featured Collection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {FEATURED_HIGHLIGHTS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="group flex flex-col bg-white border-2 border-[#E8D8C8] hover:border-[#D3AA57] rounded-sm overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#D3AA57]/20 transition-all duration-400"
            >
              {/* Ultra High-Resolution Image Container - 100% Brightness & Clarity */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#FAF2E6]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />

                {/* Top Corner Floating Luxury Badge */}
                <div className="absolute top-3 left-3 bg-[#591B2B] text-[#FFF9F0] border border-[#D3AA57] px-3 py-1 flex items-center gap-1.5 shadow-md">
                  <Sparkles size={11} className="text-[#F3E0A2]" />
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#FFF9F0]">
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Clean Luxury Content Area Below Photo */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-white text-left">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#A98243] font-bold block mb-1">
                    {item.subtitle}
                  </span>

                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#301620] mb-2 leading-snug group-hover:text-[#591B2B] transition-colors"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#422B24]/80 leading-relaxed font-normal mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Luxury Action Button */}
                <Link
                  href={item.href}
                  className="w-full py-3 px-4 bg-[#FFF9F0] group-hover:bg-[#591B2B] border-2 border-[#591B2B] group-hover:border-[#591B2B] text-[#591B2B] group-hover:text-[#FFF9F0] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
                >
                  <span>{item.cta}</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
