'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import { categoryCards } from '@/data/products';

export default function CategorySection() {
  return (
    <section className="pt-6 sm:pt-8 md:pt-10 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <SectionHeader
        label="Explore Our Range"
        title="Shop by Category"
        subtitle="Browse through 9 vibrant categories covering 1-gram gold covering jewellery, colourful bangles, cosmetics, and fancy hair accessories."
        center
      />

      {/* 9 Clean Luxury Category Cards - Text Below Photo (No Messy Overlays) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-7">
        {categoryCards.map((cat, idx) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.04 }}
          >
            <Link
              href={cat.href}
              className="group flex flex-col h-full bg-[#FCFAF7] border border-[#E8D8C8] hover:border-[#D3AA57] rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              aria-label={`Shop ${cat.label}`}
            >
              {/* Crisp Unobscured Photo Container (Square 1:1 for perfect graphics display) */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#FAF4EA]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-104"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                />

                {/* Subtle Hover Sparkle Pill */}
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <span className="p-1 bg-[#591B2B] text-[#F3E0A2] rounded-full block shadow-md border border-[#D3AA57]/50">
                    <Sparkles size={11} />
                  </span>
                </div>
              </div>

              {/* Clean Typography Container Below Photo */}
              <div className="p-3 sm:p-4 md:p-4.5 flex flex-col flex-grow justify-between text-center bg-white border-t border-[#F2E7DC]">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#A98243] font-bold block mb-1">
                    Curated Collection
                  </span>
                  
                  <h3
                    className="text-sm sm:text-base md:text-lg font-bold text-[#301620] leading-snug group-hover:text-[#591B2B] transition-colors"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {cat.label}
                  </h3>
                  
                  <p className="text-[11px] sm:text-xs text-[#762C43]/70 line-clamp-1 mt-1 font-normal">
                    {cat.description}
                  </p>
                </div>
                
                <div className="mt-2.5 pt-2 border-t border-[#F4ECE3] inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-[#A98243] group-hover:text-[#591B2B] transition-colors">
                  <span>Explore Designs</span>
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1 text-[#D3AA57]" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
