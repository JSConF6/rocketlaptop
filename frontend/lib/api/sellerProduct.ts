import { ApiResponse } from '@/types/api';
import { API_URL } from '../config';
import {
  CreateSellerProductResponse,
  FetchSellerProductResponse,
  FetchSellerProductsResponse,
  UpdateSellerProductResponse,
} from '@/types/product';

export const fetchSellerProductsByCondition = async (
  accessToken: string,
  options: {
    search?: string;
    status?: string | null;
    categorySeq?: number | null;
    page?: number | null;
    pageSize?: number;
  },
): Promise<ApiResponse<FetchSellerProductsResponse>> => {
  const query = new URLSearchParams();

  if (options.search) query.append('search', options.search);
  if (options.status) query.append('status', options.status);
  if (options.categorySeq)
    query.append('categorySeq', options.categorySeq.toString());
  if (options.page) query.append('page', options.page.toString());
  if (options.pageSize) query.append('pageSize', options.pageSize.toString());

  const res = await fetch(
    `${API_URL}/api/seller/products?${query.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return await res.json();
};

export const fetchSellerProduct = async (
  accessToken: string,
  productSeq: number,
): Promise<ApiResponse<FetchSellerProductResponse>> => {
  const res = await fetch(`${API_URL}/api/seller/products/${productSeq}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await res.json();
};

export const createSellerProduct = async (
  accessToken: string,
  productFormData: FormData,
): Promise<ApiResponse<CreateSellerProductResponse>> => {
  const res = await fetch(`${API_URL}/api/seller/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: productFormData,
  });
  return await res.json();
};

export const updateSellerProduct = async (
  accessToken: string,
  seq: string,
  updateProductFormData: FormData,
): Promise<ApiResponse<UpdateSellerProductResponse>> => {
  const res = await fetch(`${API_URL}/api/seller/products/${seq}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: updateProductFormData,
  });
  if (!res.ok) throw new Error('상품 수정 실패');
  return await res.json();
};

export const deleteSellerProduct = async (
  accessToken: string,
  productSeq: number,
): Promise<ApiResponse<null>> => {
  const res = await fetch(`${API_URL}/api/seller/products/${productSeq}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await res.json();
};
