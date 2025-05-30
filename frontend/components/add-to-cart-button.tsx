'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FetchProductResponse } from '@/types/product';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { insertCartItem } from '@/lib/api/cart';

const AddToCartButton = ({
  productDetail,
}: {
  productDetail: FetchProductResponse;
}): React.JSX.Element => {
  const router = useRouter();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState('1');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { data: session } = useSession();

  const handleAddToCart = async (): Promise<void> => {
    if (!session || !session.accessToken) {
      toast({
        title: '장바구니 담기 오류',
        description: '로그인 후 장바구니에 담을 수 있습니다.',
        variant: 'destructive',
      });
      setTimeout(() => {
        router.push('/login');
      }, 100);
      return;
    }

    try {
      setIsAddingToCart(true);
      await insertCartItem(
        session.accessToken,
        productDetail.seq,
        Number(quantity),
        productDetail.price,
      );
      toast({
        title: '장바구니 담기',
        description: `${productDetail.productName} 상품이 장바구니에 담겼습니다.`,
      });
    } catch (err) {
      toast({
        title: '장바구니 담기 실패',
        description: `장바구니 담기 실패`,
        variant: 'destructive',
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-24">
          <Select value={quantity} onValueChange={setQuantity}>
            <SelectTrigger>
              <SelectValue placeholder="Quantity" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: productDetail.quantity }, (_, i) => {
                const value = (i + 1).toString();
                return (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleAddToCart}
          className="flex-1"
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              장바구니 담는중...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              장바구니 담기
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
export default AddToCartButton;
