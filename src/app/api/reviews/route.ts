import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { ProductReview } from '@/types';

const reviewsFilePath = path.join(process.cwd(), 'src', 'data', 'user-reviews.json');
const CLOUD_REVIEWS_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a1a10f75d41cb8';

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

async function fetchCloudReviews(): Promise<ProductReview[] | null> {
  try {
    const res = await fetch(CLOUD_REVIEWS_URL, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && Array.isArray(json.data.reviews)) {
        return json.data.reviews;
      }
    }
  } catch (err) {
    console.error('Failed to fetch reviews from cloud:', err);
  }
  return null;
}

async function saveCloudReviews(reviews: ProductReview[]): Promise<boolean> {
  try {
    const res = await fetch(CLOUD_REVIEWS_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sai Gold Covering Customer Reviews',
        data: { reviews },
      }),
      cache: 'no-store',
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to save reviews to cloud:', err);
    return false;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');

  const cloud = await fetchCloudReviews();
  const local = getLocalReviews();

  let all = local;
  if (cloud && Array.isArray(cloud) && cloud.length > 0) {
    all = cloud;
    saveLocalReviews(cloud);
  } else if (local.length > 0) {
    all = local;
    saveCloudReviews(local).catch(() => {});
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

    const cloud = await fetchCloudReviews();
    const current = cloud && Array.isArray(cloud) ? cloud : getLocalReviews();

    const updated = [newReview, ...current.filter((r) => r.id !== newReview.id)];
    saveLocalReviews(updated);
    await saveCloudReviews(updated);

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

    const cloud = await fetchCloudReviews();
    const current = cloud && Array.isArray(cloud) ? cloud : getLocalReviews();

    const updated = current.filter((r) => r.id !== id);
    saveLocalReviews(updated);
    await saveCloudReviews(updated);

    return NextResponse.json({ success: true, reviews: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
