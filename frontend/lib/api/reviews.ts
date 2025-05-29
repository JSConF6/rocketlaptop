import { ApiResponse } from '@/types/api';
import { FetchProductReviewsResponse } from '@/types/reviews';
import { API_URL } from '../config';

export const fetchProductReviews = async (
  productSeq: number,
  sortBy: string,
  page: number,
  pageSize: number,
): Promise<ApiResponse<FetchProductReviewsResponse>> => {
  const query = new URLSearchParams();
  if (sortBy) query.append('sortBy', sortBy);
  if (page) query.append('page', page.toString());
  if (pageSize) query.append('pageSize', pageSize.toString());
  const res = await fetch(
    `${API_URL}/api/reviews/products/${productSeq}?${query.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!res.ok) throw new Error('상품 리뷰 조회 실패');
  return await res.json();
};
