'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Package,
  Star,
  MessageCircle,
  User,
  MapPin,
  LogOut,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';

const menuItems = [
  {
    title: '대시보드',
    href: '/my-page',
    icon: <ShoppingBag className="h-4 w-4 mr-2" />,
    exact: true,
  },
  {
    title: '내 정보',
    href: '/my-page/profile',
    icon: <User className="h-4 w-4 mr-2" />,
  },
  {
    title: '배송지 관리',
    href: '/my-page/addresses',
    icon: <MapPin className="h-4 w-4 mr-2" />,
  },
  {
    title: '주문내역',
    href: '/my-page/orders',
    icon: <Package className="h-4 w-4 mr-2" />,
  },
  {
    title: '상품리뷰',
    href: '/my-page/reviews',
    icon: <Star className="h-4 w-4 mr-2" />,
  },
  {
    title: '상품문의',
    href: '/my-page/inquiries',
    icon: <MessageCircle className="h-4 w-4 mr-2" />,
  },
];

export const MyPageSidebar = (): React.JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async (): Promise<void> => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    await signOut();
    const protectedRoutes = ['/my-page', '/cart', '/payment', '/seller'];
    const isProtected = protectedRoutes.some(path => pathname.startsWith(path));

    if (isProtected) {
      router.push('/');
    }
  };

  return (
    <aside className="space-y-6">
      <nav className="flex flex-col space-y-1">
        {menuItems.map(item => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm rounded-md',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted',
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="pt-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          로그아웃
        </Button>
      </div>
    </aside>
  );
};
