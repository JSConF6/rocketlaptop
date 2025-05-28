import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { ShoppingCart, Package, MessageSquare, Star } from 'lucide-react';
import Link from 'next/link';

const SellerDashboard = async (): Promise<React.JSX.Element> => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{user?.name}님</h1>
          <p className="text-gray-600">
            판매자 대시보드에 오신 것을 환영합니다
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">상품 관리</CardTitle>
                <CardDescription>상품을 등록하고 관리하세요</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/seller/products">상품 관리</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg">주문 관리</CardTitle>
                <CardDescription>주문을 조회하고 관리하세요</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/seller/orders">주문 관리</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <CardTitle className="text-lg">상품 리뷰</CardTitle>
                <CardDescription>상품 리뷰를 관리하세요</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/seller/reviews">리뷰 관리하기</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-lg">상품 문의</CardTitle>
                <CardDescription>상품 문의를 관리하세요</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/seller/inquiries">문의 내역 보기</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
