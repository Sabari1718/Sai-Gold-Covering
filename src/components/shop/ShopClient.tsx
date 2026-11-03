'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/common/ProductCard';
import { products } from '@/data/products';
import type { ProductCategory, SortOption } from '@/types';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const CATEGORY_LIST: { label: string; value: 'all' | ProductCategory | 'jewellery' }[] = [
  { label: 'All Products', value: 'all' },
  { label: 'Chains', value: 'chains' },
  { label: 'Bangles', value: 'bangles' },
  { label: 'Necklaces', value: 'necklaces' },
  { label: 'Cosmetics', value: 'cosmetics' },
  { label: 'Fancy Items', value: 'fancy-items' },
];

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹300', min: 0, max: 300 },
  { label: '₹300 - ₹700', min: 300, max: 700 },
  { label: '₹700 - ₹1,500', min: 700, max: 1500 },
  { label: 'Above ₹1,500 (Bridal & Harams)', min: 1500, max: Infinity },
];

interface Props {
  initialCategory?: ProductCategory | 'jewellery' | 'all';
}

export default function ShopClient({ initialCategory = 'all' }: Props) {
  const searchParams = useSearchParams();
  const qParam = searchParams.get('q') || '';
  const catParam = (searchParams.get('category') as any) || initialCategory;

  const [search, setSearch] = useState(qParam);
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory | 'jewellery'>(catParam);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state whenever the URL search params change (e.g., clicking navbar links)
  useEffect(() => {
    const currentQ = searchParams.get('q') || '';
    const currentCat = (searchParams.get('category') as any) || initialCategory || 'all';
    setSearch(currentQ);
    setSelectedCategory(currentCat);
    setSelectedSubcategory('all');
  }, [searchParams, initialCategory]);

  // Available Subcategories based on chosen category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === 'all') {
      return Array.from(new Set(products.map((p) => p.subcategory)));
    }
    if (selectedCategory === 'jewellery') {
      return Array.from(
        new Set(
          products
            .filter((p) => p.category === 'chains' || p.category === 'necklaces')
            .map((p) => p.subcategory)
        )
      );
    }
    return Array.from(
      new Set(
        products.filter((p) => p.category === selectedCategory).map((p) => p.subcategory)
      )
    );
  }, [selectedCategory]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    const priceRange = PRICE_RANGES[selectedPriceIndex];

    return products
      .filter((p) => {
        // Search text
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchTag = p.tags.some((t) => t.toLowerCase().includes(q));
          const matchCategory = p.categoryLabel.toLowerCase().includes(q);
          const matchSub = p.subcategory.toLowerCase().includes(q);
          if (!matchName && !matchTag && !matchCategory && !matchSub) return false;
        }

        // Category
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'jewellery') {
            if (p.category !== 'chains' && p.category !== 'necklaces') return false;
          } else if (p.category !== selectedCategory) {
            return false;
          }
        }

        // Subcategory
        if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) {
          return false;
        }

        // Availability filter
        if (onlyAvailable && !p.availability) {
          return false;
        }

        // Price
        if (p.price < priceRange.min || p.price > priceRange.max) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'popular') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      });
  }, [search, selectedCategory, selectedSubcategory, selectedPriceIndex, onlyAvailable, sortBy]);

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedSubcategory !== 'all' ||
    selectedPriceIndex !== 0 ||
    onlyAvailable;

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSelectedPriceIndex(0);
    setOnlyAvailable(false);
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Search & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E8D8C8]">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E7A70]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all 50 chains, bangles, cosmetics..."
            className="w-full bg-white border border-[#E8D8C8] pl-10 pr-9 py-2.5 text-xs text-[#33241F] outline-none focus:border-[#D3AA57]"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort & Mobile Filters */}
        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-[#E8D8C8] text-xs font-bold uppercase tracking-wider text-[#591B2B]"
          >
            <SlidersHorizontal size={14} />
            Filter Products {hasActiveFilters && '•'}
          </button>

          <div className="flex items-center gap-2 text-xs text-[#33241F]">
            <span className="hidden sm:inline uppercase tracking-wider font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white border border-[#E8D8C8] px-3 py-2 text-xs text-[#33241F] outline-none cursor-pointer focus:border-[#D3AA57]"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="popular">Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid with Filter Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar (3 cols) */}
        <aside className="hidden md:block md:col-span-3 space-y-6 bg-white border border-[#E8D8C8] p-6 shadow-sm">
          
          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#591B2B] mb-3 pb-2 border-b border-[#E8D8C8]">
              Product Category
            </h4>
            <div className="space-y-1.5">
              {CATEGORY_LIST.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setSelectedCategory(cat.value);
                    setSelectedSubcategory('all');
                  }}
                  className={`block w-full text-left text-xs py-1.5 px-2 transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-[#FFF9F0] font-bold text-[#591B2B] border-l-2 border-[#D3AA57]'
                      : 'text-[#33241F]/80 hover:text-[#591B2B]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#591B2B] mb-3 pb-2 border-b border-[#E8D8C8]">
              Subcategory
            </h4>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`block w-full text-left text-xs py-1 px-2 ${
                  selectedSubcategory === 'all'
                    ? 'font-bold text-[#591B2B]'
                    : 'text-[#8E7A70] hover:text-[#33241F]'
                }`}
              >
                • All Subcategories
              </button>
              {availableSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`block w-full text-left text-xs py-1 px-2 ${
                    selectedSubcategory === sub
                      ? 'font-bold text-[#591B2B] bg-[#FFF9F0]'
                      : 'text-[#8E7A70] hover:text-[#33241F]'
                  }`}
                >
                  • {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#591B2B] mb-3 pb-2 border-b border-[#E8D8C8]">
              Price Filter
            </h4>
            <div className="space-y-1.5">
              {PRICE_RANGES.map((tier, idx) => (
                <button
                  key={tier.label}
                  onClick={() => setSelectedPriceIndex(idx)}
                  className={`block w-full text-left text-xs py-1 px-2 ${
                    selectedPriceIndex === idx
                      ? 'font-bold text-[#591B2B] bg-[#FFF9F0]'
                      : 'text-[#8E7A70] hover:text-[#33241F]'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Checkbox */}
          <div className="pt-2 border-t border-[#E8D8C8]">
            <label className="flex items-center gap-2 text-xs font-medium text-[#33241F] cursor-pointer">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="rounded accent-[#591B2B]"
              />
              <span>In-Stock Items Only</span>
            </label>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="w-full py-2 bg-[#FFF9F0] border border-[#591B2B] text-[#591B2B] text-[10px] font-bold uppercase tracking-wider hover:bg-[#591B2B] hover:text-white transition-colors"
            >
              Reset Filters
            </button>
          )}
        </aside>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="md:hidden col-span-12 bg-white border border-[#E8D8C8] p-5 space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#591B2B] mb-2">Category</p>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORY_LIST.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setSelectedCategory(cat.value);
                      setSelectedSubcategory('all');
                    }}
                    className={`px-3 py-1 text-xs border ${
                      selectedCategory === cat.value
                        ? 'bg-[#591B2B] text-white border-[#591B2B]'
                        : 'bg-[#FFF9F0] text-[#33241F] border-[#E8D8C8]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#591B2B] mb-2">Price Range</p>
              <div className="flex flex-wrap gap-1.5">
                {PRICE_RANGES.map((tier, idx) => (
                  <button
                    key={tier.label}
                    onClick={() => setSelectedPriceIndex(idx)}
                    className={`px-3 py-1 text-xs border ${
                      selectedPriceIndex === idx
                        ? 'bg-[#D3AA57] text-[#33241F] border-[#D3AA57]'
                        : 'bg-[#FFF9F0] text-[#33241F] border-[#E8D8C8]'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-xs text-red-600 underline">
                Reset all filters
              </button>
            )}
          </div>
        )}

        {/* Products Grid: 4 cols desktop, 3 cols tablet, 2 cols mobile (9 cols area) */}
        <main className="col-span-12 md:col-span-9">
          <div className="flex items-center justify-between mb-6 text-xs text-[#8E7A70]">
            <span>
              Showing <strong className="text-[#33241F]">{filteredProducts.length}</strong> products
            </span>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-[#D3AA57] font-bold hover:underline">
                Reset
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E8D8C8] text-center py-20 px-4">
              <p className="text-base font-bold text-[#591B2B] mb-2 font-serif">
                No Products Match Your Filter
              </p>
              <p className="text-xs text-[#8E7A70] mb-6">
                Please adjust your search terms or price filter.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-[#591B2B] text-white text-xs font-bold uppercase tracking-wider"
              >
                Show All 50 Products
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
