import { ApiResponse } from '@/types/api';
import { API_URL } from '../config';
import { FetchProductInquiriesResponse } from '@/types/inquiries';

export const fetchProductInquiries = async (
  productSeq: number,
  page: number,
  pageSize: number,
): Promise<ApiResponse<FetchProductInquiriesResponse>> => {
  const query = new URLSearchParams();
  if (page) query.append('page', page.toString());
  if (pageSize) query.append('pageSize', pageSize.toString());
  const res = await fetch(
    `${API_URL}/api/inquiries/products/${productSeq}?${query.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!res.ok) throw new Error('상품 문의 조회 실패');
  return await res.json();
};
