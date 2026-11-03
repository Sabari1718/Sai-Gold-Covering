'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  LogOut,
  ShoppingBag,
  ExternalLink,
  Search,
  Sparkles,
  RefreshCw,
  Download,
  IndianRupee,
  Layers,
  Tag,
  Lock,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/data/products';
import type { Product, ProductCategory } from '@/types';

// Category presets and default subcategories
const CATEGORIES: {
  id: ProductCategory;
  label: string;
  subcategories: string[];
  placeholderDesc: string;
}[] = [
  {
    id: 'chains',
    label: 'Chains & Long Chains',
    subcategories: [
      'Classic Chains',
      'Daily Wear',
      'Long Chains',
      'Antique Finish',
      'Temple Chains',
      'Mangalsutra / Nallapusalu',
      'Minimal Chains',
      'Fashion Chains',
    ],
    placeholderDesc:
      'Premium 1-gram micro gold-plated chain crafted with traditional South Indian artistry. Features radiant long-lasting shine, skin-friendly brass alloy, and secure s-hook clasp.',
  },
  {
    id: 'bangles',
    label: 'Colourful Bangles & Kadas',
    subcategories: [
      'Daily Bangles',
      'Antique Kadas',
      'Stone Bangles',
      'Glass Bangles',
      'Bridal Sets',
      'Designer Kadas',
      'Kundan Bangles',
      'Silk Thread Bangles',
    ],
    placeholderDesc:
      'Exquisite bangle set showcasing fine micro-gold plating and high-luster stone work. Perfect for weddings, festive occasions, and daily traditional attire.',
  },
  {
    id: 'necklaces',
    label: 'Necklace Sets & Chokers',
    subcategories: [
      'Bridal Sets',
      'Temple Sets',
      'Kasu Malas',
      'Antique Sets',
      'Stone Necklaces',
      'Chokers',
      'Haaram',
      'Designer Sets',
    ],
    placeholderDesc:
      'Opulent bridal necklace set with matching earrings. Handcrafted with Kemp and ruby stones, finished in authentic South Indian temple gold luster.',
  },
  {
    id: 'cosmetics',
    label: 'Cosmetics & Beauty Essentials',
    subcategories: [
      'Lipsticks',
      'Skincare',
      'Face Makeup',
      'Eye Makeup',
      'Nail Polish',
      'Makeup Kits',
      'Beauty Tools',
      'Herbal Care',
    ],
    placeholderDesc:
      'High-pigment, long-lasting beauty cosmetic designed for Indian skin tones. Dermatologically tested, transfer-resistant, and gentle for all-day wear.',
  },
  {
    id: 'fancy-items',
    label: 'Fancy Fashion Accessories',
    subcategories: [
      'Hair Clips',
      'Hair Pins',
      'Scrunchies',
      'Hair Bands',
      'Fashion Earrings',
      'Bindis',
      'Fashion Rings',
      'Anklets (Kolusu)',
      'Saree Pins',
      'Bridal Hair Ornaments',
    ],
    placeholderDesc:
      'Trendy women’s fashion accessory carefully curated for durability, festive elegance, and everyday charm.',
  },
];

