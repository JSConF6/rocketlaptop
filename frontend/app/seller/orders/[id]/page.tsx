'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Truck,
  Package,
  User,
  Calendar,
  CreditCard,
  MapPin,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// 주문 상태에 따른 배지 색상
const statusColors: Record<string, string> = {
  결제완료: 'bg-blue-100 text-blue-800',
  배송준비중: 'bg-yellow-100 text-yellow-800',
  배송중: 'bg-purple-100 text-purple-800',
  배송완료: 'bg-green-100 text-green-800',
  취소: 'bg-red-100 text-red-800',
  반품: 'bg-gray-100 text-gray-800',
};

// 샘플 주문 데이터 (실제로는 API에서 가져올 것)
const getOrderData = (id: string) => {
  const orderId = Number.parseInt(id);
  return {
    id: orderId,
    customer: `고객${orderId % 100}`,
    email: `user${orderId % 100}@example.com`,
    phone: `010-${1000 + (orderId % 9000)}-${1000 + (orderId % 9000)}`,
    date: `2024-05-${(orderId % 30) + 1}`,
    total: Math.floor(500000 + Math.random() * 2000000),
    status: ['결제완료', '배송준비중', '배송중', '배송완료', '취소', '반품'][
      orderId % 6
    ],
    paymentMethod: ['신용카드', '무통장입금', '카카오페이', '네이버페이'][
      orderId % 4
    ],
    items: [
      {
        id: 1000 + (orderId % 50),
        name: `노트북 모델 ${String.fromCharCode(65 + (orderId % 26))}${(orderId % 50) + 1}`,
        price: Math.floor(800000 + Math.random() * 1000000),
        quantity: Math.floor(Math.random() * 2) + 1,
        options: '색상: 스페이스 그레이 / RAM: 16GB / SSD: 512GB',
      },
      {
        id: 1050 + (orderId % 30),
        name: `노트북 파우치 ${String.fromCharCode(65 + (orderId % 26))}`,
        price: Math.floor(30000 + Math.random() * 50000),
        quantity: 1,
        options: '색상: 블랙',
      },
    ],
    shippingAddress: {
      name: `고객${orderId % 100}`,
      address: `서울시 강남구 테헤란로 ${123 + (orderId % 877)}`,
      detailAddress: `${(orderId % 30) + 1}층 ${(orderId % 10) + 1}호`,
      zipCode: `0${6000 + (orderId % 4000)}`,
      phone: `010-${1000 + (orderId % 9000)}-${1000 + (orderId % 9000)}`,
    },
    trackingNumber: orderId % 2 === 0 ? `CJ${1234567890 + orderId}` : '',
    deliveryCompany: 'CJ대한통운',
    orderNotes: orderId % 3 === 0 ? '배송 전 연락 부탁드립니다.' : '',
    paymentId: `PAY${orderId}${Date.now().toString().slice(-6)}`,
  };
};

const OrderDetailPage = ({
  params,
}: {
  params: { id: string };
}): React.JSX.Element => {
  const router = useRouter();
  const order = getOrderData(params.id);
  const [status, setStatus] = useState(order.status);
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber);
  const [isUpdating, setIsUpdating] = useState(false);

  // 주문 상태 변경 처리
  const handleStatusChange = async (newStatus: string): Promise<void> => {
    setIsUpdating(true);

    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setStatus(newStatus);
      setIsUpdating(false);
      toast({
        title: '주문 상태가 업데이트되었습니다',
        description: `주문 #${order.id}의 상태가 '${newStatus}'(으)로 변경되었습니다.`,
      });
    }, 800);
  };

  // 운송장 번호 업데이트
  const handleTrackingUpdate = async (value: string): Promise<void> => {
    setIsUpdating(true);

    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setTrackingNumber(value);
      setIsUpdating(false);
      toast({
        title: '운송장 번호가 업데이트되었습니다',
        description: `주문 #${order.id}의 운송장 번호가 '${value}'(으)로 설정되었습니다.`,
      });
    }, 800);
  };

  // 총 상품 금액 계산
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 3000; // 배송비
  const discount = order.total - subtotal - shipping; // 할인액

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">주문 상세 정보</h1>
        </div>
        <Badge className={statusColors[status]}>{status}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>주문 정보</CardTitle>
              <CardDescription>주문 번호: #{order.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">주문일자:</span> {order.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">주문자:</span>{' '}
                    {order.customer}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium ml-6">이메일:</span>{' '}
                    {order.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium ml-6">연락처:</span>{' '}
                    {order.phone}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">결제방법:</span>{' '}
                    {order.paymentMethod}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium ml-6">결제번호:</span>{' '}
                    {order.paymentId}
                  </div>
                  {order.orderNotes && (
                    <div className="flex items-start gap-2 text-sm mt-4">
                      <span className="font-medium">주문 메모:</span>
                      <span className="text-gray-600">{order.orderNotes}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>주문 상품</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between border-b pb-4"
                  >
                    <div className="flex gap-4">
                      <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.options}</p>
                        <p className="text-sm">
                          ₩{item.price.toLocaleString()} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ₩{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span>상품 금액</span>
                    <span>₩{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>배송비</span>
                    <span>₩{shipping.toLocaleString()}</span>
                  </div>
                  {discount !== 0 && (
                    <div className="flex justify-between text-sm">
                      <span>할인</span>
                      <span className="text-red-500">
                        -₩{Math.abs(discount).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>총 결제 금액</span>
                    <span>₩{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>배송 상태 관리</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">주문 상태</label>
                <Select
                  defaultValue={status}
                  onValueChange={handleStatusChange}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="결제완료">결제완료</SelectItem>
                    <SelectItem value="배송준비중">배송준비중</SelectItem>
                    <SelectItem value="배송중">배송중</SelectItem>
                    <SelectItem value="배송완료">배송완료</SelectItem>
                    <SelectItem value="취소">취소</SelectItem>
                    <SelectItem value="반품">반품</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">운송장 번호</label>
                <div className="flex gap-2">
                  <Select
                    defaultValue={trackingNumber ? 'CJ대한통운' : ''}
                    disabled={
                      isUpdating || status === '취소' || status === '반품'
                    }
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="택배사" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CJ대한통운">CJ대한통운</SelectItem>
                      <SelectItem value="우체국택배">우체국택배</SelectItem>
                      <SelectItem value="한진택배">한진택배</SelectItem>
                      <SelectItem value="롯데택배">롯데택배</SelectItem>
                    </SelectContent>
                  </Select>
                  <input
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="운송장 번호 입력"
                    value={trackingNumber}
                    onChange={e => setTrackingNumber(e.target.value)}
                    disabled={
                      isUpdating || status === '취소' || status === '반품'
                    }
                  />
                </div>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
                disabled={isUpdating || status === '취소' || status === '반품'}
                onClick={async () => handleTrackingUpdate(trackingNumber)}
              >
                {isUpdating ? '업데이트 중...' : '운송장 정보 저장'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>배송지 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{order.shippingAddress.name}</p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      ({order.shippingAddress.zipCode}){' '}
                      {order.shippingAddress.address}{' '}
                      {order.shippingAddress.detailAddress}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {(status === '배송중' || status === '배송완료') && trackingNumber && (
            <Card>
              <CardHeader>
                <CardTitle>배송 추적</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">택배사:</span>{' '}
                    {order.deliveryCompany}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium ml-6">운송장:</span>{' '}
                    {trackingNumber}
                  </div>
                  <Button className="w-full mt-2" variant="outline">
                    배송 조회
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
