'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Clock, Navigation, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import { SITE_CONFIG } from '@/lib/config';

const STORE_PHOTOS = [
  { name: 'Gold Chains & Jewellery Showcase', src: '/images/store/sai-gold-edited-showroom-display.jpg' },
  { name: 'Royal Harams & Long Chains Wall', src: '/images/store/sai-gold-edited-chains-harams.jpg' },
  { name: 'Bridal Harams & Bangles Display', src: '/images/store/sai-gold-edited-bridal-bangles.jpg' },
  { name: 'Cosmetics & Beauty Shelves', src: '/images/store/sai-gold-edited-cosmetics-shelf.jpg' },
];

export default function VisitOurStoreSection() {
  const whatsappStoreUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Vanakkam Sai Gold Covering! I would like to get directions and visit your store at Malumichampatti, Coimbatore.'
  )}`;

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FAF4EA] to-white border-b border-[#D3AA57]/30" id="visit-store">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Physical Showroom Experience"
          title="Visit Our Store in Coimbatore"
          subtitle="Experience authentic 1-gram gold jewellery, try on bridal bangles, and discover beauty cosmetics in person at Malumichampatti."
          center
        />

        {/* Store Details + Real Photo Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          
          {/* Real Store Photo Collage (7 cols) with Royal Gold Border */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3.5 p-2 bg-[#591B2B] border-2 border-[#D3AA57] shadow-xl">
            {STORE_PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative aspect-[4/3] overflow-hidden group shadow-md bg-white"
              >
                <Image
                  src={photo.src}
                  alt={photo.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] sm:text-xs text-white font-medium flex items-center gap-1.5">
                    <Sparkles size={11} className="text-[#D3AA57]" />
                    {photo.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Store Address & Contact Panel (5 cols) */}
          <div className="lg:col-span-5 bg-white border-2 border-[#D3AA57] p-6 sm:p-8 space-y-5 shadow-xl relative overflow-hidden">
            {/* Top Gold Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              <div className="absolute transform rotate-45 bg-[#D3AA57] text-[#1A0B10] text-[9px] font-bold py-1 right-[-40px] top-[22px] w-[140px] text-center shadow-md">
                DIRECT STORE
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#A98243] block mb-1">
                Direct Retail Showroom
              </span>
              <h3
                className="text-2xl sm:text-3xl font-bold text-[#591B2B]"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Sai Gold Covering
              </h3>
              <p className="text-xs text-[#762C43] font-medium mt-1">
                Gold Covering Jewellery • Bangles • Cosmetics • Fancy Items
              </p>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3.5 text-xs sm:text-sm text-[#33241F] pt-3 border-t border-[#E8D8C8]">
              <div className="w-9 h-9 rounded-full bg-[#591B2B]/10 flex items-center justify-center shrink-0 text-[#591B2B] mt-0.5">
                <MapPin size={18} />
              </div>
              <address className="not-italic leading-relaxed">
                <strong className="text-[#591B2B] block">Sri Kumaran Complex</strong>
                1/433A11, 4 Corner Signal, Pollachi Main Road,<br />
                Guruvayur Nagar, Malumichampatti,<br />
                Coimbatore, Tamil Nadu 641050, India.
              </address>
            </div>

            {/* Direct Phone Numbers */}
            <div className="space-y-2 pt-3 border-t border-[#E8D8C8]">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#33241F]">
                <div className="w-9 h-9 rounded-full bg-[#25D366]/15 flex items-center justify-center shrink-0 text-[#1EBE5D]">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A98243] block">
                    WhatsApp &amp; Orders (Primary)
                  </span>
                  <a
                    href={whatsappStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#591B2B] hover:text-[#25D366] transition-colors text-sm sm:text-base"
                  >
                    {SITE_CONFIG.primaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#33241F]">
                <div className="w-9 h-9 rounded-full bg-[#591B2B]/10 flex items-center justify-center shrink-0 text-[#591B2B]">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A98243] block">
                    Customer Inquiries (Secondary)
                  </span>
                  <a
                    href={`tel:${SITE_CONFIG.secondaryPhoneRaw}`}
                    className="font-bold text-[#591B2B] hover:underline text-sm sm:text-base"
                  >
                    {SITE_CONFIG.secondaryPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Store Hours */}
            <div className="flex items-start gap-3.5 text-xs sm:text-sm text-[#33241F] pt-3 border-t border-[#E8D8C8]">
              <div className="w-9 h-9 rounded-full bg-[#591B2B]/10 flex items-center justify-center shrink-0 text-[#591B2B] mt-0.5">
                <Clock size={18} />
              </div>
              <div className="space-y-0.5 leading-relaxed text-xs">
                <p><strong className="text-[#591B2B]">Monday – Saturday:</strong> 9:30 AM – 8:30 PM</p>
                <p><strong className="text-[#591B2B]">Sunday:</strong> 10:00 AM – 7:30 PM</p>
              </div>
            </div>

            {/* Action Buttons: Directions, WhatsApp, Call */}
            <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
              <a
                href={SITE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#591B2B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#762C43] transition-colors shadow-md text-center"
              >
                <Navigation size={14} />
                <span>Get Directions</span>
              </a>

              <a
                href={whatsappStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#1EBE5D] transition-colors shadow-md text-center"
              >
                <MessageCircle size={15} />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="py-3 px-4 bg-white border-2 border-[#591B2B] text-[#591B2B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#FAF2E6] transition-colors text-center"
              >
                <Phone size={15} />
                <span>Call</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
