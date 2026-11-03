import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { ProductReview } from '@/types';

const reviewsFilePath = path.join(process.cwd(), 'src', 'data', 'user-reviews.json');

function getAllReviews(): ProductReview[] {
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

function saveReviews(reviews: ProductReview[]): boolean {
  try {
    fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Failed to write user-reviews.json:', err);
    return false;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');

  const all = getAllReviews();
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

    const current = getAllReviews();
    const updated = [newReview, ...current];
    saveReviews(updated);

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

    const current = getAllReviews();
    const updated = current.filter((r) => r.id !== id);
    saveReviews(updated);

    return NextResponse.json({ success: true, reviews: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

