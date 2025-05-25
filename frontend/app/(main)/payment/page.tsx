'use client';

import type React from 'react';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CheckoutPage = (): React.JSX.Element => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setIsProcessing(true);

    // 실제 구현에서는 결제 처리 API 호출
    setTimeout(() => {
      router.push('/payment/complete');
    }, 1500);
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/cart"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>장바구니로 돌아가기</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-8">결제하기</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 왼쪽: 배송 정보 및 결제 방법 */}
        <div className="md:col-span-2 space-y-6">
          <form id="payment-form" onSubmit={handleSubmit}>
            {/* 배송 정보 */}
            <div className="bg-white border rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                배송 정보
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue="홍길동"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                  >
                    연락처
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue="010-1234-5678"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-1"
                >
                  주소
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    id="zipcode"
                    className="w-24 px-3 py-2 border rounded-md"
                    defaultValue="12345"
                    required
                  />
                  <Button type="button" className="cursor-pointer">
                    주소 찾기
                  </Button>
                </div>
                <input
                  type="text"
                  id="address1"
                  className="w-full px-3 py-2 border rounded-md mb-2"
                  defaultValue="서울시 강남구 테헤란로 123"
                  required
                />
                <input
                  type="text"
                  id="address2"
                  className="w-full px-3 py-2 border rounded-md"
                  defaultValue="456동 789호"
                  required
                />
              </div>
            </div>

            {/* 모바일에서만 보이는 주문 요약 */}
            <div className="md:hidden bg-white border rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">주문 요약</h2>
              <div className="flex justify-between mb-2">
                <span>상품 금액</span>
                <span>900,000원</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>배송비</span>
                <span>0원</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>총 결제 금액</span>
                <span className="text-blue-600">900,000원</span>
              </div>

              <Button
                type="submit"
                form="payment-form"
                className="w-full py-3 bg-blue-600 text-white rounded-md flex items-center justify-center"
                disabled={isProcessing}
              >
                {isProcessing ? '처리 중...' : '결제하기'}
                {!isProcessing && <ChevronRight className="ml-1 h-4 w-4" />}
              </Button>
            </div>
          </form>
        </div>

        {/* 오른쪽: 주문 요약 */}
        <div className="hidden md:block">
          <div className="bg-white border rounded-lg p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">주문 요약</h2>

            <div className="border-b pb-4 mb-4">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="ProBook X5"
                    width={64}
                    height={64}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">ProBook X5</p>
                  <p className="text-sm text-gray-600">Samsung</p>
                  <p className="text-sm">수량: 1</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">900,000원</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>상품 금액</span>
                <span>900,000원</span>
              </div>
              <div className="flex justify-between">
                <span>배송비</span>
                <span>0원</span>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-lg pt-4 border-t mb-6">
              <span>총 결제 금액</span>
              <span className="text-blue-600">900,000원</span>
            </div>

            <Button
              type="submit"
              form="payment-form"
              className="w-full py-3 bg-blue-600 text-white rounded-md flex items-center justify-center cursor-pointer"
              disabled={isProcessing}
            >
              {isProcessing ? '처리 중...' : '결제하기'}
              {!isProcessing && <ChevronRight className="ml-1 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
