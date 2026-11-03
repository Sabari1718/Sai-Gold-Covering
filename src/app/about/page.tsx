import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';
import { Sparkles, Heart, ShieldCheck, MapPin, Navigation, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Our Store | Sai Gold Covering',
  description:
    'Discover Sai Gold Covering in Malumichampatti, Coimbatore — your complete shopping destination for 1-gram gold jewellery, colourful bangles, cosmetics, and fashion accessories.',
};

const SHOWROOM_PHOTOS = [
  { name: 'Gold Chains & Jewellery Showcase', src: '/images/store/sai-gold-edited-showroom-display.jpg' },
  { name: 'Royal Harams & Long Chains Wall', src: '/images/store/sai-gold-edited-chains-harams.jpg' },
  { name: 'Bridal Harams & Bangles Display', src: '/images/store/sai-gold-edited-bridal-bangles.jpg' },
  { name: 'Cosmetics & Beauty Shelves', src: '/images/store/sai-gold-edited-cosmetics-shelf.jpg' },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F1] min-h-screen">
      
      {/* Editorial Luxury Header */}
      <div className="py-20 lg:py-28 bg-[#591B2B] text-[#FFF9F0] px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#D3AA57] block mb-3">
            Our Heritage &amp; Promise
          </span>
          <h1
            className="text-3xl sm:text-5xl font-bold mb-6 leading-tight text-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Everything Beautiful, All in One Place.
          </h1>
          <div className="w-16 h-[2px] bg-[#D3AA57] mx-auto mb-6" />
          <p className="text-xs sm:text-sm text-[#FFF9F0]/85 leading-relaxed max-w-xl mx-auto font-light">
            Sai Gold Covering is Coimbatore’s beloved destination for 1-gram gold covering jewellery,
            colourful bangles, long-stay cosmetics, and fashionable women’s accessories.
          </p>
        </div>
      </div>

      {/* Actual Store Photography Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#A98243] block mb-2">
            Real Showroom Photographs
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#591B2B]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Inside Sai Gold Covering, Coimbatore
          </h2>
          <p className="text-xs sm:text-sm text-[#33241F]/80 mt-2">
            Located right at Sri Kumaran Complex, 4 Corner Signal, Pollachi Main Road in Malumichampatti.
          </p>
        </div>

        {/* 4 Real Store Photographs Grid with Royal Gold Frames */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {SHOWROOM_PHOTOS.map((photo) => (
            <div
              key={photo.name}
              className="relative aspect-[4/3] border-2 border-[#D3AA57] overflow-hidden group shadow-md bg-white"
            >
              <Image
                src={photo.src}
                alt={photo.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3.5">
                <span className="text-xs text-white font-medium flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#D3AA57]" />
                  {photo.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto space-y-6 text-xs sm:text-sm text-[#33241F]/85 leading-relaxed bg-white border-2 border-[#D3AA57]/40 p-8 sm:p-12 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#D3AA57]" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#A98243]">
              The Sai Gold Story
            </span>
          </div>

          <h3
            className="text-2xl sm:text-3xl font-bold text-[#591B2B]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            A Warm Neighborhood Destination for Every Woman
          </h3>
          
          <p>
            Established in Malumichampatti, Coimbatore, <strong>Sai Gold Covering</strong> was founded
            with the belief that shopping for personal adornment should be joyous, versatile, and affordable.
            Rather than visiting separate stores for temple jewellery, bangle sets, lipsticks, and saree accessories,
            our patrons find everything curated in one friendly, well-lit showroom.
          </p>
          <p>
            Our extensive collections reflect both traditional South Indian aesthetic elegance (such as Kasu malas,
            mugappu chains, mango haarams, and musical ghungroo anklets) and modern lifestyle requirements (including non-drying velvet
            matte lipsticks, compacts with SPF, beauty accessories, and daily wear bangles).
          </p>
          <p>
            Every piece in our collection is carefully inspected for lasting 1-gram micro gold polish, skin-friendly materials, and authentic craftsmanship before reaching your hands.
          </p>

          <div className="pt-6 flex flex-wrap gap-4 border-t border-[#E8D8C8]">
            <Link
              href="/shop"
              className="btn-gold-royal inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider"
            >
              <span>Explore Collections</span>
              <ArrowRight size={14} />
            </Link>
            
            <a
              href={SITE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-[#591B2B] text-[#591B2B] hover:bg-[#591B2B] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
            >
              <Navigation size={14} />
              <span>Get Directions to Store</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
