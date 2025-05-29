'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product-card';
import { fetchProductsByCondition } from '@/lib/api/product';
import { MainPageProduct } from '@/types/product';
import { useToast } from '@/hooks/use-toast';
import PaginationControl from './pagination-control';

const ProductList = ({ query = '' }: { query?: string }): React.JSX.Element => {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<MainPageProduct[]>([]);
  const pageSize = 9;

  // Get filter parameters from URL
  const category = searchParams.get('category') || '';
  const searchQuery = query || searchParams.get('q') || '';

  const getProducts = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const data = await fetchProductsByCondition({
        search: searchQuery,
        categorySeq: category ? Number(category) : null,
        page: currentPage,
        pageSize,
      });
      setProducts(data.result.products);
      setTotalCount(data.result.totalCount);
    } catch (error) {
      toast({
        title: '상품 조회 실패',
        description: '상품 조회 실패 했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [query, category, currentPage]);

  // Filter and sort products based on URL parameters
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="text-gray-500 text-lg font-medium">
          상품 목록 불러오는 중...
        </span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">상품이 존재하지 않습니다</h3>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.seq} product={product} />
        ))}
      </div>
      <PaginationControl
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;
