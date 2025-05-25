'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product-card';

// Mock products data
const allProducts = [
  {
    seq: 1,
    name: 'ProBook X5',
    description: 'Ultra-thin professional laptop',
    price: 1299.99,
    image: '/placeholder.svg?height=300&width=300',
    specs: {
      processor: 'Intel Core i7-1165G7',
      memory: '16GB DDR4',
      storage: '512GB SSD',
      display: '14" 4K UHD',
      graphics: 'Intel Iris Xe Graphics',
    },
    category: 'business',
    brand: 'ProTech',
  },
  {
    seq: 2,
    name: 'GameForce RTX',
    description: 'Ultimate gaming experience',
    price: 1899.99,
    image: '/placeholder.svg?height=300&width=300',
    specs: {
      processor: 'AMD Ryzen 9 5900HX',
      memory: '32GB DDR4',
      storage: '1TB NVMe SSD',
      display: '15.6" QHD 165Hz',
      graphics: 'NVIDIA GeForce RTX 3080',
    },
    category: 'gaming',
    brand: 'GameForce',
  },
  {
    seq: 3,
    name: 'UltraSlim Air',
    description: 'Lightweight everyday computing',
    price: 899.99,
    image: '/placeholder.svg?height=300&width=300',
    specs: {
      processor: 'Intel Core i5-1135G7',
      memory: '8GB LPDDR4X',
      storage: '256GB SSD',
      display: '13.3" FHD',
      graphics: 'Intel Iris Xe Graphics',
    },
    category: 'ultrabook',
    brand: 'UltraTech',
  },
  {
    seq: 4,
    name: 'WorkStation Pro',
    description: 'For demanding professional tasks',
    price: 2499.99,
    image: '/placeholder.svg?height=300&width=300',
    specs: {
      processor: 'Intel Core i9-11900K',
      memory: '64GB DDR4',
      storage: '2TB NVMe SSD',
      display: '17" 4K UHD',
      graphics: 'NVIDIA RTX A5000',
    },
    category: 'workstation',
    brand: 'ProTech',
  },
  {
    seq: 5,
    name: 'BudgetBook 15',
    description: 'Affordable everyday laptop',
    price: 499.99,
    image: '/placeholder.svg?height=300&width=300',
    specs: {
      processor: 'AMD Ryzen 5 5500U',
      memory: '8GB DDR4',
      storage: '256GB SSD',
      display: '15.6" FHD',
      graphics: 'AMD Radeon Graphics',
    },
    category: 'budget',
    brand: 'ValueTech',
  },
  {
    seq: 6,
    name: 'FlexBook 360',
    description: 'Versatile 2-in-1 convertible',
    price: 1099.99,
    image: '/placeholder.svg?height=300&width=300',
    specs: {
      processor: 'Intel Core i7-1165G7',
      memory: '16GB LPDDR4X',
      storage: '512GB SSD',
      display: '14" FHD Touch',
      graphics: 'Intel Iris Xe Graphics',
    },
    category: '2-in-1',
    brand: 'FlexTech',
  },
  {
    seq: 7,
    name: 'ProBook X7',
    description: 'Premium business ultrabook',
    price: 1599.99,
    image: '/placeholder.svg?height=300&width=300',
    specs: {
      processor: 'Intel Core i7-1185G7',
      memory: '32GB LPDDR4X',
      storage: '1TB SSD',
      display: '14" 4K UHD',
      graphics: 'Intel Iris Xe Graphics',
    },
    category: 'business',
    brand: 'ProTech',
  },
  {
    seq: 8,
    name: 'GameForce GTX',
    description: 'Mid-range gaming laptop',
    price: 1299.99,
    image: '/placeholder.svg?height=300&width=300',
    specs: {
      processor: 'AMD Ryzen 7 5800H',
      memory: '16GB DDR4',
      storage: '512GB NVMe SSD',
      display: '15.6" FHD 144Hz',
      graphics: 'NVIDIA GeForce RTX 3060',
    },
    category: 'gaming',
    brand: 'GameForce',
  },
  {
    seq: 9,
    name: 'UltraSlim Pro',
    description: 'Premium ultraportable',
    price: 1399.99,
    image: '/placeholder.svg?height=300&width=300',
    specs: {
      processor: 'Intel Core i7-1165G7',
      memory: '16GB LPDDR4X',
      storage: '512GB SSD',
      display: '13.4" 3:2 QHD+',
      graphics: 'Intel Iris Xe Graphics',
    },
    category: 'ultrabook',
    brand: 'UltraTech',
  },
];

const ProductList = ({ query = '' }: { query?: string }): React.JSX.Element => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState(allProducts);

  // Get filter parameters from URL
  const category = searchParams.get('category');
  const searchQuery = query || searchParams.get('q') || '';

  // Filter and sort products based on URL parameters
  useEffect(() => {
    let filteredProducts = [...allProducts];

    // Filter by search query
    if (searchQuery) {
      const searchTerms = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product =>
          product.name.toLowerCase().includes(searchTerms) ||
          product.description.toLowerCase().includes(searchTerms) ||
          product.specs?.processor?.toLowerCase().includes(searchTerms) ||
          product.brand.toLowerCase().includes(searchTerms),
      );
    }

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(
        product => product.category === category,
      );
    }

    setProducts(filteredProducts);
  }, [category, searchQuery]);

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">상품이 존재하지 않습니다</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.seq} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
