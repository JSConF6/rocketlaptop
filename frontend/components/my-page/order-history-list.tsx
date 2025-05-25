'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye } from 'lucide-react';

type OrderStatus = 'paid' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';

type Order = {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: OrderStatus;
  statusKorean: string;
  items: number;
};

type OrderHistoryListProps = {
  status: OrderStatus | 'all';
};

// Mock data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-12345',
    date: '2023-05-15',
    total: 900000,
    status: 'delivered',
    statusKorean: '배송완료',
    items: 1,
  },
  {
    id: '2',
    orderNumber: 'ORD-12346',
    date: '2023-05-10',
    total: 1500000,
    status: 'shipped',
    statusKorean: '배송 중',
    items: 2,
  },
  {
    id: '3',
    orderNumber: 'ORD-12347',
    date: '2023-05-05',
    total: 700000,
    status: 'preparing',
    statusKorean: '배송 준비',
    items: 1,
  },
  {
    id: '4',
    orderNumber: 'ORD-12348',
    date: '2023-04-28',
    total: 1200000,
    status: 'cancelled',
    statusKorean: '주문취소',
    items: 1,
  },
  {
    id: '5',
    orderNumber: 'ORD-12349',
    date: '2023-04-20',
    total: 2000000,
    status: 'delivered',
    statusKorean: '배송완료',
    items: 3,
  },
  {
    id: '6',
    orderNumber: 'ORD-12350',
    date: '2023-04-15',
    total: 16000000,
    status: 'delivered',
    statusKorean: '배송완료',
    items: 1,
  },
  {
    id: '7',
    orderNumber: 'ORD-12351',
    date: '2023-04-10',
    total: 500000,
    status: 'paid',
    statusKorean: '결제 완료',
    items: 1,
  },
];

export const OrderHistoryList = ({
  status,
}: OrderHistoryListProps): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const filteredOrders =
        status === 'all'
          ? mockOrders
          : mockOrders.filter(order => order.status === status);

      setOrders(filteredOrders);
      setIsLoading(false);
    };

    fetchData();
  }, [status]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
          ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">주문내역이 없습니다</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>주문번호</TableHead>
          <TableHead>주문일</TableHead>
          <TableHead>주문건수</TableHead>
          <TableHead>주문금액</TableHead>
          <TableHead>주문상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.orderNumber}</TableCell>
            <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
            <TableCell>{order.items}</TableCell>
            <TableCell>{order.total.toLocaleString()}원</TableCell>
            <TableCell>
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
              >
                {order.statusKorean}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button asChild size="sm" variant="outline">
                <Link href={`/my-page/orders/${order.id}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  상세 보기
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
