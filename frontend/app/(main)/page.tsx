import Link from 'next/link';
import { Laptop, Cpu, Battery, Zap, Monitor, Wifi } from 'lucide-react';
import ProductCard from '@/components/product-card';
import Banner from '@/components/banner';
import { CategorySlider } from '@/components/category-slider';

// Mock featured products
const featuredProducts = [
  {
    seq: 1,
    name: 'ProBook X5',
    description: '게이밍 노트북',
    price: 900000,
    image: '/placeholder.svg?height=300&width=300',
    specs: {
      processor: 'Intel Core i7-1165G7',
      memory: '16GB DDR4',
      storage: '512GB SSD',
      display: '14" 4K UHD',
      graphics: 'Intel Iris Xe Graphics',
    },
  },
  {
    seq: 2,
    name: 'GameForce RTX',
    description: '게이밍 노트북',
    price: 1200000,
    image: '/placeholder.svg?height=300&width=300',
    specs: {
      processor: 'AMD Ryzen 9 5900HX',
      memory: '32GB DDR4',
      storage: '1TB NVMe SSD',
      display: '15.6" QHD 165Hz',
      graphics: 'NVIDIA GeForce RTX 3080',
    },
  },
  {
    seq: 3,
    name: 'UltraSlim Air',
    description: '게이밍 노트북',
    price: 700000,
    image: '/placeholder.svg?height=300&width=300',
    specs: {
      processor: 'Intel Core i5-1135G7',
      memory: '8GB LPDDR4X',
      storage: '256GB SSD',
      display: '13.3" FHD',
      graphics: 'Intel Iris Xe Graphics',
    },
  },
  {
    seq: 4,
    name: 'WorkStation Pro',
    description: '게이밍 노트북',
    price: 2000000,
    image: '/placeholder.svg?height=300&width=300',
    specs: {
      processor: 'Intel Core i9-11900K',
      memory: '64GB DDR4',
      storage: '2TB NVMe SSD',
      display: '17" 4K UHD',
      graphics: 'NVIDIA RTX A5000',
    },
  },
];

// Mock categories
const categories = [
  { id: 'All', name: '전체', icon: <Zap className="h-6 w-6" /> },
  { id: 'Samsung', name: 'Samsung', icon: <Zap className="h-6 w-6" /> },
  { id: 'LG', name: 'LG', icon: <Laptop className="h-6 w-6" /> },
  { id: 'Lenovo', name: 'Lenovo', icon: <Cpu className="h-6 w-6" /> },
  {
    id: 'Apple',
    name: 'Apple',
    icon: <Monitor className="h-6 w-6" />,
  },
  { id: 'MSI', name: 'MSI', icon: <Battery className="h-6 w-6" /> },
  { id: 'ASUS', name: 'ASUS', icon: <Wifi className="h-6 w-6" /> },
  { id: 'Dell', name: 'Dell', icon: <Wifi className="h-6 w-6" /> },
  { id: 'HP', name: 'HP', icon: <Wifi className="h-6 w-6" /> },
  { id: 'Razer', name: 'Razer', icon: <Wifi className="h-6 w-6" /> },
  { id: 'HANSUNG', name: '한성', icon: <Wifi className="h-6 w-6" /> },
];

const Home = (): React.JSX.Element => {
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
          {featuredProducts.map(product => (
            <ProductCard key={product.seq} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
