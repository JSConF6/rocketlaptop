'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// 샘플 상품 데이터 (실제로는 API에서 가져올 것)
const getProductData = (id: string) => {
  const productId = Number.parseInt(id);
  return {
    id: productId,
    name: `노트북 모델 ${String.fromCharCode(65 + (productId % 26))}${productId}`,
    category: ['게이밍', '사무용', '그래픽작업용', '학생용', '2-in-1'][
      productId % 5
    ],
    price: Math.floor(800000 + Math.random() * 2000000),
    salePrice:
      productId % 3 === 0 ? Math.floor(700000 + Math.random() * 1800000) : '',
    stock: Math.floor(Math.random() * 50),
    description: `이 노트북은 최신 프로세서와 그래픽 카드를 탑재하여 뛰어난 성능을 제공합니다. 
    슬림한 디자인과 긴 배터리 수명으로 언제 어디서나 사용할 수 있습니다.
    고해상도 디스플레이와 프리미엄 스피커로 몰입감 있는 멀티미디어 경험을 제공합니다.`,
    specifications: `CPU: Intel Core i7-12700H
RAM: 16GB DDR4
SSD: 512GB NVMe
Display: 15.6인치 FHD (1920x1080) IPS
Graphics: NVIDIA GeForce RTX 3060 6GB
OS: Windows 11 Home
Weight: 2.3kg
Battery: 80Wh`,
    status: ['판매중', '품절', '판매중지', '입고예정'][productId % 4],
    featured: productId % 5 === 0,
    images: Array.from(
      { length: (productId % 4) + 1 },
      (_, i) => `/placeholder.svg?height=200&width=200&text=Image${i + 1}`,
    ),
  };
};

const EditProductPage = ({
  params,
}: {
  params: { id: string };
}): React.JSX.Element => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    salePrice: '',
    stock: '',
    description: '',
    specifications: '',
    status: '',
    featured: false,
  });

  // 상품 데이터 로드
  useEffect(() => {
    // 실제 구현에서는 API 호출
    const productData = getProductData(params.id);
    setProduct(productData);
    setFormData({
      name: productData.name,
      category: productData.category,
      price: productData.price.toString(),
      salePrice: productData.salePrice.toString(),
      stock: productData.stock.toString(),
      description: productData.description,
      specifications: productData.specifications,
      status: productData.status,
      featured: productData.featured,
    });
    setImages(productData.images);
    setIsLoading(false);
  }, [params.id]);

  // 폼 입력 처리
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 셀렉트 입력 처리
  const handleSelectChange = (name: string, value: string): void => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 스위치 입력 처리
  const handleSwitchChange = (name: string, checked: boolean): void => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // 이미지 추가 처리
  const handleAddImage = (): void => {
    // 실제 구현에서는 파일 업로드 처리
    const newImage = `/placeholder.svg?height=200&width=200&text=Image${images.length + 1}`;
    setImages(prev => [...prev, newImage]);
  };

  // 이미지 제거 처리
  const handleRemoveImage = (index: number): void => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    // 필수 필드 검증
    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.stock
    ) {
      toast({
        title: '입력 오류',
        description: '필수 항목을 모두 입력해주세요.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    // 실제 구현에서는 API 호출
    setTimeout(() => {
      toast({
        title: '상품이 수정되었습니다',
        description: `${formData.name} 상품이 성공적으로 수정되었습니다.`,
      });
      setIsSubmitting(false);
      router.push('/seller/products');
    }, 1000);
  };

  // 상품 삭제 처리
  const handleDelete = async () => {
    if (!window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      return;
    }

    setIsSubmitting(true);

    // 실제 구현에서는 API 호출
    setTimeout(() => {
      toast({
        title: '상품이 삭제되었습니다',
        description: `${product.name} 상품이 성공적으로 삭제되었습니다.`,
      });
      setIsSubmitting(false);
      router.push('/seller/products');
    }, 1000);
  };

  if (isLoading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">상품 수정</h1>
        </div>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isSubmitting}
        >
          상품 삭제
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">기본 정보</TabsTrigger>
            <TabsTrigger value="details">상세 정보</TabsTrigger>
            <TabsTrigger value="images">이미지</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
                <CardDescription>
                  상품의 기본 정보를 수정하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      상품명 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="상품명을 입력하세요"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      카테고리 <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={value =>
                        handleSelectChange('category', value)
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="게이밍">게이밍</SelectItem>
                        <SelectItem value="사무용">사무용</SelectItem>
                        <SelectItem value="그래픽작업용">
                          그래픽작업용
                        </SelectItem>
                        <SelectItem value="학생용">학생용</SelectItem>
                        <SelectItem value="2-in-1">2-in-1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      판매가 <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">
                        ₩
                      </span>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="0"
                        className="pl-7"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salePrice">할인가</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">
                        ₩
                      </span>
                      <Input
                        id="salePrice"
                        name="salePrice"
                        type="number"
                        placeholder="0"
                        className="pl-7"
                        value={formData.salePrice}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stock">
                      재고 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      placeholder="0"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">상태</Label>
                    <Select
                      value={formData.status}
                      onValueChange={value =>
                        handleSelectChange('status', value)
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="상태 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="판매중">판매중</SelectItem>
                        <SelectItem value="품절">품절</SelectItem>
                        <SelectItem value="판매중지">판매중지</SelectItem>
                        <SelectItem value="입고예정">입고예정</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={checked =>
                      handleSwitchChange('featured', checked)
                    }
                  />
                  <Label htmlFor="featured">메인 페이지에 표시</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>상세 정보</CardTitle>
                <CardDescription>
                  상품의 상세 정보를 수정하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">상품 설명</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="상품에 대한 상세 설명을 입력하세요"
                    className="min-h-[150px]"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specifications">상품 스펙</Label>
                  <Textarea
                    id="specifications"
                    name="specifications"
                    placeholder="CPU: Intel Core i7-12700H&#10;RAM: 16GB&#10;SSD: 512GB&#10;Display: 15.6인치 FHD"
                    className="min-h-[150px] font-mono text-sm"
                    value={formData.specifications}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-gray-500">
                    각 스펙을 새 줄에 입력하세요.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>상품 이미지</CardTitle>
                <CardDescription>
                  상품 이미지를 수정하세요. 첫 번째 이미지가 대표 이미지로
                  사용됩니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative rounded-md overflow-hidden border aspect-square"
                    >
                      <img
                        src={image || '/placeholder.svg'}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="border border-dashed rounded-md flex flex-col items-center justify-center p-4 hover:bg-gray-50 aspect-square"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">이미지 추가</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  이미지는 최대 10개까지 추가할 수 있으며, 권장 크기는
                  1000x1000px입니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            취소
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? '저장 중...' : '변경사항 저장'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
