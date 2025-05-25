'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Edit, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type Review = {
  seq: number;
  productSeq: number;
  productName: string;
  productImage: string;
  starRating: number;
  content: string;
  createdAt: string;
};

// Mock data
const mockReviews: Review[] = [
  {
    seq: 1,
    productSeq: 1,
    productName: 'ProBook X5',
    productImage: '/placeholder.svg?height=80&width=80',
    starRating: 5,
    content: '너무 만족하는 제품입니다.',
    createdAt: '2023-05-20',
  },
  {
    seq: 2,
    productSeq: 2,
    productName: 'GameForce RTX',
    productImage: '/placeholder.svg?height=80&width=80',
    starRating: 4,
    content: '너무 만족하는 제품입니다.',
    createdAt: '2023-05-15',
  },
  {
    seq: 3,
    productSeq: 3,
    productName: 'UltraSlim Air',
    productImage: '/placeholder.svg?height=80&width=80',
    starRating: 3,
    content: '너무 만족하는 제품입니다.',
    createdAt: '2023-05-10',
  },
  {
    seq: 4,
    productSeq: 4,
    productName: 'ProBook X7',
    productImage: '/placeholder.svg?height=80&width=80',
    starRating: 5,
    content: '너무 만족하는 제품입니다.',
    createdAt: '2023-04-25',
  },
  {
    seq: 5,
    productSeq: 5,
    productName: 'BudgetBook 15',
    productImage: '/placeholder.svg?height=80&width=80',
    starRating: 4,
    content: '너무 만족하는 제품입니다.',
    createdAt: '2023-04-20',
  },
];

export const ReviewsList = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setReviews(mockReviews);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleDeleteReview = (seq: number): void => {
    // Simulate API call
    setReviews(reviews.filter(review => review.seq !== seq));

    toast({
      title: '리뷰 삭제',
      description: '작성한 리뷰가 삭제 되었습니다.',
    });
  };

  const renderStars = (rating: number): React.JSX.Element[] => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ));
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-start space-x-4">
              <Skeleton className="h-16 w-16 rounded-md" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
                <div className="flex space-x-1">
                  {Array(5)
                    .fill(0)
                    .map((_, j) => (
                      <Skeleton key={j} className="h-4 w-4 rounded-full" />
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">작성한 리뷰가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map(review => (
        <div key={review.seq} className="border rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={review.productImage || '/placeholder.svg'}
                alt={review.productName}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{review.productName}</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex mr-2">
                      {renderStars(review.starRating)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/my-page/reviews/edit/${review.seq}`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">수정</span>
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteReview(review.seq)}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">삭제</span>
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-1">
                {review.content}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
