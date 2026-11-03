'use client';

import { useState, useEffect, useCallback } from 'react';
import type { WishlistItem, Product } from '@/types';

const WISHLIST_KEY = 'sgc_wishlist';

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  const persist = (next: WishlistItem[]) => {
    setItems(next);
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const addToWishlist = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((i) => i.product.id === product.id)) return prev;
      const next = [
        ...prev,
        { product, addedAt: new Date().toISOString() },
      ];
      try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(next)); } catch {/* ignore */}
      return next;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.product.id !== productId);
      try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(next)); } catch {/* ignore */}
      return next;
    });
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      const next = existing
        ? prev.filter((i) => i.product.id !== product.id)
        : [...prev, { product, addedAt: new Date().toISOString() }];
      try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(next)); } catch {/* ignore */}
      return next;
    });
  }, []);

  const isInWishlist = (productId: string) =>
    items.some((i) => i.product.id === productId);

  return {
    items,
    mounted,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    count: items.length,
  };
}

