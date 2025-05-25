'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// 샘플 상품 데이터
const products = Array.from({ length: 50 }, (_, i) => ({
  id: 1000 + i,
  name: `노트북 모델 ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
  category: ['게이밍', '사무용', '그래픽작업용', '학생용', '2-in-1'][i % 5],
  price: Math.floor(800000 + Math.random() * 2000000),
  stock: Math.floor(Math.random() * 50),
  status: ['판매중', '품절', '판매중지', '입고예정'][i % 4],
}));

const ProductsPage = (): React.JSX.Element => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productList, setProductList] = useState(products);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const itemsPerPage = 10;

  // 필터링된 상품
  const filteredProducts = productList.filter(product => {
    const matchesSearch =
      product.id.toString().includes(searchTerm) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // 상태에 따른 배지 색상
  const getStatusColor = (status: string) => {
    switch (status) {
      case '판매중':
        return 'bg-green-100 text-green-800';
      case '품절':
        return 'bg-red-100 text-red-800';
      case '판매중지':
        return 'bg-gray-100 text-gray-800';
      case '입고예정':
        return 'bg-blue-100 text-blue-800';
      default:
        return '';
    }
  };

  // 상품 수정 페이지로 이동
  const handleEditProduct = (productId: number): void => {
    router.push(`/seller/products/${productId}`);
  };

  // 상품 삭제 처리
  const handleDeleteProduct = async (): Promise<void> => {
    if (productToDelete === null) return;

    setIsDeleting(true);

    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setProductList(prev =>
        prev.filter(product => product.id !== productToDelete),
      );
      setIsDeleting(false);
      setProductToDelete(null);
      toast({
        title: '상품이 삭제되었습니다',
        description: '상품이 성공적으로 삭제되었습니다.',
      });
    }, 800);
  };

  // 새 상품 등록 페이지로 이동
  const handleAddProduct = (): void => {
    router.push('/seller/products/new');
  };

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
            총 {filteredProducts.length}개의 상품이 있습니다.
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
                  <SelectItem value="all">모든 카테고리</SelectItem>
                  <SelectItem value="게이밍">게이밍</SelectItem>
                  <SelectItem value="사무용">사무용</SelectItem>
                  <SelectItem value="그래픽작업용">그래픽작업용</SelectItem>
                  <SelectItem value="학생용">학생용</SelectItem>
                  <SelectItem value="2-in-1">2-in-1</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="판매중">판매중</SelectItem>
                  <SelectItem value="품절">품절</SelectItem>
                  <SelectItem value="판매중지">판매중지</SelectItem>
                  <SelectItem value="입고예정">입고예정</SelectItem>
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
                  {paginatedProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.id}
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-md bg-gray-100 relative overflow-hidden">
                          <Image
                            src={`/placeholder.svg?height=40&width=40&text=${product.id}`}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span>{product.name}</span>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₩{product.price.toLocaleString()}</TableCell>
                      <TableCell>{product.stock}개</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">수정</span>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setProductToDelete(product.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                                <span className="sr-only">삭제</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>상품 삭제</AlertDialogTitle>
                                <AlertDialogDescription>
                                  정말로 이 상품을 삭제하시겠습니까? 이 작업은
                                  되돌릴 수 없습니다.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>취소</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDeleteProduct}
                                  disabled={isDeleting}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  {isDeleting ? '삭제 중...' : '삭제'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={
                      currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum =
                    currentPage <= 3
                      ? i + 1
                      : currentPage >= totalPages - 2
                        ? totalPages - 4 + i
                        : currentPage - 2 + i;

                  if (pageNum <= 0 || pageNum > totalPages) return null;

                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        isActive={currentPage === pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(p => Math.min(totalPages, p + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsPage;
