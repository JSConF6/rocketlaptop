import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, FileText, Star } from 'lucide-react';

type OrderStatus = 'preparing' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: OrderStatus;
  statusKorean: string;
  items: OrderItem[];
  shipping: {
    method: string;
    cost: number;
    address: {
      recipientName: string;
      phoneNumber: string;
      postalCode: string;
      streetAddress: string;
      detailedAddress: string;
    };
    trackingNumber?: string;
  };
  payment: {
    method: string;
    last4?: string;
  };
  timeline: {
    ordered: string;
    processed?: string;
    shipped?: string;
    delivered?: string;
    cancelled?: string;
  };
};

// Mock data
const mockOrders: Record<string, Order> = {
  '1': {
    id: '1',
    orderNumber: 'ORD-12345',
    date: '2023-05-15',
    total: 900000,
    status: 'delivered',
    statusKorean: '배송완료',
    items: [
      {
        id: '1',
        name: 'ProBook X5',
        price: 900000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80',
      },
    ],
    shipping: {
      method: 'Standard Shipping',
      cost: 0,
      address: {
        recipientName: '존안',
        phoneNumber: '010-1111-2222',
        postalCode: '10001',
        streetAddress: '서울 관악구 신대방동 123',
        detailedAddress: '301호',
      },
      trackingNumber: 'TRK123456789',
    },
    payment: {
      method: '카드 결제',
      last4: '4242',
    },
    timeline: {
      ordered: '2023-05-15T10:30:00',
      processed: '2023-05-15T14:20:00',
      shipped: '2023-05-16T09:15:00',
      delivered: '2023-05-18T13:45:00',
    },
  },
  '2': {
    id: '2',
    orderNumber: 'ORD-12346',
    date: '2023-05-10',
    total: 2000000,
    status: 'shipped',
    statusKorean: '배송 중',
    items: [
      {
        id: '2',
        name: 'GameForce RTX',
        price: 1800000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80',
      },
      {
        id: '5',
        name: 'Gaming Mouse',
        price: 200000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80',
      },
    ],
    shipping: {
      method: 'Express Shipping',
      cost: 15.99,
      address: {
        recipientName: '존안바',
        phoneNumber: '010-1111-2223',
        postalCode: '10001',
        streetAddress: '서울 관악구 신대방동 523',
        detailedAddress: '301호',
      },
      trackingNumber: 'TRK987654321',
    },
    payment: {
      method: 'PayPal',
    },
    timeline: {
      ordered: '2023-05-10T15:45:00',
      processed: '2023-05-10T18:30:00',
      shipped: '2023-05-11T10:20:00',
    },
  },
  '3': {
    id: '3',
    orderNumber: 'ORD-12347',
    date: '2023-05-05',
    total: 800000,
    status: 'preparing',
    statusKorean: '배송 준비',
    items: [
      {
        id: '3',
        name: 'UltraSlim Air',
        price: 800000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80',
      },
    ],
    shipping: {
      method: 'Standard Shipping',
      cost: 0,
      address: {
        recipientName: '존안파',
        phoneNumber: '010-1111-2225',
        postalCode: '10001',
        streetAddress: '서울 관악구 신대방동 783',
        detailedAddress: '301호',
      },
    },
    payment: {
      method: 'Credit Card',
      last4: '1234',
    },
    timeline: {
      ordered: '2023-05-05T09:15:00',
      processed: '2023-05-05T14:30:00',
    },
  },
  '4': {
    id: '4',
    orderNumber: 'ORD-12348',
    date: '2023-04-28',
    total: 1500000,
    status: 'cancelled',
    statusKorean: '배송취소',
    items: [
      {
        id: '7',
        name: 'ProBook X7',
        price: 1500000,
        quantity: 1,
        image: '/placeholder.svg?height=80&width=80',
      },
    ],
    shipping: {
      method: 'Standard Shipping',
      cost: 0,
      address: {
        recipientName: '존안마',
        phoneNumber: '010-1111-2226',
        postalCode: '10001',
        streetAddress: '서울 관악구 신대방동 723',
        detailedAddress: '301호',
      },
    },
    payment: {
      method: 'Credit Card',
      last4: '5678',
    },
    timeline: {
      ordered: '2023-04-28T11:20:00',
      cancelled: '2023-04-29T09:45:00',
    },
  },
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const order = mockOrders[params.id];

  if (!order) {
    return {
      title: '주문 내역이 존재하지 않습니다 | RocketLaptop',
    };
  }

  return {
    title: `${order.orderNumber} | RocketLaptop`,
    description: `주문 내역 ${order.orderNumber} 상세보기`,
  };
};

const OrderDetailPage = ({
  params,
}: {
  params: { id: string };
}): React.JSX.Element => {
  const order = mockOrders[params.id];

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/my-page/orders">
              <ArrowLeft className="h-4 w-4 mr-1" />
              전체 주문내역 보기
            </Link>
          </Button>
          <h2 className="text-2xl font-bold">{order.orderNumber}</h2>
          <p className="text-muted-foreground">
            주문일 : {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              order.status === 'delivered'
                ? 'default'
                : order.status === 'shipped'
                  ? 'secondary'
                  : order.status === 'preparing' || order.status === 'paid'
                    ? 'outline'
                    : 'destructive'
            }
            className="text-sm py-1"
          >
            {order.statusKorean}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>주문상품</CardTitle>
              <CardDescription>주문에 포함된 상품</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        주문수량: {item.quantity}
                      </p>
                      <div className="mt-2 flex gap-2">
                        {order.status === 'delivered' && (
                          <>
                            <Button size="sm" variant="outline" asChild>
                              <Link
                                href={`/my-page/reviews/write?productId=${item.id}`}
                              >
                                <Star className="h-3.5 w-3.5 mr-1" />
                                리뷰 작성
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link
                                href={`/my-page/inquiries/new?productId=${item.id}`}
                              >
                                <FileText className="h-3.5 w-3.5 mr-1" />
                                상품 문의
                              </Link>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {item.price.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                ))}

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between font-medium">
                    <span>총 가격</span>
                    <span>{order.total.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>받는사람 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-lg text-muted-foreground">
                    <div>
                      <span>{order.shipping.address.recipientName}</span>
                    </div>
                    <div>
                      <span>{order.shipping.address.phoneNumber}</span>
                    </div>
                    <div>
                      <span>
                        ({order.shipping.address.postalCode}){' '}
                        {order.shipping.address.streetAddress}{' '}
                        {order.shipping.address.detailedAddress}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
