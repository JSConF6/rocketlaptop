'use client';

import type React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Search, User, ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/components/cart-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { signOut, useSession } from 'next-auth/react';

const Header = (): React.JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Category');
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      });
    }
  };

  const handleCategoryChange = (value: string): void => {
    setSelectedCategory(value);
    if (value !== 'All Category') {
      startTransition(() => {
        router.push(`/categories/${value.toLowerCase()}`);
      });
    }
  };

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
    <header className="sticky top-0 z-50 w-full bg-background">
      {/* Top navigation bar */}
      <div className="hidden md:block border-b bg-gray-50">
        <div className="container flex h-9 items-center justify-end text-sm">
          <div className="flex items-center space-x-4">
            {!session ? (
              <>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground font-medium"
                >
                  로그인
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/seller"
                  className="text-muted-foreground hover:text-foreground font-medium"
                >
                  판매자 페이지
                </Link>
                <span className="text-muted-foreground">
                  {session.user.name}님
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-b bg-background shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/RocketLaptop_Logo.png"
                alt="RocketLaptop Logo"
                width={32}
                height={32}
                className="h-8 w-8 mb-2"
                priority
              />
              <span className="font-bold sm:inline-block">RocketLaptop</span>
            </Link>
          </div>

          <form
            onSubmit={handleSearch}
            className="hidden flex-1 max-w-md mx-4 lg:flex"
          >
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="카테고리, 상품 이름"
                className="w-full pl-8 border-gray-300 focus-visible:ring-primary"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
            </div>
          </form>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <User className="h-5 w-5" />
                      <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled>
                      {session.user.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/my-page">마이페이지</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      로그아웃
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/login">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Login</span>
                  </Link>
                </Button>
              )}

              <Button variant="ghost" size="icon" asChild className="relative">
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {cartItems.length}
                    </span>
                  )}
                  <span className="sr-only">Shopping cart</span>
                </Link>
              </Button>
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>RocketLaptop</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <form onSubmit={handleSearch} className="mb-4">
                    <div className="relative w-full">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="카테고리, 상품이름"
                        className="w-full pl-8"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>
                  <div className="space-y-3">
                    <SheetClose asChild>
                      <Link href="/" className="block py-2">
                        Home
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/products" className="block py-2">
                        All Laptops
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/categories/gaming" className="block py-2">
                        Gaming Laptops
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/categories/business" className="block py-2">
                        Business Laptops
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/categories/ultrabook" className="block py-2">
                        Ultrabooks
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/cart" className="block py-2">
                        Cart
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/wishlist" className="block py-2">
                        Wishlist
                      </Link>
                    </SheetClose>
                    <div className="border-t my-2"></div>
                    {session ? (
                      <>
                        <SheetClose asChild>
                          <Link href="/my-page" className="block py-2">
                            마이페이지
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/seller" className="block py-2">
                            판매자 페이지
                          </Link>
                        </SheetClose>
                        <button
                          onClick={handleLogout}
                          className="block py-2 w-full text-left"
                        >
                          로그아웃
                        </button>
                      </>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Link href="/login" className="block py-2">
                            로그인
                          </Link>
                        </SheetClose>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
