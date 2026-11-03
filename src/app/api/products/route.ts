import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import type { Product } from '@/types';

const BLOB_PRODUCTS_URL = 'https://abuh2iz2z5rdsybi.public.blob.vercel-storage.com/custom-products.json';
const BLOB_DELETED_URL = 'https://abuh2iz2z5rdsybi.public.blob.vercel-storage.com/deleted-ids.json';
const BLOB_MODIFIED_URL = 'https://abuh2iz2z5rdsybi.public.blob.vercel-storage.com/modified-products.json';

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

async function fetchBlobJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(`${url}?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error(`Failed to fetch from blob ${url}:`, err);
  }
  return null;
}

async function saveBlobJSON(filename: string, data: any): Promise<boolean> {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      console.warn('BLOB_READ_WRITE_TOKEN is not set');
      return false;
    }
    await put(filename, JSON.stringify(data), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
      cacheControlMaxAge: 0,
    });
    return true;
  } catch (err) {
    console.error(`Failed to save to blob ${filename}:`, err);
    return false;
  }
}

export async function GET() {
  const [blobProducts, blobDeleted, blobModified] = await Promise.all([
    fetchBlobJSON<Product[]>(BLOB_PRODUCTS_URL),
    fetchBlobJSON<string[]>(BLOB_DELETED_URL),
    fetchBlobJSON<Record<string, Partial<Product>>>(BLOB_MODIFIED_URL),
  ]);

  const local = getLocalCustomProducts();
  const products = blobProducts && Array.isArray(blobProducts) ? blobProducts : local;
  const deletedIds = blobDeleted && Array.isArray(blobDeleted) ? blobDeleted : [];
  const modifiedMap = blobModified && typeof blobModified === 'object' ? blobModified : {};

  return NextResponse.json({
    success: true,
    products,
    deletedIds,
    modifiedMap,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check if this is a partial update action: { id: string, updates: Partial<Product> }
    const isPartialUpdate = body && body.id && body.updates && typeof body.updates === 'object';
    const targetId = isPartialUpdate ? body.id : body.id;
    const updates = isPartialUpdate ? body.updates : body;

    // Fetch existing state
    const [blobProducts, blobDeleted, blobModified] = await Promise.all([
      fetchBlobJSON<Product[]>(BLOB_PRODUCTS_URL),
      fetchBlobJSON<string[]>(BLOB_DELETED_URL),
      fetchBlobJSON<Record<string, Partial<Product>>>(BLOB_MODIFIED_URL),
    ]);

    let currentProducts = blobProducts && Array.isArray(blobProducts) ? [...blobProducts] : getLocalCustomProducts();
    let currentDeleted = blobDeleted && Array.isArray(blobDeleted) ? [...blobDeleted] : [];
    let currentModified = blobModified && typeof blobModified === 'object' ? { ...blobModified } : {};

    // Remove targetId from deleted list if it was deleted previously
    if (targetId && currentDeleted.includes(targetId)) {
      currentDeleted = currentDeleted.filter((x) => x !== targetId);
      await saveBlobJSON('deleted-ids.json', currentDeleted);
    }

    const customIdx = currentProducts.findIndex((p) => p.id === targetId);

    if (customIdx !== -1) {
      // It's a custom product: update in custom products array
      currentProducts[customIdx] = { ...currentProducts[customIdx], ...updates };
      saveLocalCustomProducts(currentProducts);
      await saveBlobJSON('custom-products.json', currentProducts);
    } else if (isPartialUpdate) {
      // It's a base product update (e.g. price change or out-of-stock toggle on base catalog items)
      currentModified[targetId] = { ...(currentModified[targetId] || {}), ...updates };
      await saveBlobJSON('modified-products.json', currentModified);
    } else {
      // It's a completely new custom product being added
      currentProducts = [updates as Product, ...currentProducts.filter((p) => p.id !== targetId)];
      saveLocalCustomProducts(currentProducts);
      await saveBlobJSON('custom-products.json', currentProducts);
    }

    return NextResponse.json({
      success: true,
      products: currentProducts,
      deletedIds: currentDeleted,
      modifiedMap: currentModified,
    });
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

    const [blobProducts, blobDeleted, blobModified] = await Promise.all([
      fetchBlobJSON<Product[]>(BLOB_PRODUCTS_URL),
      fetchBlobJSON<string[]>(BLOB_DELETED_URL),
      fetchBlobJSON<Record<string, Partial<Product>>>(BLOB_MODIFIED_URL),
    ]);

    let currentProducts = blobProducts && Array.isArray(blobProducts) ? [...blobProducts] : getLocalCustomProducts();
    let currentDeleted = blobDeleted && Array.isArray(blobDeleted) ? [...blobDeleted] : [];
    let currentModified = blobModified && typeof blobModified === 'object' ? { ...blobModified } : {};

    // 1. Remove from custom products if present
    currentProducts = currentProducts.filter((p) => p.id !== id);
    saveLocalCustomProducts(currentProducts);
    await saveBlobJSON('custom-products.json', currentProducts);

    // 2. Add to deleted IDs permanently so base products are hidden as well
    if (!currentDeleted.includes(id)) {
      currentDeleted.push(id);
      await saveBlobJSON('deleted-ids.json', currentDeleted);
    }

    // 3. Clean up from modified products if present
    if (currentModified[id]) {
      delete currentModified[id];
      await saveBlobJSON('modified-products.json', currentModified);
    }

    return NextResponse.json({
      success: true,
      products: currentProducts,
      deletedIds: currentDeleted,
      modifiedMap: currentModified,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
