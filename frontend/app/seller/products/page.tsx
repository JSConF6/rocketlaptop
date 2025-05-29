'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Plus, Search } from 'lucide-react';

import {
  deleteSellerProduct,
  fetchSellerProductsByCondition,
} from '@/lib/api/sellerProduct';
import { useSession } from 'next-auth/react';
import { ProductSummary } from '@/types/product';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchCategories } from '@/lib/api/category';
import { CategoryItem } from '@/types/category';
import PaginationControl from '@/components/pagination-control';
import ProductTableRow from '@/components/product-table-row';
import { useToast } from '@/hooks/use-toast';

const ProductsPage = (): React.JSX.Element => {
  const { toast } = useToast();
  const router = useRouter();
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [productList, setProductList] = useState<ProductSummary[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const pageSize = 10;

  const getSellerProducts = useCallback(async (): Promise<void> => {
    if (status !== 'authenticated' || !session?.accessToken) return;

    try {
      setIsLoading(true);
      const data = await fetchSellerProductsByCondition(session.accessToken, {
        search: debouncedSearch,
        status: statusFilter !== 'ALL' ? statusFilter : null,
        categorySeq: categoryFilter !== 'ALL' ? Number(categoryFilter) : null,
        page: currentPage,
        pageSize,
      });
      setProductList(data.result.sellerProducts);
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
  }, [
    session,
    status,
    debouncedSearch,
    statusFilter,
    categoryFilter,
    currentPage,
  ]);

  useEffect(() => {
    const getCategories = async (): Promise<void> => {
      try {
        const data = await fetchCategories();
        setCategories(data.result.categories);
      } catch (error) {
        toast({
          title: '카테고리 조회 실패',
          description: '카테고리 조회 실패 했습니다.',
          variant: 'destructive',
        });
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter, categoryFilter]);

  useEffect(() => {
    getSellerProducts();
  }, [getSellerProducts]);

  // 상품 수정 페이지로 이동
  const handleEditProduct = (productSeq: number): void => {
    router.push(`/seller/products/${productSeq}`);
  };

  // 상품 삭제 처리
  const handleDeleteProduct = async (productSeq: number): Promise<void> => {
    if (status !== 'authenticated' || !session?.accessToken) return;

    if (session?.accessToken) {
      setIsDeleting(true);

      try {
        await deleteSellerProduct(session.accessToken, productSeq);
        const expectedTotal = totalCount - 1;
        const lastPage = Math.ceil(expectedTotal / pageSize);
        if (currentPage > lastPage) {
          setCurrentPage(lastPage || 1);
        } else {
          getSellerProducts();
        }
        setIsDeleting(false);
        toast({
          title: '상품 삭제 완료',
          description: '상품이 정상적으로 삭제되었습니다.',
        });
      } catch (err) {
        toast({
          title: '상품 삭제 실패',
          description: '상품 삭제 실패 했습니다.',
          variant: 'destructive',
        });
        setIsDeleting(false);
      }
    }
  };

  // 새 상품 등록 페이지로 이동
  const handleAddProduct = (): void => {
    router.push('/seller/products/new');
  };

  if (status == 'loading' || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="text-gray-500 text-lg font-medium">
          판매자 상품 목록 불러오는 중...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">상품 관리</h1>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleAddProduct}
        >
          <Plus className="mr-2 h-4 w-4" />
          상품 등록
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>상품 목록</CardTitle>
          <CardDescription>
            총 {totalCount}개의 상품이 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="상품번호, 상품명 검색..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="카테고리 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">모든 카테고리</SelectItem>
                  {categories.map(category => (
                    <SelectItem
                      key={category.seq}
                      value={category.seq.toString()}
                    >
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">모든 상태</SelectItem>
                  <SelectItem value="ON_SALE">판매중</SelectItem>
                  <SelectItem value="SOLD_OUT">품절</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>상품번호</TableHead>
                    <TableHead>상품명</TableHead>
                    <TableHead>카테고리</TableHead>
                    <TableHead>가격</TableHead>
                    <TableHead>재고</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-right">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productList.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-10 text-gray-500"
                      >
                        등록된 상품이 없습니다.
                      </TableCell>
                    </TableRow>
                  ) : (
                    productList.map(product => (
                      <ProductTableRow
                        key={product.seq}
                        product={product}
                        isDeleting={isDeleting}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                      />
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <PaginationControl
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsPage;
