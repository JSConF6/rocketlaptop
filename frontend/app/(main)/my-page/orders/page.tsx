import type { Metadata } from 'next';
import { OrderHistoryList } from '@/components/my-page/order-history-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: '주문 내역',
  description: '주문 내역을 조회하고 관리하세요',
};

const OrdersPage = (): React.JSX.Element => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">주문 내역</h2>
        <p className="text-muted-foreground">주문 내역을 조회하고 관리하세요</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>내 주문 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">전체 주문 내역</TabsTrigger>
              <TabsTrigger value="paid">결제 완료</TabsTrigger>
              <TabsTrigger value="preparing">배송 준비</TabsTrigger>
              <TabsTrigger value="shipped">배송 중</TabsTrigger>
              <TabsTrigger value="delivered">배송완료</TabsTrigger>
              <TabsTrigger value="cancelled">주문취소</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <OrderHistoryList status="all" />
            </TabsContent>
            <TabsContent value="paid">
              <OrderHistoryList status="paid" />
            </TabsContent>
            <TabsContent value="preparing">
              <OrderHistoryList status="preparing" />
            </TabsContent>
            <TabsContent value="shipped">
              <OrderHistoryList status="shipped" />
            </TabsContent>
            <TabsContent value="delivered">
              <OrderHistoryList status="delivered" />
            </TabsContent>
            <TabsContent value="cancelled">
              <OrderHistoryList status="cancelled" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
