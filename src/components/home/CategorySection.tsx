'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import { categoryCards } from '@/data/products';

// Distinct rich jewel gradients for each category so they are never "all brown"
const CATEGORY_GRADIENTS = [
  'from-[#4A1525] via-[#591B2B]/80', // Chains
  'from-[#5A1024] via-[#762C43]/80', // Necklaces
  'from-[#6E1A33] via-[#852E47]/80', // Bangles
  'from-[#4E2A12] via-[#6B3E1E]/80', // Earrings
  'from-[#2B2338] via-[#433857]/80', // Anklets
  'from-[#4F0F32] via-[#6E1C48]/80', // Cosmetics
  'from-[#103E2E] via-[#1E5742]/80', // Skincare
  'from-[#14324D] via-[#1F496E]/80', // Fancy
  'from-[#5C161D] via-[#7B202B]/80', // Bridal
];

export default function CategorySection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <SectionHeader
        label="Explore Our Range"
        title="Shop by Category"
        subtitle="Browse through 9 vibrant categories covering 1-gram gold covering jewellery, colourful bangles, cosmetics, and fancy hair accessories."
        center
      />

      {/* 9 Rich Visual Category Cards Grid with Distinct Jewel Tones */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {categoryCards.map((cat, idx) => {
          const gradient = CATEGORY_GRADIENTS[idx % CATEGORY_GRADIENTS.length];
          return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
            >
              <Link
                href={cat.href}
                className="group block relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-white border-2 border-[#E8D8C8] hover:border-[#D3AA57] transition-all duration-500 shadow-md hover:shadow-2xl hover:shadow-[#D3AA57]/20"
                aria-label={`Shop ${cat.label}`}
              >
                {/* Product Image */}
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                />

                {/* Unique Jewel-Tone Scrim per Category */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${gradient} to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300`}
                />

                {/* Top Corner Floating Sparkle Badge */}
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="p-1.5 bg-[#D3AA57] text-[#1A0B10] block shadow-md">
                    <Sparkles size={11} />
                  </span>
                </div>

                {/* Text Information Inside Card */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end text-[#FFF9F0]">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#F3E0A2] font-bold mb-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D3AA57]" />
                    Curated Collection
                  </span>
                  
                  <h3
                    className="text-base sm:text-xl font-bold leading-tight mb-1 group-hover:text-[#F3E0A2] transition-colors"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {cat.label}
                  </h3>
                  
                  <p className="text-[11px] sm:text-xs text-[#FFF9F0]/85 line-clamp-1 mb-3 font-light">
                    {cat.description}
                  </p>
                  
                  <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-[#D3AA57] group-hover:text-white transition-colors">
                    <span>Explore Designs</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Bottom Gold Accent Line */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-[#D3AA57] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
