'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const ProductGallery = ({
  images,
}: {
  images: string[];
}): React.JSX.Element => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
        <Image
          src={images[selectedImage] || '/placeholder.svg'}
          alt="Product image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={selectedImage === 0}
        />
      </div>

      <div className="flex space-x-2 overflow-x-auto ps-2 pt-2 pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              'relative h-20 w-20 cursor-pointer overflow-hidden rounded-md border bg-muted',
              selectedImage === index && 'ring-2 ring-primary',
            )}
            onClick={() => setSelectedImage(index)}
            aria-label={`View product image ${index + 1}`}
          >
            <Image
              src={image || '/placeholder.svg'}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
