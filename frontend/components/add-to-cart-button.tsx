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

type Product = {
  seq: number;
  name: string;
  price: number;
  images: string[];
};

const AddToCartButton = ({
  product,
}: {
  product: Product;
}): React.JSX.Element => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState('1');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (): Promise<void> => {
    setIsAddingToCart(true);

    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));

    addToCart({
      seq: product.seq,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
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
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="7">7</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="11">11</SelectItem>
              <SelectItem value="12">12</SelectItem>
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
