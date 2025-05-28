export interface ProductSummary {
  seq: number;
  productName: string;
  categoryName: string;
  price: number;
  quantity: number;
  status: string;
  productImagePath: string;
}

export interface FetchSellerProductsResponse {
  lastSeq: number | null;
  totalCount: number;
  sellerProducts: ProductSummary[];
}

export interface ProductImage {
  seq: number;
  productImagePath: string;
  productImageOrder: number;
}

export interface FetchSellerProductResponse {
  seq: number;
  categorySeq: number;
  productName: string;
  price: number;
  status: string;
  quantity: number;
  processor: string;
  memory: string;
  storage: string;
  graphics: string;
  display: string;
  battery: string;
  weight: string;
  os: string;
  productImages: ProductImage[];
}

export interface CreateSellerProductResponse {
  productSeq: number;
}

export interface UpdateSellerProductResponse {
  productSeq: number;
}

export type ProductFormData = {
  [key: string]: string;
};
