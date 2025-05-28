import { ApiResponse } from '@/types/api';
import { API_URL } from '../config';
import { FetchCategoriesResponse } from '@/types/category';

export const fetchCategories = async (): Promise<
  ApiResponse<FetchCategoriesResponse>
> => {
  const res = await fetch(`${API_URL}/api/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};
