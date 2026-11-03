'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeImage = images[selectedIndex] || images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FFF9F0] border border-[#E8D8C8] shadow-sm">
        <Image
          src={activeImage}
          alt={name}
          fill
          priority
          unoptimized={activeImage.startsWith('data:')}
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 flex-shrink-0 border overflow-hidden transition-all bg-[#FFF9F0] ${
                selectedIndex === idx
                  ? 'border-[#D3AA57] ring-2 ring-[#D3AA57]'
                  : 'border-[#E8D8C8] opacity-75 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                unoptimized={img.startsWith('data:')}
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
