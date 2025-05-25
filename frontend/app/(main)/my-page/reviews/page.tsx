import type { Metadata } from 'next';
import { ReviewsList } from '@/components/my-page/reviews-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '상품 리뷰',
  description: 'Manage your product reviews',
};

const ReviewsPage = (): React.JSX.Element => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">상품 리뷰</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>내가 쓴 리뷰</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewsList />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsPage;
