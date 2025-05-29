import { ApiResponse } from '@/types/api';
import { API_URL } from '../config';
import {
  FetchMainPageProductsResponse,
  FetchProductResponse,
  FetchProductsResponse,
} from '@/types/product';

export const fetchMainPageProducts = async (): Promise<
  ApiResponse<FetchMainPageProductsResponse>
> => {
  const res = await fetch(`${API_URL}/api/main/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const fetchProductsByCondition = async (options: {
  search?: string;
  categorySeq?: number | null;
  page?: number | null;
  pageSize?: number;
}): Promise<ApiResponse<FetchProductsResponse>> => {
  const query = new URLSearchParams();

  if (options.search) query.append('search', options.search);
  if (options.categorySeq)
    query.append('categorySeq', options.categorySeq.toString());
  if (options.page) query.append('page', options.page.toString());
  if (options.pageSize) query.append('pageSize', options.pageSize.toString());

  const res = await fetch(`${API_URL}/api/products?${query.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const fetchProductDetail = async (
  productSeq: number,
): Promise<ApiResponse<FetchProductResponse>> => {
  const res = await fetch(`${API_URL}/api/products/${productSeq}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('상품 상세정보 조회 실패');
  return await res.json();
};
