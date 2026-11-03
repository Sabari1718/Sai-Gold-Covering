// ============================================================
// SAI GOLD COVERING – Types for 50 Products & Architecture
// ============================================================

export type ProductCategory =
  | 'chains'
  | 'bangles'
  | 'necklaces'
  | 'cosmetics'
  | 'fancy-items';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  categoryLabel: string;
  description: string;
  shortDescription: string;
  price: number;            // INR
  originalPrice?: number;
  image: string;            // Primary local asset path
  gallery: string[];        // Array of local asset paths
  availability: boolean;
  stock: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller?: boolean;
  tags: string[];
  material?: string;
  weight?: string;
  shade?: string;
  isDemo: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface CategoryCardInfo {
  slug: ProductCategory | string;
  label: string;
  description: string;
  image: string;
  href: string;
}

export type SortOption =
  | 'newest'
  | 'popular'
  | 'price-asc'
  | 'price-desc';

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  userCity?: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  isVerifiedBuyer: boolean;
}
