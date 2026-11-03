import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, products } from '@/data/products';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductCard from '@/components/common/ProductCard';
import SectionHeader from '@/components/common/SectionHeader';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.name} | Sai Gold Covering`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);

  return (
    <div className="bg-[#FFF9F0] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#8E7A70] mb-8 uppercase tracking-wider overflow-x-auto pb-1">
          <Link href="/" className="hover:text-[#591B2B]">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#591B2B]">
            Shop
          </Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-[#591B2B]">
            {product.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-[#591B2B] font-bold truncate">{product.name}</span>
        </nav>

        {/* Gallery Left + Info Right Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-20 items-start">
          <ProductGallery images={product.gallery} name={product.name} />
          <ProductInfo product={product} />
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="border-t border-[#E8D8C8] pt-16">
            <SectionHeader
              label="Pair It With"
              title="Related Designs"
              subtitle={`More exquisite picks from our ${product.categoryLabel} collection.`}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
