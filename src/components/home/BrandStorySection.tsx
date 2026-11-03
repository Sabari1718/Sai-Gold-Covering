'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Heart, Sparkles } from 'lucide-react';

export default function BrandStorySection() {
  return (
    <section className="py-20 lg:py-28 bg-[#54252C] text-[#FAF7F1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Composition (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] border border-[#C6A15B]/40 shadow-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1514995428455-447d4443fa7f?w=900&q=85"
                alt="Jewellery and cosmetic styling at Sai Gold Covering"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3E1A20]/80 via-transparent to-transparent" />
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#FAF7F1] text-[#30241F] p-4 sm:p-5 shadow-xl border border-[#E8DFD3] max-w-[220px]">
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#A98243] block mb-1">
                Local Landmark
              </span>
              <p className="text-xs sm:text-sm font-bold leading-snug" style={{ fontFamily: 'var(--font-playfair)' }}>
                Malumichampatti, Coimbatore
              </p>
              <p className="text-[10px] text-[#8E7A70] mt-1 flex items-center gap-1">
                <MapPin size={11} className="text-[#C6A15B]" /> 4 Corner Signal
              </p>
            </div>
          </motion.div>

          {/* Brand Story Editorial Content (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.3em] uppercase text-[#C6A15B] mb-3">
              <Sparkles size={13} /> Our Heritage
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Little Things That Make You Feel Beautiful.
            </h2>

            <div className="w-14 h-[2px] bg-[#C6A15B] mb-6" />

            <div className="space-y-4 text-xs sm:text-sm text-[#F1EADF]/85 leading-relaxed mb-8">
              <p>
                At <strong>Sai Gold Covering</strong>, we believe every woman deserves to look and feel
                extraordinary every single day — not just on rare festive occasions.
              </p>
              <p>
                Located at the bustling 4 Corner Signal on Pollachi Main Road in Malumichampatti, Coimbatore,
                we have built our reputation as a trusted local shopping haven where jewellery, beauty, and
                fashion accessories unite under one warm roof.
              </p>
              <p>
                From authentic micro-gold plated temple malas and daily bangles that mirror solid gold craftsmanship,
                to vibrant velvet lipsticks, soothing skincare essences, and intricate hair jadai ornaments — our
                curation is handpicked to bring you elegance without compromise.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="btn-gold"
              >
                Read Our Story <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#F1EADF]/40 text-xs font-bold uppercase tracking-wider text-[#FAF7F1] hover:bg-white/10 transition-colors"
              >
                Visit Our Showroom
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
