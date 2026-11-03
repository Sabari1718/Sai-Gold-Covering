'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';

const THREE_BANNERS = [
  {
    tag: 'Festive & Temple',
    title: 'Jewellery Collection',
    description: 'Traditional gold covering chains, kasu malas, grand bridal haarams, and intricate kemp necklaces.',
    image: '/images/products/necklaces/temple-jewellery-necklace.jpg',
    cta: 'Explore Jewellery',
    href: '/shop?category=necklaces',
    accentColor: '#591B2B',
  },
  {
    tag: 'Wrist Elegance',
    title: 'Colourful Bangles Collection',
    description: 'Textured 4-piece daily bangles, peacock kadas, festive glass dozens, and ruby-green stone stacks.',
    image: '/images/products/bangles/colourful-glass-bangles.jpg',
    cta: 'Shop Bangles',
    href: '/shop?category=bangles',
    accentColor: '#762C43',
  },
  {
    tag: 'Everyday Radiance',
    title: 'Cosmetics & Beauty Essentials',
    description: 'Enriched velvet matte lipsticks, 24hr herbal smudge-proof kajal, SPF compacts, and kumkumadi skin glow.',
    image: '/images/products/cosmetics/lipstick-collection.jpg',
    cta: 'Explore Cosmetics',
    href: '/shop?category=cosmetics',
    accentColor: '#315D48',
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF2E6] via-[#FFF9F0] to-[#FAF2E6] border-y border-[#D3AA57]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Handcrafted Highlights"
          title="Featured Collections"
          subtitle="Discover our three signature pillars: imitation gold jewellery, colourful bangles, and enriched beauty cosmetics."
          center
        />

        {/* Three Promotional Banners with Royal Framing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {THREE_BANNERS.map((banner, index) => (
            <motion.div
              key={banner.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative overflow-hidden group border-2 border-[#D3AA57]/40 hover:border-[#D3AA57] bg-[#1A0B10] shadow-lg hover:shadow-2xl hover:shadow-[#D3AA57]/20 flex flex-col justify-end min-h-[420px] sm:min-h-[460px] transition-all duration-500"
            >
              {/* Background Local Image */}
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-85 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14050C] via-[#220E15]/60 to-transparent group-hover:from-[#1A0710] transition-colors duration-500" />

              {/* Text Information Inside Banner */}
              <div className="relative z-10 p-6 sm:p-7 text-[#FFF9F0]">
                {/* Gold Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#ECC880] to-[#D3AA57] text-[#1A0B10] text-[10px] font-black uppercase tracking-wider mb-3 shadow-md">
                  <Sparkles size={11} />
                  <span>{banner.tag}</span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl font-bold mb-2.5 leading-tight group-hover:text-[#F3E0A2] transition-colors"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {banner.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#FFF9F0]/85 leading-relaxed mb-6 font-light">
                  {banner.description}
                </p>

                <Link
                  href={banner.href}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D3AA57] hover:text-white transition-colors group/btn"
                >
                  <span className="border-b border-[#D3AA57] pb-0.5 group-hover/btn:border-white">
                    {banner.cta}
                  </span>
                  <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1.5" />
                </Link>
              </div>

              {/* Gold Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D3AA57] to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
