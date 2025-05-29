'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ProductImage } from '@/types/product';

const ProductGallery = ({
  images,
}: {
  images: ProductImage[];
}): React.JSX.Element => {
  const [selectedImage, setSelectedImage] = useState(Number(images[1].seq));
  const [previewImageUrl, setPreviewUrl] = useState(images[1].productImagePath);
  const productImages = images.filter(i => i.productImageOrder != 1);

  const handleImageChange = (imageSeq: number): void => {
    setSelectedImage(imageSeq);
    const findImage = images.find(image => Number(image.seq) === imageSeq);
    setPreviewUrl(findImage?.productImagePath ?? '');
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
        <Image
          src={
            previewImageUrl
              ? `${process.env.NEXT_PUBLIC_API_URL}${previewImageUrl}`
              : '/placeholder.svg'
          }
          alt="Product image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={selectedImage === 2}
        />
      </div>

      <div className="flex space-x-2 overflow-x-auto ps-2 pt-2 pb-2">
        {productImages.map(image => (
          <button
            key={image.seq}
            className={cn(
              'relative h-20 w-20 cursor-pointer overflow-hidden rounded-md border bg-muted',
              selectedImage === Number(image.seq) && 'ring-2 ring-primary',
            )}
            onClick={() => handleImageChange(Number(image.seq))}
            aria-label={`View product image ${image.seq}`}
          >
            {image.seq}
            <Image
              src={
                `${process.env.NEXT_PUBLIC_API_URL}${image.productImagePath}` ||
                '/placeholder.svg'
              }
              alt={`Product thumbnail ${image.seq}`}
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
