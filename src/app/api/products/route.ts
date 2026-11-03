import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { Product } from '@/types';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'custom-products.json');
const CLOUD_STORAGE_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a1a10f14761cb6';

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
    // In serverless environments, file writing might be read-only
    return false;
  }
}

async function fetchCloudProducts(): Promise<Product[] | null> {
  try {
    const res = await fetch(CLOUD_STORAGE_URL, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && Array.isArray(json.data.products)) {
        return json.data.products;
      }
    }
  } catch (err) {
    console.error('Failed to fetch from cloud storage:', err);
  }
  return null;
}

async function saveCloudProducts(products: Product[]): Promise<boolean> {
  try {
    const res = await fetch(CLOUD_STORAGE_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sai Gold Covering Products',
        data: { products },
      }),
      cache: 'no-store',
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to save to cloud storage:', err);
    return false;
  }
}

export async function GET() {
  const cloud = await fetchCloudProducts();
  const local = getLocalCustomProducts();

  let finalProducts = local;
  if (cloud && Array.isArray(cloud) && cloud.length > 0) {
    finalProducts = cloud;
    saveLocalCustomProducts(cloud);
  } else if (local.length > 0) {
    finalProducts = local;
    saveCloudProducts(local).catch(() => {});
  }

  return NextResponse.json({ success: true, products: finalProducts });
}

export async function POST(req: Request) {
  try {
    const newProduct: Product = await req.json();

    // Fetch latest cloud state
    const cloud = await fetchCloudProducts();
    const current = cloud && Array.isArray(cloud) ? cloud : getLocalCustomProducts();

    const existingIndex = current.findIndex((p) => p.id === newProduct.id);
    let updated: Product[];
    if (existingIndex !== -1) {
      updated = [...current];
      updated[existingIndex] = newProduct;
    } else {
      updated = [newProduct, ...current];
    }

    // Persist to both local and global cloud
    saveLocalCustomProducts(updated);
    await saveCloudProducts(updated);

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

    const cloud = await fetchCloudProducts();
    const current = cloud && Array.isArray(cloud) ? cloud : getLocalCustomProducts();

    const updated = current.filter((p) => p.id !== id);
    saveLocalCustomProducts(updated);
    await saveCloudProducts(updated);

    return NextResponse.json({ success: true, products: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
