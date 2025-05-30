export interface CartItem {
  seq: number;
  productName: string;
  productImagePath: string;
  categoryName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface getCartItemsResponse {
  cartItems: CartItem[];
}
