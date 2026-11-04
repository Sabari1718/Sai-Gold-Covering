'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { InstagramIcon } from '@/components/common/Icons';
import { SITE_CONFIG } from '@/lib/config';
import SectionHeader from '@/components/common/SectionHeader';

// 6 distinct lifestyle images: jewellery, makeup, lipsticks, bangles, fancy items
const INSTAGRAM_TILES = [
  {
    image: '/images/products/necklaces/temple-jewellery-necklace.jpg',
    tag: '#TempleJhumkas',
    caption: 'Temple Jewellery & Harams',
  },
  {
    image: '/images/products/cosmetics/lipstick-collection.jpg',
    tag: '#VelvetLipsticks',
    caption: 'Long-Stay Matte Lipsticks',
  },
  {
    image: '/images/products/bangles/antique-gold-bangles.jpg',
    tag: '#DailyGoldBangles',
    caption: 'Antique Gold Kadas',
  },
  {
    image: '/images/products/cosmetics/makeup-kit.jpg',
    tag: '#BridalMakeup',
    caption: 'Bridal Beauty Essentials',
  },
  {
    image: '/images/products/fancy-items/womens-fancy-accessories.jpg',
    tag: '#JadaiBillai',
    caption: 'Hair Accessories & Pins',
  },
  {
    image: '/images/products/necklaces/bridal-necklace-set.jpg',
    tag: '#MuhurthamSets',
    caption: 'Muhurtham Bridal Sets',
  },
];

export default function InstagramSection() {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-[#FFF9F0] to-[#FAF2E6] border-b border-[#D3AA57]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          label="Social Community"
          title="Follow Our Everyday Sparkle"
          subtitle="Get inspired with real Indian wedding jewellery pairings, makeup swatches, and new arrivals on Instagram."
          center
        />

        {/* 6-Item Image Grid with Royal Gold Frames */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {INSTAGRAM_TILES.map((tile, i) => (
            <motion.a
              key={tile.tag}
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative aspect-square overflow-hidden bg-[#1E0A12] border-2 border-[#E8D8C8] hover:border-[#D3AA57] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={tile.image}
                alt={tile.tag}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />

              {/* Hover Dark Overlay with Instagram Icon & Tag */}
              <div className="absolute inset-0 bg-[#591B2B]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
                <div className="w-9 h-9 rounded-full bg-[#D3AA57] text-[#1A0B10] flex items-center justify-center mb-2 shadow-md">
                  <InstagramIcon size={18} />
                </div>
                <span className="text-[11px] font-bold text-[#F3E0A2] tracking-wider block mb-1">
                  {tile.tag}
                </span>
                <span className="text-[9px] text-[#FFF9F0]/80 line-clamp-1">
                  {tile.caption}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Instagram Follow CTA */}
        <div className="text-center">
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#591B2B] to-[#762C43] text-white text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-[#591B2B]/30 transition-all duration-300 border border-[#D3AA57]/40"
          >
            <InstagramIcon size={16} className="text-[#D3AA57]" />
            <span>Follow @saigoldcovering on Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
}
