import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import type { ProductReview } from '@/types';

const BLOB_REVIEWS_URL = 'https://abuh2iz2z5rdsybi.public.blob.vercel-storage.com/user-reviews.json';
const reviewsFilePath = path.join(process.cwd(), 'src', 'data', 'user-reviews.json');

function getLocalReviews(): ProductReview[] {
  try {
    if (fs.existsSync(reviewsFilePath)) {
      const data = fs.readFileSync(reviewsFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to read user-reviews.json:', err);
  }
  return [];
}

function saveLocalReviews(reviews: ProductReview[]): boolean {
  try {
    fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2), 'utf8');
    return true;
  } catch (err) {
    return false;
  }
}

async function fetchBlobReviews(): Promise<ProductReview[] | null> {
  try {
    const res = await fetch(`${BLOB_REVIEWS_URL}?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data;
      }
    }
  } catch (err) {
    console.error('Failed to fetch reviews from blob:', err);
  }
  return null;
}

async function saveBlobReviews(reviews: ProductReview[]): Promise<boolean> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) return false;
    await put('user-reviews.json', JSON.stringify(reviews), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
      cacheControlMaxAge: 0,
    });
    return true;
  } catch (err) {
    console.error('Failed to save reviews to blob:', err);
    return false;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');

  const blob = await fetchBlobReviews();
  const local = getLocalReviews();

  let all = local;
  if (blob && Array.isArray(blob)) {
    all = blob;
    saveLocalReviews(blob);
  } else if (local.length > 0) {
    all = local;
    saveBlobReviews(local).catch(() => {});
  }

  if (productId) {
    const filtered = all.filter((r) => r.productId === productId);
    return NextResponse.json({ success: true, reviews: filtered });
  }

  return NextResponse.json({ success: true, reviews: all });
}

export async function POST(req: Request) {
  try {
    const newReview: ProductReview = await req.json();
    if (!newReview.productId || !newReview.rating || !newReview.userName || !newReview.comment) {
      return NextResponse.json({ success: false, error: 'Missing required review fields' }, { status: 400 });
    }

    const blob = await fetchBlobReviews();
    const current = blob && Array.isArray(blob) ? blob : getLocalReviews();

    const updated = [newReview, ...current.filter((r) => r.id !== newReview.id)];
    saveLocalReviews(updated);
    await saveBlobReviews(updated);

    return NextResponse.json({ success: true, review: newReview, reviews: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Review ID is required' }, { status: 400 });
    }

    const blob = await fetchBlobReviews();
    const current = blob && Array.isArray(blob) ? blob : getLocalReviews();

    const updated = current.filter((r) => r.id !== id);
    saveLocalReviews(updated);
    await saveBlobReviews(updated);

    return NextResponse.json({ success: true, reviews: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
