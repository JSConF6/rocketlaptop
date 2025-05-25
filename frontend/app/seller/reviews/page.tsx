'use client';

import { useState } from 'react';
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
import { Eye, Search, Star, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
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

// 샘플 리뷰 데이터
const reviews = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  productId: 1000 + Math.floor(Math.random() * 50),
  productName: `노트북 모델 ${String.fromCharCode(65 + (i % 26))}${Math.floor(Math.random() * 50) + 1}`,
  customer: `고객${i + 1}`,
  date: `2024-05-${(i % 30) + 1}`,
  rating: Math.floor(Math.random() * 5) + 1,
  content: [
    '배송이 빠르고 제품 상태가 좋아요!',
    '가성비 좋은 제품입니다. 추천해요.',
    '디자인이 마음에 들고 성능도 좋습니다.',
    '화면이 선명하고 키보드 타이핑감이 좋아요.',
    '배터리 지속시간이 생각보다 짧아요.',
  ][i % 5],
  hasImage: Boolean(i % 3 === 0),
  status: ['표시중', '숨김', '신고됨'][i % 3],
}));

const ReviewsPage = (): React.JSX.Element => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [reviewList, setReviewList] = useState(reviews);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const itemsPerPage = 10;

  // 필터링된 리뷰
  const filteredReviews = reviews.filter(review => {
    const matchesSearch =
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      ratingFilter === 'all' || review.rating === Number.parseInt(ratingFilter);
    const matchesStatus =
      statusFilter === 'all' || review.status === statusFilter;

    return matchesSearch && matchesRating && matchesStatus;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // 별점 렌더링
  const renderStars = (rating: number): React.JSX.Element[] => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  // 상태에 따른 배지 색상
  const getStatusColor = (status: string) => {
    switch (status) {
      case '표시중':
        return 'bg-green-100 text-green-800';
      case '숨김':
        return 'bg-gray-100 text-gray-800';
      case '신고됨':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  // 리뷰 상세 페이지로 이동
  const handleViewReview = (reviewId: number) => {
    router.push(`/seller/reviews/${reviewId}`);
  };

  // 리뷰 삭제 처리
  const handleDeleteReview = async (): Promise<void> => {
    if (reviewToDelete === null) return;

    setIsDeleting(true);

    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setReviewList(prev =>
        prev.filter(review => review.id !== reviewToDelete),
      );
      setIsDeleting(false);
      setReviewToDelete(null);
      toast({
        title: '리뷰가 삭제되었습니다',
        description: '리뷰가 성공적으로 삭제되었습니다.',
      });
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">상품 리뷰 관리</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>리뷰 목록</CardTitle>
          <CardDescription>
            총 {filteredReviews.length}개의 리뷰가 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="내용, 고객명, 상품명 검색..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="별점 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 별점</SelectItem>
                  <SelectItem value="5">5점</SelectItem>
                  <SelectItem value="4">4점</SelectItem>
                  <SelectItem value="3">3점</SelectItem>
                  <SelectItem value="2">2점</SelectItem>
                  <SelectItem value="1">1점</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="표시중">표시중</SelectItem>
                  <SelectItem value="숨김">숨김</SelectItem>
                  <SelectItem value="신고됨">신고됨</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>번호</TableHead>
                    <TableHead>상품명</TableHead>
                    <TableHead>별점</TableHead>
                    <TableHead>내용</TableHead>
                    <TableHead>작성자</TableHead>
                    <TableHead>작성일</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-right">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedReviews.map(review => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">{review.id}</TableCell>
                      <TableCell>
                        <div className="truncate max-w-[150px]">
                          {review.productName}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {review.productId}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex">{renderStars(review.rating)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-[200px]">
                            {review.content}
                          </span>
                          {review.hasImage && (
                            <Badge variant="outline" className="text-xs">
                              사진
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{review.customer}</TableCell>
                      <TableCell>{review.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(review.status)}>
                          {review.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewReview(review.id)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">상세보기</span>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setReviewToDelete(review.id)}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                                <span className="sr-only">삭제</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>리뷰 삭제</AlertDialogTitle>
                                <AlertDialogDescription>
                                  이 리뷰를 삭제하시겠습니까? 이 작업은 되돌릴
                                  수 없습니다.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>취소</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDeleteReview}
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

export default ReviewsPage;
