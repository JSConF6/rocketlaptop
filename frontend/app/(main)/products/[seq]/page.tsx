'use client';

import {
  Cpu,
  MemoryStickIcon as Memory,
  HardDrive,
  Monitor,
  CpuIcon as Gpu,
} from 'lucide-react';
import AddToCartButton from '@/components/add-to-cart-button';
import ProductGallery from '@/components/product-gallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductReviews } from '@/components/product-reviews';
import { ProductInquiries } from '@/components/product-inquiries';
import { useRouter } from 'next/navigation';
import { use } from 'react';

// Mock products data
const products = [
  {
    seq: 1,
    name: 'ProBook X5',
    description: '울트라 북',
    price: 900000,
    images: [
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
    ],
    specs: {
      processor: 'Intel Core i7-1165G7 (4 cores, up to 4.7GHz)',
      memory: '16GB DDR4 3200MHz',
      storage: '512GB PCIe NVMe SSD',
      display: '14" 4K UHD (3840 x 2160) IPS Anti-glare',
      graphics: 'Intel Iris Xe Graphics',
      battery: 'Up to 15 hours',
      weight: '1.2 kg',
      ports: '2x Thunderbolt 4, 1x USB-A, HDMI, Headphone jack',
      os: 'Windows 11 Pro',
    },
    category: 'business',
    brand: 'ProTech',
    inStock: true,
  },
  {
    seq: 2,
    name: 'GameForce RTX',
    description:
      'Ultimate gaming experience with desktop-class performance in a portable form factor. Featuring the latest NVIDIA RTX graphics and high-refresh display for competitive gaming.',
    price: 1899.99,
    images: [
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
      '/placeholder.svg?height=600&width=600',
    ],
    specs: {
      processor: 'AMD Ryzen 9 5900HX (8 cores, up to 4.6GHz)',
      memory: '32GB DDR4 3200MHz',
      storage: '1TB NVMe SSD',
      display: '15.6" QHD (2560 x 1440) 165Hz IPS Anti-glare',
      graphics: 'NVIDIA GeForce RTX 3080 16GB GDDR6',
      battery: 'Up to 6 hours',
      weight: '2.3 kg',
      ports: '3x USB-A, 1x USB-C, HDMI, Ethernet, Headphone jack',
      os: 'Windows 11 Home',
    },
    category: 'gaming',
    brand: 'GameForce',
    inStock: true,
  },
];

type Props = {
  params: Promise<{ seq: string }>;
};

const ProductPage = ({ params }: Props): React.JSX.Element | null => {
  const router = useRouter();
  const { seq } = use(params);
  const product = products.find(p => p.seq === Number(seq));

  if (!product) {
    router.push('/products');
    return null;
  }

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <ProductGallery images={product.images} />

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">
              {product.price.toLocaleString()}원
            </p>
          </div>

          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">노트북 스펙</h3>
            <div className="grid gap-3">
              <div className="flex items-start gap-2">
                <Cpu className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">CPU</p>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.processor}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Memory className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">메모리</p>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.memory}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <HardDrive className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">저장장치</p>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.storage}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Monitor className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">화면</p>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.display}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Gpu className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">그래픽</p>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.graphics}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="specifications">노트북 사양</TabsTrigger>
            <TabsTrigger value="reviews">상품 리뷰</TabsTrigger>
            <TabsTrigger value="inquiries">상품 문의</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications">
            <h2 className="text-2xl font-bold mb-6">노트북 사양</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">OS</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.os}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">CPU</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.processor}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">메모리</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.memory}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">저장장치</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.storage}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">그래픽</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.graphics}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">화면</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.display}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">배터리</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.battery}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">무게</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.weight}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">포트</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.specs.ports}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <h2 className="text-2xl font-bold mb-6">상품 리뷰</h2>
            <ProductReviews productSeq={product.seq} />
          </TabsContent>

          <TabsContent value="inquiries">
            <h2 className="text-2xl font-bold mb-6">상품 문의</h2>
            <ProductInquiries productSeq={product.seq} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductPage;
