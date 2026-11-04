'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Props {
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  center = false,
  light = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-6 sm:mb-8 ${center ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'}`}
    >
      {/* Top Label with Royal Gold Dots */}
      <div className={`inline-flex items-center gap-2 mb-1.5 ${center ? 'justify-center' : ''}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#D3AA57]" />
        <span
          className={`text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase ${
            light ? 'text-[#F3E0A2]' : 'text-[#762C43]'
          }`}
        >
          {label}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#D3AA57]" />
      </div>

      {/* Main Title */}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight mb-2 ${
          light ? 'text-[#FFF9F0]' : 'text-[#591B2B]'
        }`}
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {title}
      </h2>

      {/* Royal Gold Filigree Divider */}
      <div className={`flex items-center gap-3 mb-2.5 ${center ? 'justify-center' : ''}`}>
        <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#D3AA57]" />
        <span className="w-2 h-2 rotate-45 bg-[#D3AA57] shadow-sm shadow-[#D3AA57]/50" />
        <Sparkles size={11} className="text-[#D3AA57]" />
        <span className="w-2 h-2 rotate-45 bg-[#D3AA57] shadow-sm shadow-[#D3AA57]/50" />
        <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#D3AA57]" />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`text-xs sm:text-sm leading-relaxed ${
            light ? 'text-[#FFF9F0]/80' : 'text-[#33241F]/80'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
