import { ApiResponse } from '@/types/api';
import { API_URL } from '../config';
import { getCartItemsResponse } from '@/types/cart';

export const insertCartItem = async (
  accessToken: string,
  productSeq: number,
  quantity: number,
  unitPrice: number,
): Promise<ApiResponse<null>> => {
  const res = await fetch(`${API_URL}/api/carts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      productSeq,
      quantity,
      unitPrice,
    }),
  });
  if (!res.ok) throw new Error('장바구니 담기 실패');
  return await res.json();
};

export const fetchCartItems = async (
  accessToken: string,
): Promise<ApiResponse<getCartItemsResponse>> => {
  const res = await fetch(`${API_URL}/api/carts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('장바구니 조회 실패');
  return await res.json();
};

export const deleteCartItem = async (
  accessToken: string,
  cartItemSeq: number,
): Promise<ApiResponse<null>> => {
  const res = await fetch(`${API_URL}/api/carts/${cartItemSeq}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error('장바구니 삭제 실패');
  return await res.json();
};
