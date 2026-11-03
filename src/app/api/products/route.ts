import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import type { Product } from '@/types';

const BLOB_PRODUCTS_URL = 'https://abuh2iz2z5rdsybi.public.blob.vercel-storage.com/custom-products.json';
const dataFilePath = path.join(process.cwd(), 'src', 'data', 'custom-products.json');

function getLocalCustomProducts(): Product[] {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error('Failed to read custom-products.json:', err);
  }
  return [];
}

function saveLocalCustomProducts(products: Product[]): boolean {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
    return true;
  } catch (err) {
    return false;
  }
}

async function fetchBlobProducts(): Promise<Product[] | null> {
  try {
    const res = await fetch(`${BLOB_PRODUCTS_URL}?t=${Date.now()}`, {
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
    console.error('Failed to fetch from blob storage:', err);
  }
  return null;
}

async function saveBlobProducts(products: Product[]): Promise<boolean> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      console.warn('BLOB_READ_WRITE_TOKEN is not set');
      return false;
    }
    await put('custom-products.json', JSON.stringify(products), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
      cacheControlMaxAge: 0,
    });
    return true;
  } catch (err) {
    console.error('Failed to save to blob storage:', err);
    return false;
  }
}

export async function GET() {
  const blob = await fetchBlobProducts();
  const local = getLocalCustomProducts();

  let finalProducts = local;
  if (blob && Array.isArray(blob)) {
    finalProducts = blob;
    saveLocalCustomProducts(blob);
  } else if (local.length > 0) {
    finalProducts = local;
    saveBlobProducts(local).catch(() => {});
  }

  return NextResponse.json({ success: true, products: finalProducts });
}

export async function POST(req: Request) {
  try {
    const newProduct: Product = await req.json();

    const blob = await fetchBlobProducts();
    const current = blob && Array.isArray(blob) ? blob : getLocalCustomProducts();

    const existingIndex = current.findIndex((p) => p.id === newProduct.id);
    let updated: Product[];
    if (existingIndex !== -1) {
      updated = [...current];
      updated[existingIndex] = newProduct;
    } else {
      updated = [newProduct, ...current];
    }

    saveLocalCustomProducts(updated);
    await saveBlobProducts(updated);

    return NextResponse.json({ success: true, product: newProduct, products: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }

    const blob = await fetchBlobProducts();
    const current = blob && Array.isArray(blob) ? blob : getLocalCustomProducts();

    const updated = current.filter((p) => p.id !== id);
    saveLocalCustomProducts(updated);
    await saveBlobProducts(updated);

    return NextResponse.json({ success: true, products: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
