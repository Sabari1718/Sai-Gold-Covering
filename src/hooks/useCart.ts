'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '@/types';

const CART_KEY = 'sgc_cart';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  const persist = (next: CartItem[]) => {
    setItems(next);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const addToCart = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      let next: CartItem[];
      if (existing) {
        next = prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + qty, product.stock) }
            : i
        );
      } else {
        next = [...prev, { product, quantity: Math.min(qty, product.stock) }];
      }
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(next));
      } catch {/* ignore */}
      return next;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.product.id !== productId);
      try { localStorage.setItem(CART_KEY, JSON.stringify(next)); } catch {/* ignore */}
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => {
      const next = prev.map((i) =>
        i.product.id === productId
          ? { ...i, quantity: Math.min(qty, i.product.stock) }
          : i
      );
      try { localStorage.setItem(CART_KEY, JSON.stringify(next)); } catch {/* ignore */}
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    persist([]);
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );
  const isInCart = (productId: string) =>
    items.some((i) => i.product.id === productId);

  return {
    items,
    itemCount,
    subtotal,
    mounted,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
  };
}

