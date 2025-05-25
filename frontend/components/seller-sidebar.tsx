import { usePathname, useRouter } from 'next/navigation';
import {
  Laptop,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  ShoppingCart,
  Star,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { signOut, useSession } from 'next-auth/react';

interface SellerSideBarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const SellerSideBar = ({
  isOpen,
  onClose,
}: SellerSideBarProps): React.JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const navItems = [
    { href: '/seller', label: '대시보드', icon: LayoutDashboard },
    { href: '/seller/orders', label: '주문 관리', icon: ShoppingCart },
    { href: '/seller/products', label: '상품 관리', icon: Package },
    { href: '/seller/inquiries', label: '상품 문의 관리', icon: MessageSquare },
    { href: '/seller/reviews', label: '상품 리뷰 관리', icon: Star },
  ];

  const handleLogout = async (): Promise<void> => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    await signOut();
    if (pathname.startsWith('/seller')) {
      router.push('/');
    }
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-white transition-transform md:static md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="flex items-center gap-2 p-4 border-b">
        <Laptop className="h-6 w-6 text-blue-600" />
        <Link href="/" className="text-lg font-bold">
          RocketLaptop
        </Link>
        {onClose && (
          <Button
            variant="outline"
            size="icon"
            className="ml-auto md:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close Menu</span>
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-2 px-2">
          {navItems.map(({ href, label, icon: Icon }, idx) => (
            <Link
              key={idx}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                pathname === href
                  ? 'bg-blue-100 text-blue-600'
                  : 'hover:bg-gray-100',
              )}
              onClick={onClose}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          로그아웃
        </Button>
      </div>
    </aside>
  );
};

export default SellerSideBar;
