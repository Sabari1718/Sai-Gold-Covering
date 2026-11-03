import { SITE_CONFIG } from '@/lib/config';
import { MapPin, Phone, MessageCircle, Clock, Sparkles } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Showroom & WhatsApp Ordering | Sai Gold Covering',
  description:
    'Visit Sai Gold Covering at 4 Corner Signal, Malumichampatti, Coimbatore, Tamil Nadu. Connect on WhatsApp for live video inquiries, orders, and pickups.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#FAF7F1] min-h-screen py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#A98243] block mb-2">
            Showroom &amp; Assistance
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#591B2B] mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Visit Sai Gold Covering
          </h1>
          <div className="w-16 h-0.5 bg-[#D3AA57] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#5A473E] leading-relaxed">
            Come explore our complete collections of 1-gram gold jewellery, colourful bangles, cosmetics, and accessories in person,
            or connect with us directly over WhatsApp.
          </p>
        </div>

        {/* Dual Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Showroom Details (7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-[#D3AA57]/40 p-8 sm:p-10 space-y-7 shadow-lg">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#A98243] mb-1">
                Store Location
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#591B2B]"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Sai Gold Covering Showroom
              </h2>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#591B2B]/10 border border-[#D3AA57]/40 flex items-center justify-center text-[#591B2B] shrink-0 mt-0.5">
                <MapPin size={18} />
              </div>
              <div className="text-xs sm:text-sm text-[#33241F] space-y-1">
                <p className="font-bold text-[#591B2B]">Physical Address:</p>
                <address className="not-italic leading-relaxed">
                  <strong className="block text-[#301620]">Sri Kumaran Complex</strong>
                  {SITE_CONFIG.address.line1},<br />
                  {SITE_CONFIG.address.line2},<br />
                  {SITE_CONFIG.address.line3},<br />
                  {SITE_CONFIG.address.city}, Tamil Nadu {SITE_CONFIG.address.pincode}, India.
                </address>
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block pt-2 font-bold text-[#A98243] hover:underline uppercase text-[11px] tracking-wider"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#591B2B]/10 border border-[#D3AA57]/40 flex items-center justify-center text-[#591B2B] shrink-0 mt-0.5">
                <Clock size={18} />
              </div>
              <div className="text-xs sm:text-sm text-[#33241F] space-y-1">
                <p className="font-bold text-[#591B2B]">Store Timings:</p>
                <p>Monday to Saturday: 9:30 AM – 8:30 PM</p>
                <p>Sunday: 10:00 AM – 7:30 PM</p>
              </div>
            </div>

            {/* Phone Lines: Primary & Secondary */}
            <div className="flex items-start gap-4 pt-2 border-t border-[#E8D8C8]">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center text-[#1EBE5D] shrink-0 mt-0.5">
                <Phone size={18} />
              </div>
              <div className="text-xs sm:text-sm text-[#33241F] space-y-2 flex-1">
                <p className="font-bold text-[#591B2B]">Showroom Direct Lines:</p>
                
                {/* Primary Number */}
                <div className="p-3 bg-[#FAF7F2] border border-[#E8D8C8] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A98243] block">
                      Primary (WhatsApp &amp; Orders)
                    </span>
                    <a
                      href={`tel:${SITE_CONFIG.phoneRaw}`}
                      className="font-bold text-base text-[#591B2B] hover:text-[#25D366] transition-colors"
                    >
                      {SITE_CONFIG.primaryPhone}
                    </a>
                  </div>
                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="px-3 py-1.5 bg-[#591B2B] text-white text-[11px] font-bold uppercase tracking-wider rounded-none"
                  >
                    Call
                  </a>
                </div>

                {/* Secondary Number */}
                <div className="p-3 bg-[#FAF7F2] border border-[#E8D8C8] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A98243] block">
                      Secondary (Customer Inquiries)
                    </span>
                    <a
                      href={`tel:${SITE_CONFIG.secondaryPhoneRaw}`}
                      className="font-bold text-base text-[#591B2B] hover:text-[#A98243] transition-colors"
                    >
                      {SITE_CONFIG.secondaryPhone}
                    </a>
                  </div>
                  <a
                    href={`tel:${SITE_CONFIG.secondaryPhoneRaw}`}
                    className="px-3 py-1.5 bg-white border border-[#591B2B] text-[#591B2B] text-[11px] font-bold uppercase tracking-wider rounded-none"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Direct WhatsApp Ordering Panel (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#591B2B] to-[#762C43] text-[#FFF9F0] p-8 sm:p-10 flex flex-col justify-between shadow-xl border-2 border-[#D3AA57]">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#F3E0A2] block mb-2 flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#F3E0A2]" />
                Fast &amp; Personal Shopping
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-4 leading-tight text-white"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Direct WhatsApp Orders &amp; Inquiries
              </h2>
              <p className="text-xs sm:text-sm text-[#FFF9F0]/85 leading-relaxed mb-8">
                Want to see close-up video of a necklace set, check exact bangle sizes, or order an item for pickup / delivery? Click below to chat directly with us on <strong>{SITE_CONFIG.primaryPhone}</strong>.
              </p>

              <div className="space-y-4">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    'Vanakkam Sai Gold Covering! I would like to inquire about your jewellery, cosmetics, and bridal collections.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-all shadow-lg hover:scale-105"
                >
                  <MessageCircle size={19} />
                  <span>Chat on WhatsApp: {SITE_CONFIG.primaryPhone}</span>
                </a>

                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-[#D3AA57] text-[#F3E0A2] font-bold text-xs uppercase tracking-wider hover:bg-[#D3AA57] hover:text-[#1A0B10] transition-colors text-center"
                >
                  <MapPin size={16} />
                  <span>Get Google Maps Directions</span>
                </a>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/20 flex items-center justify-between text-xs text-[#FFF9F0]/80">
              <span>Follow Our Instagram:</span>
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F3E0A2] transition-colors flex items-center gap-1.5 font-bold text-[#F3E0A2]"
              >
                <InstagramIcon size={14} />
                @saigoldcovering
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