// Helper to compress camera/upload photo to compact, fast JPEG data URL
async function compressImage(file: File, maxDim = 1080, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new (window as any).Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(img.src);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
}

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct, resetProductsToDefault } = useStore();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Login Form
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'settings'>('add');

  // Add Product Form State
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('chains');
  const [subcategory, setSubcategory] = useState('Classic Chains');
  const [customSubcategory, setCustomSubcategory] = useState('');
  const [price, setPrice] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [stock, setStock] = useState<number>(10);
  const [inStock, setInStock] = useState<boolean>(true);
  const [isNewArrival, setIsNewArrival] = useState<boolean>(true);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(false);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [material, setMaterial] = useState('1-Gram Micro Gold Polish');
  const [weightOrShade, setWeightOrShade] = useState('');
  const [description, setDescription] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState<string>('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  // Success Feedback
  const [addedProductSuccess, setAddedProductSuccess] = useState<Product | null>(null);
  const [formError, setFormError] = useState('');

  // Manage Tab Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | ProductCategory>('all');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState('');

  // File Inputs
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Check login on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sai_gold_admin_auth');
      if (stored === 'true') {
        setIsAuthenticated(true);
      }
    } catch {
      // ignore
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // Update default subcategory and description when category changes
  useEffect(() => {
    const cat = CATEGORIES.find((c) => c.id === category);
    if (cat) {
      setSubcategory(cat.subcategories[0]);
      if (!description || CATEGORIES.some((c) => c.placeholderDesc === description)) {
        setDescription(cat.placeholderDesc);
      }
    }
  }, [category]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const cleanUser = usernameInput.trim().toLowerCase().replace(/\s+/g, ' ');
    const cleanPass = passwordInput.trim();

    const isUserValid = cleanUser === 'sai gold' || cleanUser === 'saigold';
    const isPassValid = cleanPass === 'Sabari@18' || cleanPass.toLowerCase() === 'sabari@18';

    if (isUserValid && isPassValid) {
      localStorage.setItem('sai_gold_admin_auth', 'true');
      setIsAuthenticated(true);
    } else {
      setLoginError('Invalid credentials. Check username (Sai Gold) and password (Sabari@18).');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('sai_gold_admin_auth');
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
  };

  // Handle Image File Selection (Camera or Gallery)
  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingImage(true);
      setFormError('');
      const compressedDataUrl = await compressImage(file, 1080, 0.85);
      setImageDataUrl(compressedDataUrl);
    } catch (err) {
      console.error(err);
      setFormError('Failed to process image. Please try another photo.');
    } finally {
      setIsProcessingImage(false);
      // reset file input
      e.target.value = '';
    }
  };

  // Handle Add Product Submit
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!productName.trim()) {
      setFormError('Please enter product name.');
      return;
    }

    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setFormError('Please enter a valid price in INR.');
      return;
    }

    if (!imageDataUrl) {
      setFormError('Please capture or upload a product photograph.');
      return;
    }

    const finalSubcategory = customSubcategory.trim() || subcategory;
    const numOriginal = originalPrice ? parseFloat(originalPrice) : undefined;

    const newProd = addProduct({
      name: productName.trim(),
      category,
      subcategory: finalSubcategory,
      price: numPrice,
      originalPrice: numOriginal && numOriginal > numPrice ? numOriginal : undefined,
      description: description || CATEGORIES.find((c) => c.id === category)?.placeholderDesc || '',
      shortDescription: `${finalSubcategory} - ₹${numPrice}`,
      image: imageDataUrl,
      gallery: [imageDataUrl],
      availability: inStock,
      stock,
      isNewArrival,
      isBestSeller,
      isFeatured,
      material: material.trim() || undefined,
      weight: weightOrShade.trim() || undefined,
      tags: [category, finalSubcategory, 'Sai Gold Covering', 'Coimbatore'],
    });

    setAddedProductSuccess(newProd);

    // Reset Form
    setProductName('');
    setPrice('');
    setOriginalPrice('');
    setCustomSubcategory('');
    setWeightOrShade('');
    setImageDataUrl('');

    // Auto dismiss success notice after 10s
    setTimeout(() => {
      setAddedProductSuccess(null);
    }, 10000);
  };

  // Filtered products in Manage tab
  const managedProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = filterCategory === 'all' || p.category === filterCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [products, filterCategory, searchQuery]);

  // Save quick price edit
  const handleSavePrice = (id: string) => {
    const newP = parseFloat(tempPrice);
    if (!isNaN(newP) && newP > 0) {
      updateProduct(id, { price: newP });
    }
    setEditingPriceId(null);
    setTempPrice('');
  };

  // Toggle in-stock / out-of-stock
  const handleToggleStock = (product: Product) => {
    updateProduct(product.id, {
      availability: !product.availability,
      stock: !product.availability ? 10 : 0,
    });
  };

  // Delete product with confirmation
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from store inventory?`)) {
      deleteProduct(id);
    }
  };

  // Export JSON backup
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sai-gold-covering-catalog-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Reset to default
  const handleResetCatalog = () => {
    if (
      window.confirm(
        'Warning: This will restore the store catalog to the initial 50 items and clear all custom changes. Proceed?'
      )
    ) {
      resetProductsToDefault();
      alert('Store inventory reset to default 50 products.');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#591B2B] border-t-[#D3AA57] rounded-full animate-spin" />
      </div>
    );
  }

  // =========================================================================
  // LOGIN SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF9F0] via-[#FAF2E6] to-[#FFF9F0] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white border border-[#E8D8C8] shadow-2xl p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Top Gold Ornament Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#591B2B] via-[#D3AA57] to-[#591B2B]" />

          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#591B2B] to-[#762C43] border-2 border-[#D3AA57] flex items-center justify-center text-[#ECC880] shadow-md">
              <Lock size={26} />
            </div>
            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D3AA57]">
              Store Administration
            </p>
            <h1
              className="text-2xl sm:text-3xl font-bold text-[#591B2B] mt-1"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Sai Gold Covering
            </h1>
            <p className="text-xs text-[#8E7A70] mt-1">
              Malumichampatti, Coimbatore • Store Manager Portal
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                autoComplete="off"
                spellCheck={false}
                required
                className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D8C8] text-sm text-[#33241F] focus:outline-none focus:border-[#D3AA57] focus:ring-1 focus:ring-[#D3AA57] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D8C8] text-sm text-[#33241F] focus:outline-none focus:border-[#D3AA57] focus:ring-1 focus:ring-[#D3AA57] transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E7A70] hover:text-[#591B2B]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#ECC880] via-[#D3AA57] to-[#B88E3E] text-[#1A0B10] font-black uppercase tracking-widest text-xs shadow-md hover:brightness-105 active:scale-[0.99] transition-all duration-200 mt-2"
            >
              Sign In to Admin Panel
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E8D8C8] text-center">
            <Link
              href="/"
              className="text-xs text-[#8E7A70] hover:text-[#591B2B] inline-flex items-center gap-1.5 font-medium"
            >
              ← Back to Sai Gold Covering Store
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Category counts
  const countChains = products.filter((p) => p.category === 'chains').length;
  const countBangles = products.filter((p) => p.category === 'bangles').length;
  const countNecklaces = products.filter((p) => p.category === 'necklaces').length;
  const countCosmetics = products.filter((p) => p.category === 'cosmetics').length;
  const countFancy = products.filter((p) => p.category === 'fancy-items').length;

  // =========================================================================
  // ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      {/* Hidden inputs for camera capture & file picking */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        onChange={handleImageFile}
        className="hidden"
      />
      <input
        type="file"
        accept="image/*"
        ref={galleryInputRef}
        onChange={handleImageFile}
        className="hidden"
      />

      {/* Top Admin Header Bar */}
      <header className="bg-[#591B2B] border-b border-[#D3AA57]/40 text-[#FFF9F0] sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ECC880] to-[#D3AA57] text-[#1A0B10] font-black flex items-center justify-center text-xs shadow-sm">
              SGC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-wide text-[#ECC880]">
                  SAI GOLD COVERING
                </span>
                <span className="bg-[#D3AA57]/30 text-[#ECC880] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-[#FFF9F0]/70 hidden sm:block">
                Store Owner Dashboard • Sabari
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              target="_blank"
              className="px-3.5 py-1.5 bg-[#FFF9F0]/10 hover:bg-[#FFF9F0]/20 border border-[#D3AA57]/50 text-xs font-bold text-[#ECC880] flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">View Live Store</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 sm:px-3 sm:py-1.5 text-xs text-rose-300 hover:text-white hover:bg-rose-900/40 border border-transparent hover:border-rose-400/30 transition-colors flex items-center gap-1.5"
              title="Logout"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Category Stats Overview Bar */}
      <div className="bg-[#33241F] text-[#FFF9F0] border-b border-[#591B2B] py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto text-xs">
          <div className="flex items-center gap-2 font-bold text-[#ECC880] shrink-0">
            <ShoppingBag size={14} />
            <span>Store Inventory: {products.length} Products</span>
          </div>
          <div className="flex items-center gap-4 text-[#FFF9F0]/80 shrink-0">
            <span>Chains: <strong className="text-white">{countChains}</strong></span>
            <span>•</span>
            <span>Bangles: <strong className="text-white">{countBangles}</strong></span>
            <span>•</span>
            <span>Necklaces: <strong className="text-white">{countNecklaces}</strong></span>
            <span>•</span>
            <span>Cosmetics: <strong className="text-white">{countCosmetics}</strong></span>
            <span>•</span>
            <span>Fancy Items: <strong className="text-white">{countFancy}</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E8D8C8] mb-8 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('add')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'add'
                ? 'border-[#591B2B] text-[#591B2B] bg-[#F7DDD1]/30'
                : 'border-transparent text-[#8E7A70] hover:text-[#591B2B]'
            }`}
          >
            <Camera size={18} />
            <span>Add New Product (பொருள் சேர்க்க)</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'manage'
                ? 'border-[#591B2B] text-[#591B2B] bg-[#F7DDD1]/30'
                : 'border-transparent text-[#8E7A70] hover:text-[#591B2B]'
            }`}
          >
            <Layers size={18} />
            <span>Manage Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#591B2B] text-[#591B2B] bg-[#F7DDD1]/30'
                : 'border-transparent text-[#8E7A70] hover:text-[#591B2B]'
            }`}
          >
            <SlidersHorizontal size={18} />
            <span>Catalog Backup & Reset</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: ADD NEW PRODUCT
        ========================================================================= */}
        {activeTab === 'add' && (
          <div>
            {/* Added Success Banner */}
            <AnimatePresence>
              {addedProductSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-8 p-4 bg-emerald-50 border-2 border-emerald-500 text-emerald-900 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-emerald-600 shrink-0" size={24} />
                    <div>
                      <p className="font-bold text-sm">
                        🎉 Product Published Successfully!
                      </p>
                      <p className="text-xs text-emerald-800">
                        <strong>{addedProductSuccess.name}</strong> has been added to{' '}
                        {addedProductSuccess.categoryLabel} at ₹{addedProductSuccess.price}.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
                    <Link
                      href={`/shop?category=${addedProductSuccess.category}`}
                      target="_blank"
                      className="px-3.5 py-1.5 bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-800 transition-colors"
                    >
                      View in {addedProductSuccess.categoryLabel} →
                    </Link>
                    <Link
                      href={`/product/${addedProductSuccess.slug}`}
                      target="_blank"
                      className="px-3.5 py-1.5 bg-[#591B2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#762C43] transition-colors"
                    >
                      Product Page →
                    </Link>
                    <button
                      onClick={() => setAddedProductSuccess(null)}
                      className="p-1.5 text-emerald-700 hover:text-emerald-900"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {formError && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle size={18} className="shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form
              onSubmit={handleAddProduct}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* LEFT: PHOTO CAPTURE & UPLOAD (5 COLS) */}
              <div className="lg:col-span-5 bg-white border border-[#E8D8C8] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-[#591B2B]">
                      Product Photograph (புகைப்படம்)
                    </h2>
                    <p className="text-xs text-[#8E7A70]">
                      Take live photo from shop camera or pick from gallery
                    </p>
                  </div>
                  {imageDataUrl && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider rounded">
                      Ready
                    </span>
                  )}
                </div>

                {/* Preview Box */}
                <div className="relative aspect-square w-full bg-[#FAF2E6] border-2 border-dashed border-[#D3AA57] flex flex-col items-center justify-center overflow-hidden mb-4 group">
                  {imageDataUrl ? (
                    <>
                      <Image
                        src={imageDataUrl}
                        alt="Product preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImageDataUrl('')}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                        title="Remove Photo"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : isProcessingImage ? (
                    <div className="text-center p-6">
                      <div className="w-8 h-8 border-3 border-[#591B2B] border-t-[#D3AA57] rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-xs font-bold text-[#591B2B]">Processing photo...</p>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-14 h-14 rounded-full bg-[#FFF9F0] border border-[#D3AA57] text-[#591B2B] flex items-center justify-center mx-auto mb-3 shadow-inner">
                        <Camera size={26} />
                      </div>
                      <p className="text-xs font-bold text-[#33241F] mb-1">
                        No Photograph Captured Yet
                      </p>
                      <p className="text-[11px] text-[#8E7A70] max-w-xs mx-auto">
                        Snap jewellery or cosmetic items directly on your counter.
                      </p>
                    </div>
                  )}
                </div>

                {/* Mobile Camera and Gallery Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="py-3 px-4 bg-gradient-to-r from-[#591B2B] to-[#762C43] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Camera size={16} />
                    <span>Take Photo (Camera)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="py-3 px-4 bg-white border-2 border-[#591B2B] text-[#591B2B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#591B2B] hover:text-white active:scale-95 transition-all"
                  >
                    <Upload size={16} />
                    <span>Upload Gallery</span>
                  </button>
                </div>

                <div className="mt-4 p-3 bg-[#FFF9F0] border border-[#E8D8C8] text-[11px] text-[#8E7A70] leading-relaxed">
                  💡 <strong>Tip for best photos:</strong> Place chains and bangles under shop spotlights with a clean white or dark velvet background for an ultra-premium look. Photos are automatically compressed for lightning-fast loading!
                </div>
              </div>

              {/* RIGHT: PRODUCT DETAILS & PRICING (7 COLS) */}
              <div className="lg:col-span-7 bg-white border border-[#E8D8C8] p-6 shadow-sm space-y-6">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#591B2B] mb-1">
                    Product Details & Pricing (பொருளின் விவரம்)
                  </h2>
                  <p className="text-xs text-[#8E7A70]">
                    Select category, enter price, and set availability.
                  </p>
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                    Product Name (பொருளின் பெயர்) *
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Traditional Antique Lakshmi Chain / Grand Kundan Bangles"
                    required
                    className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E8D8C8] text-sm text-[#33241F] focus:outline-none focus:border-[#D3AA57] focus:ring-1 focus:ring-[#D3AA57]"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                    Category (பிரிவு) *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`p-2.5 text-xs font-bold text-left border transition-all ${
                          category === cat.id
                            ? 'bg-[#591B2B] text-white border-[#591B2B] shadow-sm'
                            : 'bg-[#FFF9F0] text-[#33241F] border-[#E8D8C8] hover:border-[#D3AA57]'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subcategory */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                    Subcategory (துணைப் பிரிவு)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {CATEGORIES.find((c) => c.id === category)?.subcategories.map((sub) => (
                      <button
                        type="button"
                        key={sub}
                        onClick={() => {
                          setSubcategory(sub);
                          setCustomSubcategory('');
                        }}
                        className={`px-3 py-1.5 text-xs font-medium border transition-all ${
                          subcategory === sub && !customSubcategory
                            ? 'bg-[#D3AA57] text-[#1A0B10] font-bold border-[#D3AA57]'
                            : 'bg-[#FFF9F0] text-[#33241F] border-[#E8D8C8] hover:border-[#D3AA57]'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={customSubcategory}
                    onChange={(e) => setCustomSubcategory(e.target.value)}
                    placeholder="Or type custom subcategory (e.g. Mugappu Chains, 2.8 Size Kadas)"
                    className="w-full px-3 py-2 bg-[#FFF9F0] border border-[#E8D8C8] text-xs text-[#33241F] focus:outline-none focus:border-[#D3AA57]"
                  />
                </div>

                {/* Pricing: Selling Price & MRP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                      Selling Price (விற்பனை விலை ₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#591B2B]">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="750"
                        required
                        className="w-full pl-8 pr-4 py-3 bg-[#FFF9F0] border border-[#E8D8C8] text-sm font-bold text-[#33241F] focus:outline-none focus:border-[#D3AA57]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                      Original / MRP Price (₹) (Optional Discount)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#8E7A70]">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="999"
                        className="w-full pl-8 pr-4 py-3 bg-[#FFF9F0] border border-[#E8D8C8] text-sm text-[#8E7A70] focus:outline-none focus:border-[#D3AA57]"
                      />
                    </div>
                  </div>
                </div>

                {/* Stock & Availability */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-3 p-3 bg-[#FFF9F0] border border-[#E8D8C8]">
                    <input
                      type="checkbox"
                      id="inStockCheck"
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                      className="w-4 h-4 accent-[#591B2B]"
                    />
                    <label htmlFor="inStockCheck" className="text-xs font-bold text-[#33241F] cursor-pointer">
                      In Stock & Available in Shop
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-[#33241F] whitespace-nowrap">
                      Stock Count:
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={stock}
                      onChange={(e) => setStock(parseInt(e.target.value) || 0)}
                      className="w-24 px-3 py-2 bg-[#FFF9F0] border border-[#E8D8C8] text-xs font-bold text-[#33241F]"
                    />
                  </div>
                </div>

                {/* Featured & Badges */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                    Badges & Placement
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 text-xs text-[#33241F] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isNewArrival}
                        onChange={(e) => setIsNewArrival(e.target.checked)}
                        className="accent-[#591B2B]"
                      />
                      <span>Mark as "New Arrival"</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-[#33241F] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isBestSeller}
                        onChange={(e) => setIsBestSeller(e.target.checked)}
                        className="accent-[#591B2B]"
                      />
                      <span>Mark as "Bestseller"</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs text-[#33241F] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="accent-[#591B2B]"
                      />
                      <span>Feature on Homepage</span>
                    </label>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                      Material / Finish
                    </label>
                    <input
                      type="text"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      placeholder="e.g. 1-Gram Micro Gold Plated Brass"
                      className="w-full px-3 py-2 bg-[#FFF9F0] border border-[#E8D8C8] text-xs text-[#33241F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                      Weight / Size / Shade
                    </label>
                    <input
                      type="text"
                      value={weightOrShade}
                      onChange={(e) => setWeightOrShade(e.target.value)}
                      placeholder="e.g. Size 2.6 / 24 Grams / Ruby Red"
                      className="w-full px-3 py-2 bg-[#FFF9F0] border border-[#E8D8C8] text-xs text-[#33241F]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#33241F] mb-1.5">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FFF9F0] border border-[#E8D8C8] text-xs text-[#33241F] focus:outline-none focus:border-[#D3AA57] leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessingImage}
                  className="w-full py-4 bg-gradient-to-r from-[#ECC880] via-[#D3AA57] to-[#B88E3E] text-[#1A0B10] font-black uppercase tracking-widest text-xs shadow-lg hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus size={18} />
                  <span>Publish Product to Store (கடைக்கு அனுப்பு)</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            TAB 2: MANAGE INVENTORY
        ========================================================================= */}
        {activeTab === 'manage' && (
          <div className="space-y-6">
            {/* Search and Filters Bar */}
            <div className="bg-white border border-[#E8D8C8] p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="relative w-full md:w-80">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E7A70]"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, ID, or subcategory..."
                  className="w-full pl-9 pr-4 py-2 bg-[#FFF9F0] border border-[#E8D8C8] text-xs text-[#33241F] focus:outline-none focus:border-[#D3AA57]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    filterCategory === 'all'
                      ? 'bg-[#591B2B] text-white'
                      : 'bg-[#FFF9F0] text-[#33241F] hover:bg-[#E8D8C8]'
                  }`}
                >
                  All ({products.length})
                </button>
                {CATEGORIES.map((c) => {
                  const count = products.filter((p) => p.category === c.id).length;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setFilterCategory(c.id)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                        filterCategory === c.id
                          ? 'bg-[#591B2B] text-white'
                          : 'bg-[#FFF9F0] text-[#33241F] hover:bg-[#E8D8C8]'
                      }`}
                    >
                      {c.label.split(' ')[0]} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-[#E8D8C8] shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAF2E6] border-b border-[#E8D8C8] text-[10px] font-bold uppercase tracking-widest text-[#591B2B]">
                    <th className="py-3 px-4">Photo</th>
                    <th className="py-3 px-4">Product Name & ID</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price (₹)</th>
                    <th className="py-3 px-4">Stock Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8D8C8] text-xs">
                  {managedProducts.length > 0 ? (
                    managedProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FFF9F0]/80 transition-colors">
                        {/* Thumbnail */}
                        <td className="py-3 px-4">
                          <div className="relative w-12 h-12 border border-[#E8D8C8] bg-[#FAF2E6] overflow-hidden shrink-0">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              unoptimized={p.image.startsWith('data:')}
                              className="object-cover"
                            />
                          </div>
                        </td>

                        {/* Name and ID */}
                        <td className="py-3 px-4 max-w-xs">
                          <p className="font-bold text-[#33241F] truncate">{p.name}</p>
                          <p className="text-[10px] text-[#8E7A70] font-mono">{p.id}</p>
                          {p.isNewArrival && (
                            <span className="inline-block mt-0.5 px-1.5 py-0.2 bg-[#591B2B] text-white text-[9px] font-bold uppercase tracking-wider mr-1">
                              New
                            </span>
                          )}
                          {p.isBestSeller && (
                            <span className="inline-block mt-0.5 px-1.5 py-0.2 bg-[#D3AA57] text-[#1A0B10] text-[9px] font-bold uppercase tracking-wider">
                              Bestseller
                            </span>
                          )}
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4">
                          <p className="font-medium text-[#591B2B]">{p.categoryLabel}</p>
                          <p className="text-[11px] text-[#8E7A70]">{p.subcategory}</p>
                        </td>

                        {/* Price & Quick Edit */}
                        <td className="py-3 px-4">
                          {editingPriceId === p.id ? (
                            <div className="flex items-center gap-1">
                              <span className="text-[#591B2B] font-bold">₹</span>
                              <input
                                type="number"
                                autoFocus
                                value={tempPrice}
                                onChange={(e) => setTempPrice(e.target.value)}
                                className="w-20 px-2 py-1 bg-white border border-[#D3AA57] text-xs font-bold"
                              />
                              <button
                                onClick={() => handleSavePrice(p.id)}
                                className="px-2 py-1 bg-[#591B2B] text-white text-[10px] font-bold"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingPriceId(null)}
                                className="px-2 py-1 text-[#8E7A70] text-[10px]"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-[#33241F]">
                                {formatPrice(p.price)}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingPriceId(p.id);
                                  setTempPrice(p.price.toString());
                                }}
                                className="text-[10px] text-[#D3AA57] hover:text-[#591B2B] underline font-medium"
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Stock toggle */}
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleStock(p)}
                            className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full transition-colors ${
                              p.availability
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                          >
                            {p.availability ? '● In Stock' : '✕ Out of Stock'}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/product/${p.slug}`}
                              target="_blank"
                              className="p-1.5 text-[#8E7A70] hover:text-[#591B2B] hover:bg-[#FAF2E6] rounded"
                              title="View on Website"
                            >
                              <Eye size={16} />
                            </Link>

                            <button
                              onClick={() => handleDelete(p.id, p.name)}
                              className="p-1.5 text-rose-600 hover:text-rose-900 hover:bg-rose-50 rounded"
                              title="Delete from Store"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-[#8E7A70]">
                        No products match your search or filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: SETTINGS & BACKUP
        ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white border border-[#E8D8C8] p-6 sm:p-8 shadow-sm space-y-8">
            <div>
              <h2 className="text-base font-bold text-[#591B2B] uppercase tracking-wider mb-2">
                Catalog Backup & Data Management
              </h2>
              <p className="text-xs text-[#8E7A70] leading-relaxed">
                Save your custom added products and modified prices as a JSON backup file, or reset the store catalog to the initial 50 showroom items.
              </p>
            </div>

            {/* Export Section */}
            <div className="p-5 bg-[#FAF2E6] border border-[#E8D8C8] space-y-3">
              <div className="flex items-center gap-3">
                <Download className="text-[#591B2B]" size={22} />
                <div>
                  <h3 className="text-sm font-bold text-[#33241F]">
                    Export Store Catalog (JSON Backup)
                  </h3>
                  <p className="text-xs text-[#8E7A70]">
                    Download all {products.length} current products including your photos, prices, and stock data.
                  </p>
                </div>
              </div>
              <button
                onClick={handleExportJSON}
                className="px-5 py-2.5 bg-[#591B2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#762C43] transition-colors flex items-center gap-2"
              >
                <Download size={14} />
                <span>Download Catalog JSON</span>
              </button>
            </div>

            {/* Reset Section */}
            <div className="p-5 bg-rose-50 border border-rose-200 space-y-3">
              <div className="flex items-center gap-3">
                <RefreshCw className="text-rose-700" size={22} />
                <div>
                  <h3 className="text-sm font-bold text-rose-900">
                    Reset Catalog to Factory Defaults
                  </h3>
                  <p className="text-xs text-rose-700">
                    Removes all custom added products and restores the original 50 base products.
                  </p>
                </div>
              </div>
              <button
                onClick={handleResetCatalog}
                className="px-5 py-2.5 bg-rose-700 text-white text-xs font-bold uppercase tracking-wider hover:bg-rose-800 transition-colors"
              >
                Reset Store to Default 50 Products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

