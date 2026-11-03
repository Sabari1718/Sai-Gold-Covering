'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/data/products';
import { WHATSAPP_CART_URL, SITE_CONFIG } from '@/lib/config';
import { Trash2, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cartItems, cartCount, cartSubtotal, updateQuantity, removeFromCart, clearCart } =
    useStore();

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    const summaryText = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} [${item.product.categoryLabel}] (ID: ${item.product.id})\n   Qty: ${
            item.quantity
          } × ${formatPrice(item.product.price)} = ${formatPrice(
            item.product.price * item.quantity
          )}`
      )
      .join('\n\n');

    const totalText = `\n\nTotal Estimated Amount: ${formatPrice(cartSubtotal)}`;
    const fullOrder = summaryText + totalText;

    const url = WHATSAPP_CART_URL(fullOrder);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#FAF7F1] min-h-[75vh] flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md bg-white border border-[#E8DFD3] p-10 sm:p-14 shadow-sm">
          <div className="w-16 h-16 bg-[#FAF7F1] rounded-full flex items-center justify-center mx-auto mb-6 text-[#54252C]">
            <ShoppingBag size={28} />
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#54252C] mb-3"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#5A473E] mb-8 leading-relaxed">
            Discover our collection of imitation gold covering jewellery, bridal malas, lipsticks,
            and hair accessories to start shopping.
          </p>
          <Link
            href="/shop"
            className="btn-burgundy"
          >
            Start Shopping <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F1] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 pb-4 border-b border-[#E8DFD3] flex items-baseline justify-between">
          <h1
            className="text-2xl sm:text-4xl font-bold text-[#54252C]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Shopping Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
          <button
            onClick={clearCart}
            className="text-xs text-[#8E7A70] hover:text-red-600 transition-colors"
          >
            Clear Entire Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Cart Table (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#E8DFD3] shadow-sm">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3.5 border-b border-[#E8DFD3] text-[10px] font-bold uppercase tracking-wider text-[#8E7A70] bg-[#FAF7F1]">
              <div className="col-span-6">Product Details</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>

            <div className="divide-y divide-[#E8DFD3]">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                >
                  {/* Image + Title */}
                  <div className="sm:col-span-6 flex gap-4 items-center">
                    <div className="relative w-20 h-24 shrink-0 bg-[#FAF7F1] border border-[#E8DFD3] overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#A98243] block">
                        {item.product.categoryLabel}
                      </span>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="text-xs sm:text-sm font-semibold text-[#30241F] hover:text-[#54252C] transition-colors leading-snug line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-[10px] text-[#8E7A70] mt-0.5">ID: {item.product.id}</p>
                      
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[11px] text-red-600 hover:underline flex items-center gap-1 mt-2 sm:hidden"
                      >
                        <Trash2 size={11} /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="sm:col-span-2 text-left sm:text-center text-xs sm:text-sm font-semibold text-[#30241F]">
                    <span className="sm:hidden text-xs text-[#8E7A70] font-normal mr-2">Price:</span>
                    {formatPrice(item.product.price)}
                  </div>

                  {/* Quantity Adjustment */}
                  <div className="sm:col-span-2 flex sm:justify-center items-center gap-2">
                    <span className="sm:hidden text-xs text-[#8E7A70] mr-2">Qty:</span>
                    <div className="flex items-center border border-[#E8DFD3]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs hover:bg-[#FAF7F1]"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs hover:bg-[#FAF7F1]"
                        disabled={item.quantity >= item.product.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Line Total & Remove button */}
                  <div className="sm:col-span-2 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#54252C]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="hidden sm:inline-flex text-[#8E7A70] hover:text-red-600 transition-colors p-1"
                      title="Remove from bag"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 sm:p-5 border-t border-[#E8DFD3] flex justify-between items-center bg-[#FAF7F1]/60">
              <Link
                href="/shop"
                className="text-xs font-bold uppercase tracking-wider text-[#A98243] hover:text-[#54252C]"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Checkout & Order Summary Panel (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#E8DFD3] p-6 sm:p-8 shadow-sm">
            <h2
              className="text-lg sm:text-xl font-bold text-[#54252C] mb-6"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Order Breakdown
            </h2>

            <div className="space-y-3.5 mb-6 text-xs sm:text-sm">
              <div className="flex justify-between text-[#5A473E]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#30241F]">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-[#5A473E]">
                <span>In-Store Pickup</span>
                <span className="text-emerald-700 font-semibold">FREE (Malumichampatti)</span>
              </div>
              <div className="flex justify-between text-[#5A473E]">
                <span>Door Delivery</span>
                <span className="text-[11px] text-[#8E7A70]">Calculated via WhatsApp</span>
              </div>

              <div className="h-px bg-[#E8DFD3] my-4" />

              <div className="flex justify-between text-base font-bold text-[#54252C]">
                <span>Estimated Total</span>
                <span className="text-xl font-serif">{formatPrice(cartSubtotal)}</span>
              </div>
            </div>

            {/* Explanation box */}
            <div className="bg-[#FAF7F1] border border-[#E8DFD3] p-4 mb-6 text-xs text-[#5A473E] leading-relaxed">
              <p className="font-bold text-[#30241F] mb-1 flex items-center gap-1">
                <ShieldCheck size={14} className="text-[#C6A15B]" /> Safe WhatsApp Ordering
              </p>
              Clicking below opens a pre-composed message with your full order directly to Sai Gold Covering. We will confirm item availability, pickup time, and payment method securely.
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-4 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle size={18} />
              Place Order on WhatsApp
            </button>

            <p className="text-[10px] text-[#8E7A70] text-center mt-3">
              Store Pickup Available at 4 Corner Signal, Malumichampatti
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
