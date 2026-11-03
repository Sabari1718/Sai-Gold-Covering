import Link from 'next/link';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import { SITE_CONFIG } from '@/lib/config';

export default function Footer() {
  const year = 2026;

  return (
    <footer className="bg-gradient-to-b from-[#220B15] to-[#14050D] text-[#FFF9F0] border-t-2 border-[#D3AA57]/50">
      {/* Upper Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#F3E0A2] block">
              Imitation Jewellery &amp; Beauty
            </span>
            <span
              className="text-2xl sm:text-3xl font-extrabold tracking-wider uppercase text-white block"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Sai Gold Covering
            </span>
            <p className="text-xs text-[#FFF9F0]/75 leading-relaxed max-w-sm">
              Your trusted family destination in Coimbatore for premium 1-gram gold covering jewellery,
              festive glass bangles, cosmetics, daily skincare, and graceful fashion accessories.
            </p>

            {/* Social & Contact Actions */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Vanakkam Sai Gold Covering! I would like to order jewellery.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-all shadow-md"
                aria-label="WhatsApp"
                title="Order on WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#591B2B] border border-[#D3AA57]/50 flex items-center justify-center text-[#F3E0A2] hover:bg-[#D3AA57] hover:text-[#1A0B10] transition-all shadow-md"
                aria-label="Instagram"
                title="Follow on Instagram"
              >
                <InstagramIcon size={17} />
              </a>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="w-10 h-10 rounded-full bg-[#591B2B] border border-[#D3AA57]/50 flex items-center justify-center text-[#F3E0A2] hover:bg-[#D3AA57] hover:text-[#1A0B10] transition-all shadow-md"
                aria-label="Call Us"
                title="Call 9865132486"
              >
                <Phone size={17} />
              </a>
            </div>
          </div>

          {/* Col 2: Jewellery Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F3E0A2] mb-4 border-b border-[#D3AA57]/30 pb-1">
              Jewellery
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF9F0]/75">
              <li>
                <Link href="/categories/necklaces" className="hover:text-[#D3AA57] transition-colors">
                  Bridal Harams &amp; Sets
                </Link>
              </li>
              <li>
                <Link href="/categories/chains" className="hover:text-[#D3AA57] transition-colors">
                  Mugappu Gold Chains
                </Link>
              </li>
              <li>
                <Link href="/categories/bangles" className="hover:text-[#D3AA57] transition-colors">
                  Daily &amp; Kada Bangles
                </Link>
              </li>
              <li>
                <Link href="/categories/necklaces" className="hover:text-[#D3AA57] transition-colors">
                  Temple &amp; Kemp Malas
                </Link>
              </li>
              <li>
                <Link href="/categories/fancy-items" className="hover:text-[#D3AA57] transition-colors">
                  Kolusu &amp; Anklets
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Cosmetics & Accessories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F3E0A2] mb-4 border-b border-[#D3AA57]/30 pb-1">
              Beauty &amp; Accessories
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF9F0]/75">
              <li>
                <Link href="/categories/cosmetics" className="hover:text-[#D3AA57] transition-colors">
                  Velvet Matte Lipsticks
                </Link>
              </li>
              <li>
                <Link href="/categories/cosmetics" className="hover:text-[#D3AA57] transition-colors">
                  Face Compacts &amp; Powders
                </Link>
              </li>
              <li>
                <Link href="/categories/cosmetics" className="hover:text-[#D3AA57] transition-colors">
                  Herbal Kajal &amp; Eyeliners
                </Link>
              </li>
              <li>
                <Link href="/categories/fancy-items" className="hover:text-[#D3AA57] transition-colors">
                  Bridal Jadai Billai
                </Link>
              </li>
              <li>
                <Link href="/categories/fancy-items" className="hover:text-[#D3AA57] transition-colors">
                  Velvet &amp; Stone Bindis
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Physical Store Location & Direct Phone Lines (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F3E0A2] mb-4 border-b border-[#D3AA57]/30 pb-1">
              Contact &amp; Showroom
            </h4>
            
            <div className="flex items-start gap-2.5 text-xs text-[#FFF9F0]/75 leading-relaxed">
              <MapPin size={16} className="text-[#D3AA57] shrink-0 mt-0.5" />
              <address className="not-italic">
                <strong className="text-white block">Sri Kumaran Complex</strong>
                {SITE_CONFIG.address.line1}, {SITE_CONFIG.address.line2},<br />
                Malumichampatti, Coimbatore, TN 641050
              </address>
            </div>

            {/* Direct Numbers */}
            <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-[#FFF9F0]/80">
              <div className="flex items-center gap-2">
                <MessageCircle size={14} className="text-[#25D366] shrink-0" />
                <span>
                  <strong className="text-white">Orders:</strong>{' '}
                  <a href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`} className="text-[#F3E0A2] hover:underline font-bold">
                    {SITE_CONFIG.primaryPhone}
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#D3AA57] shrink-0" />
                <span>
                  <strong className="text-white">Inquiries:</strong>{' '}
                  <a href={`tel:${SITE_CONFIG.secondaryPhoneRaw}`} className="text-[#F3E0A2] hover:underline">
                    {SITE_CONFIG.secondaryPhone}
                  </a>
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={SITE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#D3AA57] hover:underline"
              >
                Directions on Google Maps →
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-footer Bar */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-[#FFF9F0]/55 px-4 bg-[#14050D]">
        <p>© {year} Sai Gold Covering, Malumichampatti, Coimbatore. All rights reserved.</p>
      </div>
    </footer>
  );
}
