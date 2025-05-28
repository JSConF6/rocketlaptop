export interface CategoryItem {
  seq: number;
  categoryName: string;
}

export interface FetchCategoriesResponse {
  categories: CategoryItem[];
}
