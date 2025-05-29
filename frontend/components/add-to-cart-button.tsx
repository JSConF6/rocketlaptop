'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '@/components/cart-provider';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FetchProductResponse } from '@/types/product';

type Product = {
  seq: number;
  name: string;
  price: number;
  images: string[];
};

const AddToCartButton = ({
  productDetail,
}: {
  productDetail: FetchProductResponse;
}): React.JSX.Element => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState('1');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (): Promise<void> => {
    setIsAddingToCart(true);

    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));

    addToCart({
      seq: productDetail.seq,
      name: productDetail.productName,
      price: productDetail.price,
      image: productDetail.productImages[0].productImagePath,
    });

    toast({
      title: 'Added to cart',
      description: `${productDetail.productName} has been added to your cart.`,
    });

    setIsAddingToCart(false);
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
