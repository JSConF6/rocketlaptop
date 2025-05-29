import { Suspense } from 'react';
import ProductList from '@/components/product-list';
import ProductFilters from '@/components/product-filters';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';
import { fetchCategories } from '@/lib/api/category';

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export const metadata: Metadata = {
  title: '상품 검색',
  description: 'Find the perfect laptop for your needs',
};

const SearchPage = async ({
  searchParams,
}: Props): Promise<React.JSX.Element> => {
  const { q, category } = await searchParams;

  const [categoriesResponse] = await Promise.all([fetchCategories()]);
  const categories = categoriesResponse.result.categories;
  const categoryName = category
    ? categories.find(c => c.seq.toString() === category)?.categoryName
    : '';

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">검색 결과</h1>
      <div className="flex flex-col text-muted-foreground mb-6 space-y-2">
        {q && <span>검색결과 : {q}</span>}
        {categoryName && <span>카테고리 : {categoryName}</span>}
        {!q && !category && <span>전체 상품을 확인해보세요</span>}
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <aside>
          <ProductFilters categories={categories} />
        </aside>

        <div>
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList query={q} />
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
