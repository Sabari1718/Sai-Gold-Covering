'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { products as defaultProducts } from '@/data/products';
import type { CartItem, WishlistItem, Product, ProductCategory } from '@/types';

const CATEGORY_LABEL_MAP: Record<ProductCategory, string> = {
  chains: 'Chains & Long Chains',
  bangles: 'Colourful Bangles & Kadas',
  necklaces: 'Necklace Sets & Chokers',
  cosmetics: 'Cosmetics & Beauty Essentials',
  'fancy-items': 'Fancy Fashion Accessories',
};

const STORAGE_KEY_CUSTOM = 'sai_gold_custom_products';
const STORAGE_KEY_DELETED = 'sai_gold_deleted_ids';
const STORAGE_KEY_MODIFIED = 'sai_gold_modified_products';

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

  // Products & Admin Management
  products: Product[];
  productsLoaded: boolean;
  addProduct: (productData: Omit<Product, 'id' | 'slug' | 'categoryLabel' | 'isDemo'> & { id?: string; slug?: string }) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (category: ProductCategory | 'all' | 'jewellery') => Product[];
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const cart = useCart();
  const wishlist = useWishlist();

  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [productsLoaded, setProductsLoaded] = useState(false);

  // Load persisted products from localStorage and merge with API
  const loadPersistedProducts = useCallback(() => {
    try {
      if (typeof window === 'undefined') return;

      const customStr = localStorage.getItem(STORAGE_KEY_CUSTOM);
      const deletedStr = localStorage.getItem(STORAGE_KEY_DELETED);
      const modifiedStr = localStorage.getItem(STORAGE_KEY_MODIFIED);

      const customProducts: Product[] = customStr ? JSON.parse(customStr) : [];
      const deletedIds: string[] = deletedStr ? JSON.parse(deletedStr) : [];
      const modifiedMap: Record<string, Partial<Product>> = modifiedStr ? JSON.parse(modifiedStr) : {};

      // Filter base products
      const activeBase = defaultProducts
        .filter((p) => !deletedIds.includes(p.id))
        .map((p) => (modifiedMap[p.id] ? { ...p, ...modifiedMap[p.id] } : p));

      // Filter and modify custom products
      const activeCustom = customProducts
        .filter((p) => !deletedIds.includes(p.id))
        .map((p) => (modifiedMap[p.id] ? { ...p, ...modifiedMap[p.id] } : p));

      // Merge: Newest custom products first, then active base products
      setProducts([...activeCustom, ...activeBase]);
      setProductsLoaded(true);
    } catch (e) {
      console.error('Error loading products from storage:', e);
      setProducts(defaultProducts);
      setProductsLoaded(true);
    }
  }, []);

  // Initial load and sync with API
  useEffect(() => {
    loadPersistedProducts();

    // Cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === STORAGE_KEY_CUSTOM ||
        e.key === STORAGE_KEY_DELETED ||
        e.key === STORAGE_KEY_MODIFIED ||
        !e.key
      ) {
        loadPersistedProducts();
      }
    };

    const handleCustomSync = () => {
      loadPersistedProducts();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('sai_gold_products_updated', handleCustomSync);

    // Also fetch from API endpoint if available
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.success && Array.isArray(data.products) && data.products.length > 0) {
          try {
            const customStr = localStorage.getItem(STORAGE_KEY_CUSTOM);
            const currentCustom: Product[] = customStr ? JSON.parse(customStr) : [];
            const ids = new Set(currentCustom.map((p) => p.id));
            let hasNew = false;
            const merged = [...currentCustom];

            data.products.forEach((apiProd: Product) => {
              if (!ids.has(apiProd.id)) {
                merged.unshift(apiProd);
                hasNew = true;
              }
            });

            if (hasNew) {
              localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(merged));
              loadPersistedProducts();
            }
          } catch (err) {
            console.error('Failed to sync API products with localStorage:', err);
          }
        }
      })
      .catch(() => {
        // API optional
      });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sai_gold_products_updated', handleCustomSync);
    };
  }, [loadPersistedProducts]);

  // Add a new product (from shop owner admin panel)
  const addProduct = useCallback(
    (productData: Omit<Product, 'id' | 'slug' | 'categoryLabel' | 'isDemo'> & { id?: string; slug?: string }): Product => {
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      const cleanSlug =
        productData.slug ||
        `${productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}-${randomSuffix}`;

      const id = productData.id || `SGC-NEW-${timestamp.toString().slice(-6)}`;
      const categoryLabel = CATEGORY_LABEL_MAP[productData.category] || 'Special Collection';

      const newProduct: Product = {
        ...productData,
        id,
        slug: cleanSlug,
        categoryLabel,
        isDemo: false,
        gallery: productData.gallery && productData.gallery.length > 0 ? productData.gallery : [productData.image],
        tags: productData.tags || [productData.category, productData.subcategory],
        stock: productData.stock !== undefined ? productData.stock : 10,
        availability: productData.availability !== undefined ? productData.availability : true,
      };

      try {
        const customStr = localStorage.getItem(STORAGE_KEY_CUSTOM);
        const customProducts: Product[] = customStr ? JSON.parse(customStr) : [];
        const updatedCustom = [newProduct, ...customProducts];
        localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(updatedCustom));

        // Notify other components & tabs
        window.dispatchEvent(new Event('sai_gold_products_updated'));
      } catch (err) {
        console.error('Failed to save product in localStorage:', err);
      }

      // Sync with API in background
      fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      }).catch(() => {
        // silent fail
      });

      setProducts((prev) => [newProduct, ...prev]);
      return newProduct;
    },
    []
  );

  // Update product price, stock, or any field
  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    try {
      const customStr = localStorage.getItem(STORAGE_KEY_CUSTOM);
      let customProducts: Product[] = customStr ? JSON.parse(customStr) : [];
      const customIndex = customProducts.findIndex((p) => p.id === id);

      if (customIndex !== -1) {
        customProducts[customIndex] = { ...customProducts[customIndex], ...updates };
        localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(customProducts));
        // sync with API
        fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customProducts[customIndex]),
        }).catch(() => {});
      } else {
        // Base product modification
        const modifiedStr = localStorage.getItem(STORAGE_KEY_MODIFIED);
        const modifiedMap: Record<string, Partial<Product>> = modifiedStr ? JSON.parse(modifiedStr) : {};
        modifiedMap[id] = { ...(modifiedMap[id] || {}), ...updates };
        localStorage.setItem(STORAGE_KEY_MODIFIED, JSON.stringify(modifiedMap));
      }

      window.dispatchEvent(new Event('sai_gold_products_updated'));
    } catch (err) {
      console.error('Failed to update product in localStorage:', err);
    }

    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  // Delete product (hide from store)
  const deleteProduct = useCallback((id: string) => {
    try {
      const customStr = localStorage.getItem(STORAGE_KEY_CUSTOM);
      let customProducts: Product[] = customStr ? JSON.parse(customStr) : [];
      const isCustom = customProducts.some((p) => p.id === id);

      if (isCustom) {
        customProducts = customProducts.filter((p) => p.id !== id);
        localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(customProducts));
        // sync delete with API
        fetch(`/api/products?id=${encodeURIComponent(id)}`, {
          method: 'DELETE',
        }).catch(() => {});
      } else {
        const deletedStr = localStorage.getItem(STORAGE_KEY_DELETED);
        const deletedIds: string[] = deletedStr ? JSON.parse(deletedStr) : [];
        if (!deletedIds.includes(id)) {
          deletedIds.push(id);
          localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify(deletedIds));
        }
      }

      window.dispatchEvent(new Event('sai_gold_products_updated'));
    } catch (err) {
      console.error('Failed to delete product in localStorage:', err);
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Reset to original 50 products
  const resetProductsToDefault = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY_CUSTOM);
      localStorage.removeItem(STORAGE_KEY_DELETED);
      localStorage.removeItem(STORAGE_KEY_MODIFIED);
      window.dispatchEvent(new Event('sai_gold_products_updated'));
    } catch (err) {
      console.error('Failed to reset storage:', err);
    }
    setProducts(defaultProducts);
  }, []);

  // Find product by slug
  const getProductBySlug = useCallback(
    (slug: string) => {
      return products.find((p) => p.slug === slug);
    },
    [products]
  );

  // Filter products by category
  const getProductsByCategory = useCallback(
    (category: ProductCategory | 'all' | 'jewellery') => {
      if (category === 'all') return products;
      if (category === 'jewellery') {
        return products.filter((p) => p.category === 'chains' || p.category === 'necklaces');
      }
      return products.filter((p) => p.category === category);
    },
    [products]
  );

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

    products,
    productsLoaded,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    getProductBySlug,
    getProductsByCategory,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
