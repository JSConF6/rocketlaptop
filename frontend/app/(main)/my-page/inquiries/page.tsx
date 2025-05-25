import type { Metadata } from 'next';
import { InquiriesList } from '@/components/my-page/inquiries-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: '상품 문의',
  description: 'Manage your product inquiries',
};

const InquiriesPage = (): React.JSX.Element => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">상품 문의</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>내가 작성한 문의</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ALL">
            <TabsList className="mb-4">
              <TabsTrigger value="ALL">전체 문의</TabsTrigger>
              <TabsTrigger value="WAITING">답변 대기중</TabsTrigger>
              <TabsTrigger value="ANSWERED">답변 완료</TabsTrigger>
            </TabsList>
            <TabsContent value="ALL">
              <InquiriesList status="ALL" />
            </TabsContent>
            <TabsContent value="WAITING">
              <InquiriesList status="WAITING" />
            </TabsContent>
            <TabsContent value="ANSWERED">
              <InquiriesList status="ANSWERED" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default InquiriesPage;
