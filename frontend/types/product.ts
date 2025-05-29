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
  totalCount: number;
  sellerProducts: ProductSummary[];
}

export interface ProductImage {
  seq: string;
  productImagePath: string;
  productImageOrder: number;
}

export interface FetchProductResponse {
  seq: number;
  categorySeq: number;
  categoryName: string;
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

export interface MainPageProduct {
  seq: number;
  productName: string;
  categoryName: string;
  processor: string;
  memory: string;
  graphics: string;
  price: number;
  productImagePath: string;
}

export interface FetchMainPageProductsResponse {
  mainPageProducts: MainPageProduct[];
}

export interface FetchProductsResponse {
  totalCount: number;
  products: MainPageProduct[];
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
