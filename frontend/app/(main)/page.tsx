import Link from 'next/link';
import Banner from '@/components/banner';
import { CategorySlider } from '@/components/category-slider';
import { fetchCategories } from '@/lib/api/category';
import { fetchMainPageProducts } from '@/lib/api/product';
import ProductCard from '@/components/product-card';

const Home = async (): Promise<React.JSX.Element> => {
  const [categoriesResponse, mainPageProductsResponse] = await Promise.all([
    fetchCategories(),
    fetchMainPageProducts(),
  ]);
  const categories = categoriesResponse.result.categories;
  const mainPageProducts = mainPageProductsResponse.result.mainPageProducts;

  return (
    <div className="flex flex-col min-h-screen">
      <Banner />

      <section className="container py-8 md:py-12">
        <h2 className="text-2xl font-bold mb-6 ps-[30px]">카테고리</h2>
        <CategorySlider categories={categories} />
      </section>

      <section className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-6">
          <h2 className="text-2xl font-bold tracking-tight">새로운 노트북</h2>
          <Link href="/products" className="text-primary hover:underline">
            더보기
          </Link>
        </div>
        <div className="product-grid">
          {mainPageProducts.map(mainPageProduct => (
            <ProductCard key={mainPageProduct.seq} product={mainPageProduct} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
