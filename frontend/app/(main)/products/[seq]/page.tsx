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
import { use, useEffect, useState } from 'react';
import { fetchProductDetail } from '@/lib/api/product';
import { FetchProductResponse } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const { seq } = use(params);
  const product = products.find(p => p.seq === 1);
  const [isLoading, setIsLoading] = useState(true);
  const [productDetail, setProductDetail] = useState<FetchProductResponse>({
    seq: 0,
    categorySeq: 0,
    categoryName: '',
    productName: '',
    price: 0,
    status: '',
    quantity: 0,
    processor: '',
    memory: '',
    storage: '',
    graphics: '',
    display: '',
    battery: '',
    weight: '',
    os: '',
    productImages: [],
  });

  useEffect(() => {
    const getProductDetail = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const data = await fetchProductDetail(Number(seq));
        setProductDetail(data.result);
      } catch (e) {
        toast({
          title: '상품 상세보기 조회 실패',
          description: '상품 상세보기 조회 실패 했습니다.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    getProductDetail();
  }, [seq]);

  if (!product) {
    router.push('/products');
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="text-gray-500 text-lg font-medium">
          상품 정보 불러오는 중...
        </span>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <ProductGallery images={productDetail.productImages} />

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">
              {productDetail.price.toLocaleString()}원
            </p>
          </div>

          <div className="prose max-w-none">
            <p>{productDetail.categoryName}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">노트북 스펙</h3>
            <div className="grid gap-3">
              <div className="flex items-start gap-2">
                <Cpu className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">CPU</p>
                  <p className="text-sm text-muted-foreground">
                    {productDetail.processor}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Memory className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">메모리</p>
                  <p className="text-sm text-muted-foreground">
                    {productDetail.memory}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <HardDrive className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">저장장치</p>
                  <p className="text-sm text-muted-foreground">
                    {productDetail.storage}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Monitor className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">화면</p>
                  <p className="text-sm text-muted-foreground">
                    {productDetail.display}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Gpu className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium">그래픽</p>
                  <p className="text-sm text-muted-foreground">
                    {productDetail.graphics}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <AddToCartButton productDetail={productDetail} />
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
                    {productDetail.os}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">CPU</h3>
                  <p className="text-sm text-muted-foreground">
                    {productDetail.processor}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">메모리</h3>
                  <p className="text-sm text-muted-foreground">
                    {productDetail.memory}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">저장장치</h3>
                  <p className="text-sm text-muted-foreground">
                    {productDetail.storage}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">그래픽</h3>
                  <p className="text-sm text-muted-foreground">
                    {productDetail.graphics}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">화면</h3>
                  <p className="text-sm text-muted-foreground">
                    {productDetail.display}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">배터리</h3>
                  <p className="text-sm text-muted-foreground">
                    {productDetail.battery}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">무게</h3>
                  <p className="text-sm text-muted-foreground">
                    {productDetail.weight}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <h2 className="text-2xl font-bold mb-6">상품 리뷰</h2>
            <ProductReviews productSeq={productDetail.seq} />
          </TabsContent>

          <TabsContent value="inquiries">
            <h2 className="text-2xl font-bold mb-6">상품 문의</h2>
            <ProductInquiries productSeq={productDetail.seq} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductPage;
