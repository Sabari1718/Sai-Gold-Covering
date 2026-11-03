'use client';

import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import { reviews } from '@/data/reviews';

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#F1EADF]/40 border-b border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Voices of Delight"
          title="Loved by Coimbatore Families"
          subtitle="Read honest feedback from patrons who have purchased our gold covering ornaments and beauty products."
          center
        />

        {/* Clear Initial Sample Content Disclaimer Pill */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-semibold">
            <CheckCircle2 size={13} className="text-amber-600" />
            Note: Curated sample customer testimonials representing in-store feedback.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-white border border-[#E8DFD3] p-6 flex flex-col justify-between shadow-sm relative"
            >
              <div>
                <Quote size={24} className="text-[#C6A15B]/30 mb-3" />
                
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className="fill-[#C6A15B] text-[#C6A15B]"
                    />
                  ))}
                </div>

                <p className="text-xs text-[#5A473E] leading-relaxed mb-4 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8DFD3]">
                <p className="text-xs font-bold text-[#54252C]">{rev.name}</p>
                <p className="text-[10px] text-[#A98243] font-medium truncate">
                  Purchased: {rev.productName}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
