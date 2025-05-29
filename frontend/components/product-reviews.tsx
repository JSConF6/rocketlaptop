'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchProductReviews } from '@/lib/api/reviews';
import { useToast } from '@/hooks/use-toast';
import { ProductReview } from '@/types/reviews';
import PaginationControl from './pagination-control';

type ProductReviewsProps = {
  productSeq: number;
};

export const ProductReviews = ({
  productSeq,
}: ProductReviewsProps): React.JSX.Element => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const pageSize = 5;

  useEffect(() => {
    const getProductReviews = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProductReviews(
          productSeq,
          sortBy,
          currentPage,
          pageSize,
        );
        setTotalCount(data.result.totalProductReviewCount);
        setReviews(data.result.productReviews);
      } catch (err) {
        toast({
          title: '상품 리뷰 조회 실패',
          description: '상품 리뷰 조회 실패',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    getProductReviews();
  }, [productSeq, sortBy, currentPage]);

  const renderStars = (rating: number): React.JSX.Element[] => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'review-star-filled' : 'review-star-empty'}`}
        />
      ));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-8 w-32" />
        </div>
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, j) => (
                    <Skeleton key={j} className="h-4 w-4" />
                  ))}
              </div>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-medium">작성된 리뷰가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">최신순</SelectItem>
              <SelectItem value="highest">별점 높은순</SelectItem>
              <SelectItem value="lowest">별점 낮은순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.seq} className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <div>
                <p className="font-medium">{review.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex mb-2">{renderStars(review.starRating)}</div>

            <p className="text-sm text-muted-foreground mb-3">
              {review.content}
            </p>
          </div>
        ))}
      </div>
      <PaginationControl
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
