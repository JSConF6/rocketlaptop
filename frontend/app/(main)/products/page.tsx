import { Suspense } from 'react';
import ProductList from '@/components/product-list';
import ProductFilters from '@/components/product-filters';
import { Skeleton } from '@/components/ui/skeleton';

const ProductsPage = (): React.JSX.Element => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">All Laptops</h1>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <aside>
          <ProductFilters />
        </aside>

        <div>
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList />
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

export default ProductsPage;
