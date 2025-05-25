'use client';

import { useState } from 'react';
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Search } from 'lucide-react';

// 샘플 문의 데이터
const inquiries = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  productId: 1000 + Math.floor(Math.random() * 50),
  productName: `노트북 모델 ${String.fromCharCode(65 + (i % 26))}${Math.floor(Math.random() * 50) + 1}`,
  customer: `고객${i + 1}`,
  email: `user${i + 1}@example.com`,
  date: `2024-05-${(i % 30) + 1}`,
  title: [
    '배송 관련 문의드립니다',
    '상품 스펙 확인 부탁드려요',
    '재고 확인 가능할까요?',
    '할인 적용 관련 문의',
    '교환/반품 가능한가요?',
  ][i % 5],
  status: ['답변대기', '답변완료'][i % 2],
  isPrivate: Boolean(i % 3),
}));

const InquiriesPage = (): React.JSX.Element => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const itemsPerPage = 10;

  // 필터링된 문의
  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch =
      inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.productName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || inquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // 문의 상세 페이지로 이동
  const handleViewInquiry = (inquiryId: number): void => {
    router.push(`/seller/inquiries/${inquiryId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">상품 문의 관리</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>문의 목록</CardTitle>
          <CardDescription>
            총 {filteredInquiries.length}개의 문의가 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="제목, 고객명, 상품명 검색..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="답변대기">답변대기</SelectItem>
                  <SelectItem value="답변완료">답변완료</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>번호</TableHead>
                    <TableHead>상품명</TableHead>
                    <TableHead>제목</TableHead>
                    <TableHead>작성자</TableHead>
                    <TableHead>작성일</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-right">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInquiries.map(inquiry => (
                    <TableRow key={inquiry.id}>
                      <TableCell className="font-medium">
                        {inquiry.id}
                      </TableCell>
                      <TableCell>
                        <div className="truncate max-w-[150px]">
                          {inquiry.productName}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {inquiry.productId}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-[200px]">
                            {inquiry.title}
                          </span>
                          {inquiry.isPrivate && (
                            <Badge variant="outline" className="text-xs">
                              비공개
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {inquiry.customer}
                        <div className="text-xs text-gray-500">
                          {inquiry.email}
                        </div>
                      </TableCell>
                      <TableCell>{inquiry.date}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            inquiry.status === '답변대기'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }
                        >
                          {inquiry.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant={
                            inquiry.status === '답변대기'
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          className={
                            inquiry.status === '답변대기'
                              ? 'bg-blue-600 hover:bg-blue-700'
                              : ''
                          }
                          onClick={() => handleViewInquiry(inquiry.id)}
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          {inquiry.status === '답변대기'
                            ? '답변하기'
                            : '답변보기'}
                        </Button>
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

export default InquiriesPage;
