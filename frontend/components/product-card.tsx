'use client';

import type React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

type Product = {
  seq: number;
  name: string;
  description: string;
  price: number;
  image: string;
  specs?: {
    processor?: string;
    memory?: string;
    storage?: string;
    display?: string;
    graphics?: string;
  };
};

const ProductCard = ({ product }: { product: Product }): React.JSX.Element => {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-2">
      <Link href={`/products/${product.seq}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.name}</span>
      </Link>

      <div className="relative aspect-square overflow-hidden rounded-md">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>

        {product.specs && (
          <div className="mt-2 space-y-1">
            {product.specs.processor && (
              <Badge variant="outline" className="text-xs font-normal">
                {product.specs.processor}
              </Badge>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <p className="font-semibold">{product.price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
