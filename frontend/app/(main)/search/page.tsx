import { Suspense } from 'react';
import ProductList from '@/components/product-list';
import ProductFilters from '@/components/product-filters';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';

type Props = {
  searchParams: { q?: string };
};

export const metadata: Metadata = {
  title: '상품 검색',
  description: 'Find the perfect laptop for your needs',
};

const SearchPage = ({ searchParams }: Props): React.JSX.Element => {
  const query = searchParams.q || '';

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">검색 결과</h1>
      <p className="text-muted-foreground mb-6">
        {query ? `검색 결과 "${query}"` : '전체 상품'}
      </p>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <aside>
          <ProductFilters />
        </aside>

        <div>
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList query={query} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

const ProductListSkeleton = (): React.JSX.Element => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
    </div>
  );
};

export default SearchPage;
