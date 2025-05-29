'use client';

import type React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { MainPageProduct } from '@/types/product';

const ProductCard = ({
  product,
}: {
  product: MainPageProduct;
}): React.JSX.Element => {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-2">
      <Link href={`/products/${product.seq}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.productName}</span>
      </Link>

      <div className="relative aspect-square overflow-hidden rounded-md">
        <Image
          src={
            product.productImagePath
              ? `${process.env.NEXT_PUBLIC_API_URL}${product.productImagePath}`
              : '/placeholder.svg'
          }
          alt={product.productName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium">{product.productName}</h3>
        <p className="text-sm text-muted-foreground">{product.categoryName}</p>

        <div className="mt-2 space-y-1">
          <Badge variant="outline" className="text-xs font-normal">
            {product.processor}
          </Badge>
          <Badge variant="outline" className="text-xs font-normal">
            {product.memory}
          </Badge>
          <Badge variant="outline" className="text-xs font-normal">
            {product.graphics}
          </Badge>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-semibold">{product.price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
