'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Check, Star, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/data/products';
import { SITE_CONFIG } from '@/lib/config';
import type { Product } from '@/types';

interface Props {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: Props) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [addedNotice, setAddedNotice] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const isOutOfStock = !product.availability || product.stock <= 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1600);
  };

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  const productWhatsappUrl = `https://wa.me/${SITE_CONFIG.phoneRaw}?text=${encodeURIComponent(
    `Hi Sai Gold Covering, I would like to order: ${product.name} (Code: ${product.id}, Price: ${formatPrice(product.price)}). Is this available in your store?`
  )}`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="group bg-white border border-[#E8D8C8] flex flex-col justify-between relative hover:border-[#D3AA57] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#D3AA57]/10"
      >
        {/* Product Image Link */}
        <Link
          href={`/product/${product.slug}`}
          className="block relative aspect-square overflow-hidden bg-[#FAF2E6]"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            unoptimized={product.image.startsWith('data:')}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {product.isNewArrival && (
              <span className="px-2.5 py-0.5 bg-[#591B2B] text-[#FFF9F0] text-[9px] font-bold tracking-widest uppercase shadow-sm">
                New
              </span>
            )}
            {product.isBestSeller && !product.isNewArrival && (
              <span className="px-2.5 py-0.5 bg-gradient-to-r from-[#ECC880] to-[#D3AA57] text-[#1A0B10] text-[9px] font-black tracking-widest uppercase shadow-sm">
                Bestseller
              </span>
            )}
            {product.originalPrice && (
              <span className="px-2 py-0.5 bg-white text-[#591B2B] border border-[#591B2B]/30 text-[9px] font-bold tracking-widest uppercase shadow-sm">
                Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWish}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 shadow-md flex items-center justify-center text-[#591B2B] hover:bg-white hover:scale-110 transition-all z-10 border border-[#E8D8C8]"
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={14}
              fill={inWishlist ? '#591B2B' : 'none'}
              stroke={inWishlist ? '#591B2B' : 'currentColor'}
            />
          </button>

          {/* Desktop Hover Actions (Add to Cart & Quick View) */}
          <div className="absolute inset-x-0 bottom-0 p-2.5 hidden sm:flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
            <button
              onClick={handleAdd}
              disabled={isOutOfStock}
              className="flex-1 py-2.5 bg-[#591B2B] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#762C43] transition-colors shadow-md"
            >
              {addedNotice ? (
                <>
                  <Check size={13} className="text-[#D3AA57]" /> Added!
                </>
              ) : (
                <>
                  <ShoppingBag size={13} /> Add to Cart
                </>
              )}
            </button>
            <button
              onClick={handleQuickView}
              className="w-9 h-9 bg-white flex items-center justify-center text-[#33241F] hover:text-[#591B2B] hover:bg-[#FAF2E6] transition-colors shadow-md"
              aria-label="Quick View"
              title="Quick View"
            >
              <Eye size={15} />
            </button>
          </div>
        </Link>

        {/* Product Details Section */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white border-t border-[#E8D8C8]/60">
          <div>
            <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-[#D3AA57] mb-1">
              <span>{product.categoryLabel}</span>
              <div className="flex items-center gap-0.5 text-[#D3AA57]">
                <Star size={11} className="fill-[#D3AA57]" />
                <span className="text-[10px] font-bold text-[#33241F]">4.9</span>
              </div>
            </div>
            
            <Link href={`/product/${product.slug}`} className="block">
              <h3
                className="text-xs sm:text-sm font-semibold text-[#33241F] hover:text-[#591B2B] transition-colors line-clamp-2 leading-snug mb-2 font-serif"
              >
                {product.name}
              </h3>
            </Link>
          </div>

          <div>
            {/* Price & Stock */}
            <div className="flex items-baseline justify-between mb-3 pt-1 border-t border-dashed border-[#E8D8C8]">
              <div className="flex items-baseline gap-2">
                <span className="text-sm sm:text-base font-bold text-[#591B2B]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-[11px] text-[#8E7A70] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                {product.availability ? '● In Stock' : 'Sold Out'}
              </span>
            </div>

            {/* Mobile Action Buttons */}
            <button
              onClick={handleAdd}
              disabled={isOutOfStock}
              className="sm:hidden w-full py-2 bg-[#591B2B] text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-sm"
            >
              {addedNotice ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setQuickViewOpen(false)}
        >
          <div
            className="bg-white max-w-lg w-full p-6 border-2 border-[#D3AA57] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black w-7 h-7 flex items-center justify-center border border-gray-200"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
              <div className="relative aspect-square border border-[#E8D8C8] overflow-hidden bg-[#FAF2E6]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  unoptimized={product.image.startsWith('data:')}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#D3AA57]/15 text-[#762C43] text-[9px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles size={10} /> {product.categoryLabel}
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-[#591B2B] leading-tight">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-[#8E7A70] mt-1">Code: {product.id}</p>
                  
                  <div className="flex items-baseline gap-2 mt-3">
                    <span className="text-xl font-bold text-[#591B2B] font-serif">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-[#33241F]/80 mt-2 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <button
                    onClick={handleAdd}
                    className="w-full py-2.5 bg-[#591B2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#762C43] transition-colors"
                  >
                    Add to Cart
                  </button>

                  <a
                    href={productWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#1EBE5D] transition-colors text-center"
                  >
                    <MessageCircle size={14} />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <Link
                    href={`/product/${product.slug}`}
                    className="text-center text-[11px] text-[#D3AA57] font-bold uppercase tracking-wider underline pt-1"
                  >
                    View Full Product Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
