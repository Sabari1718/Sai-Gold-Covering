'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Gem, Heart, Palette } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';

const INTERESTS = [
  {
    title: 'Imitation Jewellery',
    tag: 'Chains, Malas & Harams',
    icon: Gem,
    description: 'Traditional 1-gram gold covering chains, kasu malas, lakshmi harams, and delicate daily studs.',
    image: '/images/products/chains/lakshmi-design-chain.jpg',
    href: '/shop?category=chains',
  },
  {
    title: 'Colourful Bangles',
    tag: 'Festive Sets & Kadas',
    icon: Palette,
    description: 'Dozens of vibrant glass bangles, screw-open peacock kadas, and ruby-emerald kemp stacks.',
    image: '/images/products/bangles/traditional-kundan-bangles.jpg',
    href: '/shop?category=bangles',
  },
  {
    title: 'Cosmetics & Skincare',
    tag: 'Lipsticks, Kajal & Creams',
    icon: Heart,
    description: 'Long-stay velvet liquid lipsticks, herbal waterproof kajal, and kumkumadi radiance creams.',
    image: '/images/products/cosmetics/lipstick-collection.jpg',
    href: '/shop?category=cosmetics',
  },
  {
    title: 'Fancy Fashion Items',
    tag: 'Hair Jadai, Bindis & Clips',
    icon: Sparkles,
    description: 'Bridal jadai billais, pearl claw clips, velvet bindis, and kundan silk saree brooch pins.',
    image: '/images/products/fancy-items/womens-fancy-accessories.jpg',
    href: '/shop?category=fancy-items',
  },
];

export default function ShopByInterestSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF2E6] to-[#FFF9F0] border-b border-[#D3AA57]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Curated Lifestyles"
          title="Shop by Interest"
          subtitle="Explore distinct collections tailored for brides, everyday professionals, and festive celebrations."
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {INTERESTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="bg-white border-2 border-[#E8D8C8] hover:border-[#D3AA57] overflow-hidden flex flex-col justify-between group shadow-md hover:shadow-xl hover:shadow-[#D3AA57]/15 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1E0A12]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-95 group-hover:opacity-100"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center text-[#591B2B] shadow-md border border-[#D3AA57]/40">
                    <Icon size={17} />
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D3AA57] block mb-1">
                      {item.tag}
                    </span>
                    <h3
                      className="text-lg font-bold text-[#591B2B] mb-2 leading-tight"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#33241F]/80 leading-relaxed mb-4 font-light">
                      {item.description}
                    </p>
                  </div>

                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#762C43] group-hover:text-[#591B2B] transition-colors pt-2 border-t border-dashed border-[#E8D8C8]"
                  >
                    <span>View Products</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1 text-[#D3AA57]" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
