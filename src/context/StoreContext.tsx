'use client';

import React, { createContext, useContext } from 'react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import type { CartItem, WishlistItem, Product } from '@/types';

interface StoreContextType {
  // Cart
  cartItems: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartMounted: boolean;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  // Wishlist
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  wishlistMounted: boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const cart = useCart();
  const wishlist = useWishlist();

  const value: StoreContextType = {
    cartItems: cart.items,
    cartCount: cart.itemCount,
    cartSubtotal: cart.subtotal,
    cartMounted: cart.mounted,
    addToCart: cart.addToCart,
    removeFromCart: cart.removeFromCart,
    updateQuantity: cart.updateQuantity,
    clearCart: cart.clearCart,
    isInCart: cart.isInCart,

    wishlistItems: wishlist.items,
    wishlistCount: wishlist.count,
    wishlistMounted: wishlist.mounted,
    addToWishlist: wishlist.addToWishlist,
    removeFromWishlist: wishlist.removeFromWishlist,
    toggleWishlist: wishlist.toggleWishlist,
    isInWishlist: wishlist.isInWishlist,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

