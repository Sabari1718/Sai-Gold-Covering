'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/data/products';
import { WHATSAPP_ORDER_URL } from '@/lib/config';
import type { Product } from '@/types';
import { Heart, ShoppingBag, MessageCircle, Check, ShieldCheck, Sparkles, MapPin, Star } from 'lucide-react';

interface Props {
  product: Product;
}

export default function ProductInfo({ product }: Props) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const inStock = product.availability && product.stock > 0;

  const handleAddToCart = () => {
    if (!inStock) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!inStock) return;
    addToCart(product, quantity);
    router.push('/cart');
  };

  const handleWhatsAppOrder = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const url = WHATSAPP_ORDER_URL(
      product.name,
      product.id,
      formatPrice(product.price),
      quantity,
      currentUrl
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col bg-white border border-[#E8D8C8] p-6 sm:p-8 shadow-sm">
      
      {/* Category, Subcategory & ID */}
      <div className="flex items-center justify-between text-[11px] text-[#8E7A70] mb-3 uppercase tracking-widest font-semibold">
        <span>{product.categoryLabel} • {product.subcategory}</span>
        <span>ID: {product.id}</span>
      </div>

      {/* Name */}
      <h1
        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#591B2B] mb-2 leading-tight"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {product.name}
      </h1>

      {/* Flipkart-style Rating Pill & Review Link */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#388E3C] text-white text-xs font-bold rounded shadow-sm">
          <span>4.9</span>
          <Star size={11} className="fill-white" />
        </span>
        <span className="text-xs font-semibold text-[#8E7A70]">
          Verified Customer Ratings &amp; Reviews
        </span>
        <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          ✓ In-Store &amp; Online Tested
        </span>
      </div>

      {/* Price & Taxes */}
      <div className="flex items-baseline gap-3 mb-5">
        <span className="text-2xl sm:text-3xl font-bold text-[#33241F]">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <span className="text-sm text-[#8E7A70] line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
        <span className="text-[10px] text-[#D3AA57] font-bold uppercase tracking-wider ml-1">
          (Inclusive of all taxes)
        </span>
      </div>

      {/* Stock Availability */}
      <div className="mb-6 flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            inStock ? (product.stock <= 5 ? 'bg-amber-500' : 'bg-emerald-600') : 'bg-red-500'
          }`}
        />
        <span className="text-xs font-bold uppercase tracking-wider text-[#33241F]">
          {inStock
            ? product.stock <= 5
              ? `Only ${product.stock} items left in stock`
              : 'In Stock • Ready for Showroom Trial & Fast Dispatch'
            : 'Temporarily Sold Out'}
        </span>
      </div>

      <div className="w-full h-px bg-[#E8D8C8] mb-6" />

      {/* Description */}
      <p className="text-xs sm:text-sm text-[#33241F]/80 leading-relaxed mb-6">
        {product.description}
      </p>

      {/* Specifications */}
      <div className="grid grid-cols-2 gap-3 bg-[#FFF9F0] p-4 mb-6 border border-[#E8D8C8] text-xs">
        {product.material && (
          <div>
            <span className="text-[#8E7A70] block text-[10px] uppercase tracking-wider">Finish / Plating</span>
            <span className="font-semibold text-[#33241F]">{product.material}</span>
          </div>
        )}
        {product.weight && (
          <div>
            <span className="text-[#8E7A70] block text-[10px] uppercase tracking-wider">Weight / Size</span>
            <span className="font-semibold text-[#33241F]">{product.weight}</span>
          </div>
        )}
        {product.shade && (
          <div>
            <span className="text-[#8E7A70] block text-[10px] uppercase tracking-wider">Color / Shade</span>
            <span className="font-semibold text-[#591B2B]">{product.shade}</span>
          </div>
        )}
        <div>
          <span className="text-[#8E7A70] block text-[10px] uppercase tracking-wider">Showroom</span>
          <span className="font-semibold text-[#33241F]">Malumichampatti, Coimbatore</span>
        </div>
      </div>

      {/* Quantity & Wishlist */}
      {inStock && (
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border border-[#E8D8C8] bg-white">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3.5 py-2 text-[#33241F] hover:bg-[#FFF9F0] text-xs font-bold"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-4 py-2 text-xs font-bold text-[#33241F]">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              className="px-3.5 py-2 text-[#33241F] hover:bg-[#FFF9F0] text-xs font-bold"
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>

          <button
            onClick={() => toggleWishlist(product)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-colors ${
              isWishlisted
                ? 'border-[#591B2B] text-[#591B2B] bg-[#591B2B]/10'
                : 'border-[#E8D8C8] text-[#33241F] hover:border-[#591B2B]'
            }`}
          >
            <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
            {isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="flex-1 py-3.5 bg-[#591B2B] text-[#FFF9F0] text-xs font-bold uppercase tracking-widest hover:bg-[#762C43] transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            {added ? (
              <>
                <Check size={15} /> Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag size={15} /> Add to Cart
              </>
            )}
          </button>

          <button
            onClick={handleBuyNow}
            disabled={!inStock}
            className="flex-1 py-3.5 bg-[#D3AA57] text-[#33241F] text-xs font-bold uppercase tracking-widest hover:bg-[#B88E3E] hover:text-white transition-colors"
          >
            Buy Now
          </button>
        </div>

        {/* WhatsApp Order Button */}
        <button
          onClick={handleWhatsAppOrder}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors shadow-sm"
        >
          <MessageCircle size={17} />
          Order on WhatsApp (Instant Chat)
        </button>
      </div>

      {/* Assurances */}
      <div className="border-t border-[#E8D8C8] pt-6 space-y-2.5 text-xs text-[#33241F]/80">
        <div className="flex items-center gap-2.5">
          <ShieldCheck size={16} className="text-[#D3AA57] shrink-0" />
          <span>Centralized image assets: Ready for immediate real shop image replacement</span>
        </div>
        <div className="flex items-center gap-2.5">
          <MapPin size={16} className="text-[#D3AA57] shrink-0" />
          <span>Physical Store Trial: 4 Corner Signal, Malumichampatti, Coimbatore</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Sparkles size={16} className="text-[#D3AA57] shrink-0" />
          <span>Micro-gold plating designed to withstand sweat and festive wear</span>
        </div>
      </div>

    </div>
  );
}
