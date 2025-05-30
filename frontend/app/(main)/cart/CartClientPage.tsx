'use client';

import type React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { CartItem } from '@/types/cart';
import { useEffect, useState } from 'react';
import { deleteCartItem, fetchCartItems } from '@/lib/api/cart';
import { useSession } from 'next-auth/react';

type CartClientPageProps = {
  cartItems: CartItem[];
};

const CartClientPage = (props: CartClientPageProps): React.JSX.Element => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<CartItem[]>(props.cartItems);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
    setTotalPrice(total);
  }, [cartItems]);

  const handleRemoveItem = async (seq: number, name: string): Promise<void> => {
    if (session && session.accessToken) {
      try {
        await deleteCartItem(session?.accessToken, seq);
        const data = await fetchCartItems(session?.accessToken);
        setCartItems(data.result.cartItems);
        toast({
          title: '장바구니 상품 삭제',
          description: `${name} 상품이 삭제 되었습니다.`,
        });
      } catch (err) {
        toast({
          title: '장바구니 상품 삭제 실패',
          description: `장바구니 상품 삭제 실패`,
        });
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="mx-auto max-w-md space-y-6">
          <div className="flex justify-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">
            장바구니에 담긴 상품이 없습니다.
          </h1>
          <Button asChild size="lg">
            <Link href="/products">장바구니에 담으러 가기</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-lg border shadow-sm">
            <div className="p-6 space-y-6">
              {cartItems.map(item => (
                <div
                  key={item.seq}
                  className="flex flex-col sm:flex-row gap-4 py-4 border-b last:border-0"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        `${process.env.NEXT_PUBLIC_API_URL}${item.productImagePath}` ||
                        '/placeholder.svg'
                      }
                      alt={item.productName}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <h3 className="flex items-center font-medium">
                        {item.productName}
                        <Badge className="ms-2">{item.categoryName}</Badge>
                      </h3>
                      <p className="font-medium">
                        {item.totalPrice.toLocaleString()}원
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {item.unitPrice.toLocaleString()}원
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-8 text-center">
                          {item.quantity}개
                        </span>
                      </div>

                      <button
                        className="text-muted-foreground hover:text-destructive"
                        onClick={async () =>
                          handleRemoveItem(item.seq, item.productName)
                        }
                        aria-label={`Remove ${item.productName} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">삭제</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-lg border shadow-sm">
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-bold">주문서</h2>

              <div className="space-y-4">
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>총 금액</span>
                    <span>{totalPrice.toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              <Button asChild className="w-full">
                <Link href="/payment">
                  결제하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClientPage;
