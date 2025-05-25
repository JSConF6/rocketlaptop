import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Star, MessageCircle, User, MapPin } from 'lucide-react';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: '마이 페이지',
  description: 'Manage your account, orders, points, and more',
};

const MyPage = async (): Promise<React.JSX.Element> => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{user?.name} 님</h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />내 정보
            </CardTitle>
            <CardDescription>내 정보를 관리하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button asChild className="w-full mt-3">
                <Link href="/my-page/profile">정보 수정</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              배송지 관리
            </CardTitle>
            <CardDescription>배송지 정보를 관리하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button asChild className="w-full mt-3">
                <Link href="/my-page/addresses">배송지 관리</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              주문내역
            </CardTitle>
            <CardDescription>주문내역을 조회하고 관리하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button asChild className="w-full mt-3">
                <Link href="/my-page/orders">주문내역 보기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              상품 리뷰
            </CardTitle>
            <CardDescription>상품 리뷰를 관리하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button asChild className="w-full mt-3">
                <Link href="/my-page/reviews">리뷰 관리하기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              상품 문의
            </CardTitle>
            <CardDescription>상품 문의를 관리하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button asChild className="w-full mt-3">
                <Link href="/my-page/inquiries">문의 내역 보기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyPage;
