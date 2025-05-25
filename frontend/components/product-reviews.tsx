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

type Review = {
  seq: number;
  email: string;
  name: string;
  starRating: number;
  content: string;
  createdAt: string;
};

type ProductReviewsProps = {
  productSeq: number;
};

// Mock reviews data
const mockReviews: Record<number, Review[]> = {
  1: [
    {
      seq: 1,
      email: 'asd@asd.com',
      name: '존안',
      starRating: 5,
      content: '상품 너무 좋습니다.',
      createdAt: '2023-05-20',
    },
    {
      seq: 2,
      email: 'dsa@dsa.com',
      name: '존안하',
      starRating: 5,
      content: '상품 너무 좋습니다.',
      createdAt: '2023-05-20',
    },
    {
      seq: 3,
      email: 'qwe@qwe.com',
      name: '존안마',
      starRating: 4,
      content: '상품 너무 좋습니다.',
      createdAt: '2023-05-20',
    },
  ],
  2: [
    {
      seq: 1,
      email: 'ewq@ewq.com',
      name: '존안바',
      starRating: 4,
      content: '상품 너무 좋습니다.',
      createdAt: '2023-05-20',
    },
    {
      seq: 2,
      email: 'cxz@cxz.com',
      name: '존안',
      starRating: 3,
      content: '상품 너무 좋습니다.',
      createdAt: '2023-05-20',
    },
  ],
  3: [
    {
      seq: 1,
      email: 'vcx@vcx.com',
      name: '존안카',
      starRating: 5,
      content: '상품 너무 좋습니다.',
      createdAt: '2023-05-20',
    },
  ],
};

export const ProductReviews = ({
  productSeq,
}: ProductReviewsProps): React.JSX.Element => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchReviews = async (): Promise<void> => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const productReviews = mockReviews[productSeq] || [];

      // Sort reviews based on selected option
      const sortedReviews = [...productReviews];
      if (sortBy === 'newest') {
        sortedReviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      } else if (sortBy === 'highest') {
        sortedReviews.sort((a, b) => b.starRating - a.starRating);
      } else if (sortBy === 'lowest') {
        sortedReviews.sort((a, b) => a.starRating - b.starRating);
      }

      setReviews(sortedReviews);
      setIsLoading(false);
    };

    fetchReviews();
  }, [productSeq, sortBy]);

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
    </div>
  );
};
