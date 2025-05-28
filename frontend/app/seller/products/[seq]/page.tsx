'use client';

import type React from 'react';

import { useState, useEffect, useRef, use, useCallback } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import { CategoryItem } from '@/types/category';
import { ProductFormData, ProductImage } from '@/types/product';
import { fetchCategories } from '@/lib/api/category';
import {
  fetchSellerProduct,
  updateSellerProduct,
} from '@/lib/api/sellerProduct';
import LabeledInput from '@/components/LabelInput';
import Image from 'next/image';

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

type Props = {
  params: Promise<{ seq: string }>;
};

const EditProductPage = ({ params }: Props): React.JSX.Element => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const { seq } = use(params);
  const [currentTab, setCurrentTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [deletedImageSeqs, setDeletedImageSeqs] = useState<number[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    categorySeq: '',
    price: '',
    quantity: '',
    processor: '',
    memory: '',
    storage: '',
    graphics: '',
    display: '',
    battery: '',
    weight: '',
    os: '',
    status: 'ON_SALE',
  });

  useEffect(() => {
    const getCategories = async (): Promise<void> => {
      try {
        const data = await fetchCategories();
        setCategories(data.result.categories);
      } catch (error) {
        console.error('카테고리 조회 실패');
      }
    };
    getCategories();
  }, []);

  const productDetailInputFields = [
    { id: 'processor', label: 'CPU', type: 'text', required: true },
    { id: 'memory', label: '메모리', type: 'text', required: true },
    { id: 'storage', label: '저장장치', type: 'text', required: true },
    { id: 'graphics', label: '그래픽', type: 'text', required: true },
    { id: 'display', label: '화면', type: 'text', required: true },
    { id: 'battery', label: '배터리', type: 'text', required: true },
    { id: 'weight', label: '무게', type: 'text', required: true },
    { id: 'os', label: '운영체제', type: 'text', required: true },
  ];

  const isBasicInfoComplete = () => {
    return (
      formData.name.trim() !== '' &&
      formData.categorySeq.trim() !== '' &&
      formData.price.trim() !== '' &&
      formData.quantity.trim() !== ''
    );
  };

  const isSpecificationsComplete = () => {
    return productDetailInputFields.every(field => formData[field.id]?.trim());
  };

  const isImagesComplete = () => {
    return productImages.length + imageFiles.length >= 2;
  };

  const getProductDetail = useCallback(async () => {
    if (status !== 'authenticated' || !session?.accessToken) return;
    try {
      if (!session?.accessToken) return;
      const data = await fetchSellerProduct(session.accessToken, Number(seq));
      const productData = data.result;
      setFormData({
        name: productData.productName,
        categorySeq: productData.categorySeq.toString(),
        price: productData.price.toString(),
        quantity: productData.quantity.toString(),
        processor: productData.processor,
        memory: productData.memory,
        storage: productData.storage,
        graphics: productData.graphics,
        display: productData.display,
        battery: productData.battery,
        weight: productData.weight,
        os: productData.os,
        status: productData.status,
      });
      setProductImages(productData.productImages);
      setPreviewUrls(
        productData.productImages.map(
          img => `${process.env.NEXT_PUBLIC_API_URL}${img.productImagePath}`,
        ),
      );
      setIsLoading(false);
    } catch (e) {
      toast({
        title: '상품 상세보기 조회 실패',
        description: '상품 상세보기 조회 실패 했습니다.',
        variant: 'destructive',
      });
    }
  }, [session, seq]);

  useEffect(() => {
    getProductDetail();
  }, [getProductDetail]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string): void => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const maxFileSize = 10;
  const maxFileLength = 5;
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const imageFileLen =
      productImages.length + files.length + imageFiles.length;
    if (imageFileLen > maxFileLength) {
      toast({
        title: '이미지 업로드 제한',
        description: `최대 ${maxFileLength}개까지 업로드할 수 있습니다.`,
        variant: 'destructive',
      });
      return;
    }

    const validFiles: File[] = [];

    for (const file of files) {
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > maxFileSize) {
        toast({
          title: '이미지 파일 용량 초과',
          description: `${file.name} 파일은 ${maxFileSize}MB 초과하여 업로드가 중단됩니다.`,
          variant: 'destructive',
        });
      } else {
        validFiles.push(file);
      }
    }

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setImageFiles(prev => [...prev, ...validFiles]);
    setPreviewUrls(prev => [...prev, ...newPreviews]);
    e.target.value = '';
  };

  // 이미지 제거 처리
  const handleRemoveImage = (index: number): void => {
    const isExisting = index < productImages.length;
    if (isExisting) {
      const seq = productImages[index]?.seq;
      if (seq) {
        setDeletedImageSeqs(prev => [...prev, seq]);
      }
      setProductImages(prev => prev.filter((_, i) => i !== index));
    } else {
      const fileIndex = index - productImages.length;
      setImageFiles(prev => prev.filter((_, i) => i !== fileIndex));
    }
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (session?.accessToken) {
      setIsSubmitting(true);

      if (
        !formData.name ||
        !formData.categorySeq ||
        !formData.price ||
        !formData.quantity ||
        !formData.processor ||
        !formData.memory ||
        !formData.storage ||
        !formData.graphics ||
        !formData.display ||
        !formData.battery ||
        !formData.weight ||
        !formData.os
      ) {
        toast({
          title: '입력 오류',
          description: '필수 항목을 모두 입력해주세요.',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      if (!isImagesComplete()) {
        toast({
          title: '입력 오류',
          description: '상품 이미지를 2장 이상 첨부해주세요.',
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }

      const updateProductFormData = new FormData();
      const updateProductImages = productImages.map((productImage, index) => ({
        seq: productImage.seq,
        productImageOrder: index + 1,
      }));
      updateProductFormData.append(
        'updateProduct',
        new Blob(
          [
            JSON.stringify({
              product: formData,
              updateProductImages,
              deletedImageSeqs,
            }),
          ],
          { type: 'application/json' },
        ),
      );
      imageFiles.forEach(imageFile =>
        updateProductFormData.append('newImages', imageFile),
      );

      try {
        const data = await updateSellerProduct(
          session?.accessToken,
          seq,
          updateProductFormData,
        );
        toast({
          title: '상품 수정 성공',
          description: `상품이 성공적으로 수정되었습니다.`,
        });
        setIsSubmitting(false);
        setCurrentTab('basic');
        setImageFiles([]);
        setDeletedImageSeqs([]);
        getProductDetail();
      } catch (err) {
        toast({
          title: '상품 수정 실패',
          description: `상품 수정 실패했습니다.`,
          variant: 'destructive',
        });
        setIsSubmitting(false);
      }
    }
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
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">기본 정보</TabsTrigger>
            <TabsTrigger value="specifications">상세 정보</TabsTrigger>
            <TabsTrigger value="images">이미지</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
                <CardDescription>
                  상품의 기본 정보를 입력하세요.
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
                      value={formData.categorySeq}
                      onValueChange={value =>
                        handleSelectChange('categorySeq', value)
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem
                            key={category.seq}
                            value={category.seq.toString()}
                          >
                            {category.categoryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      판매가 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="0"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">
                      재고 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      placeholder="0"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-1">
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
                        <SelectItem value="ON_SALE">판매중</SelectItem>
                        <SelectItem value="SOLD_OUT">품절</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>상세 정보</CardTitle>
                <CardDescription>
                  상품의 상세 정보를 입력하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {productDetailInputFields.map(field => [
                    <LabeledInput
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      type={field.type}
                      value={formData[field.id] ?? ''}
                      onChange={handleChange}
                      required={field.required}
                    />,
                  ])}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>상품 이미지</CardTitle>
                <CardDescription>
                  상품 이미지를 추가하세요. 첫 번째 이미지가 대표 이미지로
                  사용됩니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {previewUrls.map((url, index) => (
                    <div
                      key={index}
                      className="relative rounded-md overflow-hidden border aspect-square"
                    >
                      <Image
                        src={url}
                        alt={`미리보기 ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={150}
                        height={150}
                      />
                      {index === 0 && (
                        <span className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-br-md">
                          대표 이미지
                        </span>
                      )}
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                  {productImages.length + imageFiles.length < 5 && (
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="border border-dashed rounded-md flex flex-col items-center justify-center p-4 hover:bg-gray-50 aspect-square"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">이미지 추가</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  이미지는 최대 5개까지 추가할 수 있습니다. (10MB 이하의 파일만
                  업로드 할 수 있습니다.)
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="outline"
            type="button"
            className="cursor-pointer"
            onClick={() => router.back()}
          >
            취소
          </Button>

          {currentTab === 'basic' && (
            <Button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                if (!isBasicInfoComplete()) {
                  toast({
                    title: '입력 오류',
                    description: '기본 정보를 모두 입력해주세요.',
                    variant: 'destructive',
                  });
                  return;
                }
                setCurrentTab('specifications');
              }}
            >
              다음
            </Button>
          )}

          {currentTab === 'specifications' && (
            <Button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                if (!isSpecificationsComplete()) {
                  toast({
                    title: '입력 오류',
                    description: '상세 정보를 모두 입력해주세요.',
                    variant: 'destructive',
                  });
                  return;
                }
                setCurrentTab('images');
              }}
            >
              다음
            </Button>
          )}

          {currentTab === 'images' && (
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? '저장 중...' : '변경사항 저장'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
