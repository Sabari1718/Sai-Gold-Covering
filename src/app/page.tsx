import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import FeaturedSection from '@/components/home/FeaturedSection';
import BestsellersSection from '@/components/home/BestsellersSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import ShopByInterestSection from '@/components/home/ShopByInterestSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import VisitOurStoreSection from '@/components/home/VisitOurStoreSection';
import InstagramSection from '@/components/home/InstagramSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION B: Premium Hero */}
      <HeroSection />

      {/* SECTION C: Shop by Category (9 Categories) */}
      <CategorySection />

      {/* SECTION D: Featured Collections (3 Promotional Banners) */}
      <FeaturedSection />

      {/* SECTION E: Bestsellers */}
      <BestsellersSection />

      {/* SECTION F: New Arrivals Carousel */}
      <NewArrivalsSection />

      {/* SECTION G: Shop by Interest */}
      <ShopByInterestSection />

      {/* SECTION H: Why Choose Us */}
      <WhyChooseUsSection />

      {/* SECTION I: Visit Our Store with Real Photos & Address */}
      <VisitOurStoreSection />

      {/* SECTION J: Instagram Gallery */}
      <InstagramSection />
    </div>
  );
}
