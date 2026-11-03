import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import type { Product } from '@/types';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'custom-products.json');

function getCustomProducts(): Product[] {
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

function saveCustomProducts(products: Product[]): boolean {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Failed to write custom-products.json (e.g. read-only env):', err);
    return false;
  }
}

export async function GET() {
  const products = getCustomProducts();
  return NextResponse.json({ success: true, products });
}

export async function POST(req: Request) {
  try {
    const newProduct: Product = await req.json();
    const current = getCustomProducts();

    // Check if product already exists
    const existingIndex = current.findIndex((p) => p.id === newProduct.id);
    let updated: Product[];
    if (existingIndex !== -1) {
      updated = [...current];
      updated[existingIndex] = newProduct;
    } else {
      updated = [newProduct, ...current];
    }

    saveCustomProducts(updated);
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

    const current = getCustomProducts();
    const updated = current.filter((p) => p.id !== id);
    saveCustomProducts(updated);

    return NextResponse.json({ success: true, products: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
