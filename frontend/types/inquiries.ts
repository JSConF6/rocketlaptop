export interface ProductInquiry {
  seq: number;
  name: string;
  question: string;
  answer: string;
  status: string;
  answerDate: string;
  createdAt: string;
}

export interface FetchProductInquiriesResponse {
  totalProductInquiryCount: number;
  productInquiries: ProductInquiry[];
}
