export interface ProductReview {
  seq: number;
  productSeq: number;
  memberSeq: number;
  name: string;
  content: string;
  starRating: number;
  createdAt: string;
}

export interface FetchProductReviewsResponse {
  totalProductReviewCount: number;
  productReviews: ProductReview[];
}
