'use client';

import type React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/cart-provider';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

const CartClientPage = (): React.JSX.Element => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { toast } = useToast();

  const handleQuantityChange = (seq: number, newQuantity: number): void => {
    if (newQuantity > 0) {
      updateQuantity(seq, newQuantity);
    }
  };

  const handleRemoveItem = (seq: number, name: string): void => {
    removeFromCart(seq);

    toast({
      title: 'Item removed',
      description: `${name} has been removed from your cart.`,
    });
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
                        `${process.env.NEXT_PUBLIC_API_URL}${item.image}` ||
                        '/placeholder.svg'
                      }
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <h3 className="flex items-center font-medium">
                        {item.name}
                        <Badge className="ms-2">Samsung</Badge>
                      </h3>
                      <p className="font-medium">
                        {(item.price * item.quantity).toLocaleString()}원
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {item.price.toLocaleString()}원
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          className="h-8 w-8 rounded-md border flex items-center justify-center"
                          onClick={() =>
                            handleQuantityChange(item.seq, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          className="h-8 w-8 rounded-md border flex items-center justify-center"
                          onClick={() =>
                            handleQuantityChange(item.seq, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveItem(item.seq, item.name)}
                        aria-label={`Remove ${item.name} from cart`}
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
