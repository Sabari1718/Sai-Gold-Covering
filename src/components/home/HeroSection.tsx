'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Sparkles, MessageCircle, MapPin, ShieldCheck, Star, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/config';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Vanakkam Sai Gold Covering! I am visiting your website and would like to order jewellery / browse new collections.'
  )}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EA] to-[#F3E7D5] text-[#33241F] border-b border-[#D3AA57]/40">
      
      {/* Ambient Lighting & Royal Golden Glows */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ECC880 0%, transparent 65%)' }}
      />
      <div
        className="absolute bottom-0 left-10 w-[450px] h-[450px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #E9B7BC 0%, transparent 65%)' }}
      />

      {/* Subtle Luxury Pattern Watermark */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l4 12 12-4-4 12 12 4-12 4 4 12-12-4-4 12-4-12-12 4 4-12-12-4 12-4-4-12 12 4z' fill='%23591B2B' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ── Left Column: Editorial Brand Headline & CTAs (7 cols) ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center z-10"
          >
            {/* Royal Burgundy & Gold Pill Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-4 self-start">
              <div className="px-4 py-1.5 rounded-full bg-[#591B2B] text-[#FFF9F0] border-2 border-[#D3AA57] shadow-md flex items-center gap-2">
                <Sparkles size={13} className="text-[#F3E0A2] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#F3E0A2]">
                  COIMBATORE'S COMPLETE SHOPPING DESTINATION
                </span>
              </div>
            </motion.div>

            {/* Required Exact Headline with Royal Geth & Class */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#301620] leading-[1.08] mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              <span>Everything Beautiful,</span>
              <br />
              <span className="text-[#A98243] italic font-normal inline-block mt-1">
                All in One Place.
              </span>
            </motion.h1>

            {/* Required Exact Description */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-[#422B24] leading-relaxed max-w-2xl mb-8 font-normal"
            >
              Explore elegant jewellery, beautiful bangles, cosmetics and everyday fashion essentials at Sai Gold Covering.
            </motion.p>

            {/* Action Buttons: Gold Gradient + Direct WhatsApp to 9865132486 */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 mb-10">
              <Link
                href="/shop"
                className="btn-gold-royal inline-flex items-center gap-2.5 px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl"
              >
                <span>Explore Collections</span>
                <ArrowRight size={15} />
              </Link>

              {/* Direct WhatsApp to 9865132486 */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 text-xs font-bold tracking-widest uppercase bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <MessageCircle size={17} />
                <span>Order on WhatsApp</span>
              </a>

              {/* Shop New Arrivals */}
              <Link
                href="/new-arrivals"
                className="inline-flex items-center gap-2 px-6 py-4 text-xs font-bold tracking-widest uppercase bg-white border-2 border-[#591B2B] text-[#591B2B] hover:bg-[#591B2B] hover:text-white transition-all duration-300 shadow-sm"
              >
                <span>New Arrivals</span>
              </Link>
            </motion.div>

            {/* Trust Metrics Bar: Crisp Ivory & Gold Glass Container */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-5 bg-white/90 border-2 border-[#D3AA57]/40 backdrop-blur-md shadow-lg"
            >
              <div className="border-r border-[#E8D8C8] pr-3 sm:pr-4">
                <div className="flex items-center gap-1.5 text-[#591B2B] mb-1">
                  <ShieldCheck size={16} className="text-[#A98243]" />
                  <p className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-[#301620]">1-Gram</p>
                </div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#762C43] font-semibold">
                  Micro Gold Plated
                </p>
              </div>

              <div className="border-r border-[#E8D8C8] pr-3 sm:pr-4">
                <div className="flex items-center gap-1.5 text-[#591B2B] mb-1">
                  <Star size={16} className="fill-[#A98243] text-[#A98243]" />
                  <p className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-[#301620]">500+</p>
                </div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#762C43] font-semibold">
                  Curated Designs
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[#591B2B] mb-1">
                  <MapPin size={16} className="text-[#A98243]" />
                  <p className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-[#301620]">Store</p>
                </div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#762C43] font-semibold">
                  Malumichampatti, CBE
                </p>
              </div>
            </motion.div>

          </motion.div>

          {/* ── Right Column: Majestic Multi-Layered Visual Showcase (5 cols) ── */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            
            {/* Main Featured Showcase Card with Grand Gold Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative p-2.5 bg-gradient-to-b from-[#ECC880] via-[#D3AA57] to-[#B88E3E] shadow-2xl"
            >
              <div className="relative aspect-[16/10] min-h-[250px] sm:min-h-[290px] overflow-hidden group bg-white border border-[#FFF9F0]">
                <Image
                  src="/images/hero/hero-bridal-set.jpg"
                  alt="Grand Bridal and temple gold covering jewellery set"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Dark Vignette Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14050C]/90 via-transparent to-black/25 pointer-events-none" />

                {/* Top Corner Badge */}
                <div className="absolute top-3 left-3 bg-[#591B2B] text-white border border-[#D3AA57] px-3 py-1 flex items-center gap-1.5 shadow-md">
                  <Sparkles size={11} className="text-[#F3E0A2]" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFF9F0]">
                    Bridal &amp; Temple Harams
                  </span>
                </div>

                {/* Bottom Title Bar */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-end justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#F3E0A2] font-bold block mb-1">
                      Pure 1-Gram Gold Polish
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                      Royal Bridal Necklace Sets
                    </h3>
                  </div>
                  <Link
                    href="/categories/necklaces"
                    className="p-3 bg-gradient-to-r from-[#ECC880] to-[#D3AA57] text-[#1A0B10] hover:bg-white transition-colors rounded-none shrink-0 shadow-md font-bold"
                    aria-label="View Bridal Necklaces"
                  >
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Overlapping Secondary Card: Bangles & Velvet Lipsticks */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 gap-3.5 mt-3.5"
            >
              {/* Colourful Bangles */}
              <Link
                href="/categories/bangles"
                className="relative aspect-[4/3] p-1.5 bg-white border-2 border-[#D3AA57] shadow-xl group overflow-hidden block"
              >
                <div className="relative w-full h-full overflow-hidden bg-[#FAF2E6]">
                  <Image
                    src="/images/hero/hero-bangles.jpg"
                    alt="Colourful designer glass and gold bangles"
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#33241F]/85 via-transparent to-transparent flex items-end p-2.5">
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-[#F3E0A2] font-bold block">
                        Wrist Elegance
                      </span>
                      <span className="text-xs font-serif font-bold text-white">
                        Colourful Bangles
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Velvet Lipsticks & Cosmetics */}
              <Link
                href="/categories/cosmetics"
                className="relative aspect-[4/3] p-1.5 bg-white border-2 border-[#D3AA57] shadow-xl group overflow-hidden block"
              >
                <div className="relative w-full h-full overflow-hidden bg-[#FAF2E6]">
                  <Image
                    src="/images/hero/hero-cosmetics.jpg"
                    alt="Cosmetics and beauty essentials"
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#33241F]/85 via-transparent to-transparent flex items-end p-2.5">
                    <div>
                      <span className="text-[8px] uppercase tracking-wider text-[#F3E0A2] font-bold block">
                        Beauty Essentials
                      </span>
                      <span className="text-xs font-serif font-bold text-white">
                        Velvet Lipsticks
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Floating Luxury Stamp / Seal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 bg-gradient-to-br from-[#591B2B] via-[#762C43] to-[#591B2B] text-white p-3.5 sm:p-4 shadow-2xl border-2 border-[#D3AA57] flex flex-col items-center justify-center text-center rotate-3"
            >
              <Sparkles size={16} className="text-[#D3AA57] mb-0.5 animate-spin" />
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider leading-tight text-[#F3E0A2]">
                100% QUALITY
              </p>
              <p className="text-[8px] font-bold tracking-widest uppercase text-white/90">
                INSPECTED
              </p>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Decorative Gold Trim Bottom Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#D3AA57] via-[#ECC880] to-[#D3AA57]" />
    </section>
  );
}
