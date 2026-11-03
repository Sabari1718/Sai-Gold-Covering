'use client';

import { motion } from 'framer-motion';
import { Gem, Layers, HeadphonesIcon, MessageCircle, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';

const REASONS = [
  {
    step: '01',
    icon: Gem,
    title: 'Authentic 1-Gram Gold Finish',
    description: 'Every chain, haram, and bangle is micro-plated to replicate the rich sheen and deep weight of pure hallmarked gold jewellery.',
  },
  {
    step: '02',
    icon: Layers,
    title: '500+ Curated Designs',
    description: 'Gold covering chains, colourful glass bangles, face cosmetics, and hair jadai accessories all under one local Coimbatore roof.',
  },
  {
    step: '03',
    icon: HeadphonesIcon,
    title: 'Warm Personal Assistance',
    description: 'Friendly in-store customer care and one-on-one bridal styling recommendations for weddings, festivals, and family functions.',
  },
  {
    step: '04',
    icon: MessageCircle,
    title: 'Instant WhatsApp Ordering',
    description: 'Send design screenshots, check live store availability, and get doorstep dispatch or direct pickup at Malumichampatti.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#1C0811] via-[#260D17] to-[#1C0811] text-[#FFF9F0] border-b border-[#D3AA57]/30 relative overflow-hidden">
      
      {/* Background Subtle Mandala */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l4 12 12-4-4 12 12 4-12 4 4 12-12-4-4 12-4-12-12 4 4-12-12-4 12-4-4-12 12 4z' fill='%23ECC880' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="The Sai Gold Heritage"
          title="Why Choose Sai Gold Covering"
          subtitle="Discover what makes us the trusted shopping destination for thousands of happy families in Coimbatore and across Tamil Nadu."
          center
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {REASONS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="relative bg-gradient-to-b from-[#2A111C] to-[#1B0A12] border-2 border-[#D3AA57]/30 hover:border-[#D3AA57] p-7 sm:p-8 flex flex-col items-center text-center group transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(211,170,87,0.15)]"
              >
                {/* Watermark Step Number */}
                <span className="absolute top-3 right-4 font-serif text-3xl font-black text-[#D3AA57]/15 select-none">
                  {item.step}
                </span>

                {/* Glowing Gold Icon Container */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ECC880]/20 to-[#D3AA57]/10 border-2 border-[#D3AA57]/60 flex items-center justify-center text-[#D3AA57] mb-6 group-hover:scale-110 group-hover:border-[#D3AA57] transition-all shadow-inner">
                  <Icon size={26} />
                </div>

                <h3
                  className="text-base sm:text-lg font-bold text-white mb-3 leading-snug group-hover:text-[#F3E0A2] transition-colors"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {item.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#FFF9F0]/75 leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Bottom Gold Accent */}
                <div className="w-8 h-0.5 bg-[#D3AA57] mt-5 group-hover:w-16 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
