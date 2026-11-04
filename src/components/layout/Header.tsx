'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  User,
  Sparkles,
  Phone,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/config';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, wishlistCount } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMega, setActiveMega] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMega(null);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const onMegaEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMega(label);
  };

  const onMegaLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 180);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[#D3AA57]/50 text-[#33241F]'
          : 'bg-[#FCFAF7] border-b border-[#E8D8C8] text-[#33241F]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Branding & Navigation Row */}
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          
          {/* Left: Mobile Menu Toggle / Location Badge on desktop */}
          <div className="flex items-center gap-2 sm:gap-4 lg:w-56 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 text-[#591B2B] hover:text-[#D3AA57] transition-colors"
              aria-label="Open Mobile Menu"
            >
              <Menu size={22} className="sm:w-6 sm:h-6" />
            </button>
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#762C43] font-semibold">
              <MapPin size={13} className="text-[#D3AA57]" />
              <span>Malumichampatti, Coimbatore</span>
            </div>
          </div>

          {/* Center: Majestic Royal Brand Identity */}
          <Link
            href="/"
            className="flex flex-col items-center group text-center px-1 max-w-[210px] sm:max-w-none"
            aria-label="Sai Gold Covering Home"
          >
            <span className="text-[8px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.35em] uppercase font-bold text-[#A98243] flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap leading-none">
              <Sparkles size={9} className="text-[#D3AA57] shrink-0 sm:w-2.5 sm:h-2.5" />
              <span className="sm:hidden">1-Gram Gold Covering</span>
              <span className="hidden sm:inline">Premium 1-Gram Gold Covering</span>
              <Sparkles size={9} className="text-[#D3AA57] shrink-0 sm:w-2.5 sm:h-2.5" />
            </span>
            <span
              className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.08em] sm:tracking-[0.14em] uppercase text-[#591B2B] leading-tight mt-1 group-hover:text-[#762C43] transition-colors whitespace-nowrap"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Sai Gold Covering
            </span>
            <div className="w-10 sm:w-14 h-[1.5px] sm:h-[2px] bg-gradient-to-r from-transparent via-[#D3AA57] to-transparent mt-1.5 group-hover:w-24 sm:group-hover:w-32 transition-all duration-300" />
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-0.5 sm:gap-3 lg:w-56 text-[#591B2B] shrink-0">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 sm:p-2 hover:text-[#D3AA57] transition-colors"
              aria-label="Search"
            >
              <Search size={19} className="sm:w-5 sm:h-5" />
            </button>

            <Link
              href="/wishlist"
              className="relative p-1.5 sm:p-2 hover:text-[#D3AA57] transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={19} className="sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#591B2B] text-white text-[8px] sm:text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative p-1.5 sm:p-2 hover:text-[#D3AA57] transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={19} className="sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-[#ECC880] to-[#D3AA57] text-[#1A0B10] text-[8px] sm:text-[9px] font-bold flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/admin"
              className="hidden sm:inline-flex p-2 hover:text-[#D3AA57] transition-colors"
              aria-label="Shop Owner Admin Portal"
              title="Shop Owner Admin Portal"
            >
              <User size={20} />
            </Link>
          </div>
        </div>

        {/* Search Input Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-[#E8D8C8] pb-4 pt-2"
            >
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto flex items-center">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search chains, kadas, bridal harams, lipsticks, bindis..."
                  className="w-full bg-white border-2 border-[#D3AA57] px-4 py-2.5 text-xs text-[#33241F] placeholder:text-[#8E7A70] outline-none focus:ring-1 focus:ring-[#D3AA57] shadow-inner"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 px-6 bg-gradient-to-r from-[#ECC880] to-[#D3AA57] text-[#1A0B10] text-xs font-bold uppercase tracking-wider hover:opacity-95"
                >
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Navigation Row with Mega Menus */}
        <nav className="hidden lg:flex items-center justify-center gap-7 py-2 border-t border-[#E8D8C8] text-xs tracking-[0.14em] uppercase font-bold text-[#33241F]">
          {NAV_LINKS.map((item) => {
            if ('hasMega' in item && item.hasMega && 'megaItems' in item) {
              const isOpen = activeMega === item.label;
              return (
                <div
                  key={item.label}
                  onMouseEnter={() => onMegaEnter(item.label)}
                  onMouseLeave={onMegaLeave}
                  className="relative py-1"
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 hover:text-[#591B2B] transition-colors ${
                      isOpen ? 'text-[#591B2B]' : ''
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 text-[#D3AA57] ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </Link>

                  {/* Mega Menu Dropdown (Rich White & Gold Surface) */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white border-2 border-[#D3AA57] shadow-2xl p-5 z-50 rounded-sm"
                      >
                        <div className="grid grid-cols-2 gap-3">
                          {item.megaItems.map((sub: { label: string; href: string }) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="group block p-3 bg-[#FAF7F2] hover:bg-[#FFF9F0] border border-[#E8D8C8] hover:border-[#D3AA57] transition-all"
                            >
                              <p className="text-xs normal-case tracking-normal font-semibold text-[#33241F] group-hover:text-[#591B2B]">
                                {sub.label}
                              </p>
                              <span className="text-[10px] text-[#A98243] font-medium block mt-1">Explore Collection →</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="py-1 hover:text-[#591B2B] transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#D3AA57] to-[#591B2B] group-hover:w-full transition-all duration-300" />
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.26 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white border-r-2 border-[#D3AA57] z-50 lg:hidden shadow-2xl flex flex-col text-[#33241F]"
            >
              <div className="p-5 border-b border-[#E8D8C8] flex items-center justify-between bg-[#591B2B] text-white">
                <div>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-[#F3E0A2]">
                    Sai Gold Covering
                  </p>
                  <p className="text-lg font-bold font-serif">
                    Menu
                  </p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#F3E0A2] hover:text-white"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {NAV_LINKS.map((item) => {
                  if ('hasMega' in item && item.hasMega && 'megaItems' in item) {
                    return (
                      <div key={item.label} className="space-y-2">
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs font-bold uppercase tracking-wider text-[#591B2B] block border-b border-[#E8D8C8] pb-1"
                        >
                          {item.label}
                        </Link>
                        <div className="pl-3 space-y-2">
                          {item.megaItems.map((sub: { label: string; href: string }) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-xs text-[#5A473E] hover:text-[#591B2B]"
                            >
                              • {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-bold uppercase tracking-wider text-[#33241F] hover:text-[#591B2B] border-b border-[#E8D8C8]/60 pb-2"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="p-5 border-t border-[#E8D8C8] bg-[#FAF7F2] space-y-2">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    'Vanakkam Sai Gold Covering! I would like to order jewellery.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-[#1EBE5D] transition-colors"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp: {SITE_CONFIG.primaryPhone}</span>
                </a>
                <a
                  href={`tel:${SITE_CONFIG.secondaryPhoneRaw}`}
                  className="w-full py-2.5 bg-white border border-[#591B2B] text-[#591B2B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Phone size={14} />
                  <span>Call: {SITE_CONFIG.secondaryPhone}</span>
                </a>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 bg-[#591B2B] text-[#ECC880] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                >
                  <User size={14} />
                  <span>Shop Owner Admin Portal</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
