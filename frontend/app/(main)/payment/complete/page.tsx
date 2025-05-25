'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';

const CheckoutCompletePage = (): React.JSX.Element => {
  // 주문 정보 (실제로는 API에서 가져오거나 상태 관리 라이브러리에서 가져옴)
  const orderInfo = {
    orderNumber:
      'RL-' +
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0'),
    orderDate: new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    paymentMethod: '신용/체크카드',
    totalAmount: '900,000원',
    shippingAddress: '서울시 강남구 테헤란로 123 456동 789호',
    recipientName: '홍길동',
    recipientPhone: '010-1234-5678',
    estimatedDelivery:
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(
        'ko-KR',
        {
          month: 'long',
          day: 'numeric',
        },
      ) + ' 도착 예정',
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* 주문 완료 메시지 */}
        <div className="bg-white border rounded-lg p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">주문이 완료되었습니다!</h1>
          <p className="text-gray-600 mb-4">주문해주셔서 감사합니다.</p>
          <div className="inline-block bg-gray-100 px-4 py-2 rounded-md mb-4">
            <p className="text-sm">
              주문번호:{' '}
              <span className="font-semibold">{orderInfo.orderNumber}</span>
            </p>
          </div>
        </div>

        {/* 주문 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">주문 정보</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">주문번호</span>
                <span>{orderInfo.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">주문일시</span>
                <span>{orderInfo.orderDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">결제방법</span>
                <span>{orderInfo.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">결제금액</span>
                <span className="font-semibold">{orderInfo.totalAmount}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">배송 정보</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600">받는 사람</p>
                <p>{orderInfo.recipientName}</p>
              </div>
              <div>
                <p className="text-gray-600">연락처</p>
                <p>{orderInfo.recipientPhone}</p>
              </div>
              <div>
                <p className="text-gray-600">배송지</p>
                <p>{orderInfo.shippingAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 주문 상품 */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">주문 상품</h2>

          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="ProBook X5"
                width={80}
                height={80}
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

        {/* 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/my-page/orders"
            className="px-6 py-3 bg-blue-600 text-white rounded-md flex items-center justify-center"
          >
            주문 내역 보기
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-white border border-gray-300 rounded-md flex items-center justify-center"
          >
            쇼핑 계속하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCompletePage;
