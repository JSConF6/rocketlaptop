'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Star,
  User,
  Calendar,
  Package,
  MessageSquare,
} from 'lucide-react';
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

// 샘플 리뷰 데이터 (실제로는 API에서 가져올 것)
const getReviewData = (id: string) => {
  const reviewId = Number.parseInt(id);
  return {
    id: reviewId,
    productId: 1000 + Math.floor(Math.random() * 50),
    productName: `노트북 모델 ${String.fromCharCode(65 + (reviewId % 26))}${Math.floor(Math.random() * 50) + 1}`,
    customer: `고객${reviewId}`,
    email: `user${reviewId}@example.com`,
    date: `2024-05-${(reviewId % 30) + 1}`,
    rating: Math.floor(Math.random() * 5) + 1,
    title: [
      '가성비 최고의 노트북!',
      '디자인은 좋지만 성능이 아쉬워요',
      '배송이 빠르고 제품 상태가 좋아요',
      '화면이 선명하고 키보드 타이핑감이 좋아요',
      '배터리 지속시간이 생각보다 짧아요',
    ][reviewId % 5],
    content: [
      '가격 대비 성능이 정말 좋습니다. 게임도 잘 돌아가고 작업용으로도 충분합니다. 배터리도 오래가고 발열도 적어서 만족스럽습니다.',
      '디자인은 정말 마음에 들지만, 성능이 생각보다 아쉬워요. 가끔 멀티태스킹할 때 버벅거림이 있습니다. 그래도 일반적인 사용에는 문제 없어요.',
      '주문하고 이틀만에 배송 왔어요. 포장도 꼼꼼하게 잘 되어있고 제품 상태도 완벽합니다. 첫 부팅부터 설정까지 모두 순조롭게 진행됐습니다.',
      '화면 해상도가 높아서 영상 시청이나 문서 작업할 때 눈이 편합니다. 키보드 타이핑감도 좋아서 오래 작업해도 피로감이 적어요.',
      '배터리가 광고에는 10시간이라고 했는데 실제로는 5-6시간 정도밖에 안 가네요. 그것 말고는 다 만족스럽습니다.',
    ][reviewId % 5],
    hasImage: Boolean(reviewId % 3 === 0),
    images:
      reviewId % 3 === 0
        ? Array.from(
            { length: (reviewId % 3) + 1 },
            (_, i) =>
              `/placeholder.svg?height=200&width=200&text=Review${i + 1}`,
          )
        : [],
    status: ['표시중', '숨김', '신고됨'][reviewId % 3],
    orderNumber: `ORD-${2024000 + reviewId}`,
    orderDate: `2024-05-${(reviewId % 28) + 1}`,
    replyContent:
      reviewId % 4 === 0
        ? '안녕하세요, 고객님. 소중한 리뷰 감사합니다. 말씀해주신 내용을 참고하여 더 나은 제품과 서비스를 제공하도록 노력하겠습니다.'
        : '',
    replyDate: reviewId % 4 === 0 ? `2024-05-${(reviewId % 28) + 2}` : '',
  };
};

export default function ReviewDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [review, setReview] = useState<any>(null);
  const [replyContent, setReplyContent] = useState('');
  const [reviewStatus, setReviewStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 리뷰 데이터 로드
  useEffect(() => {
    // 실제 구현에서는 API 호출
    const reviewData = getReviewData(params.id);
    setReview(reviewData);
    setReplyContent(reviewData.replyContent || '');
    setReviewStatus(reviewData.status);
    setIsLoading(false);
  }, [params.id]);

  // 별점 렌더링
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  // 답글 제출 처리
  const handleSubmitReply = async () => {
    if (!replyContent.trim()) {
      toast({
        title: '입력 오류',
        description: '답글 내용을 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setReview((prev: any) => ({
        ...prev,
        replyContent,
        replyDate: new Date().toISOString().split('T')[0],
      }));
      setIsSubmitting(false);
      toast({
        title: '답글이 등록되었습니다',
        description: '리뷰에 대한 답글이 성공적으로 등록되었습니다.',
      });
    }, 800);
  };

  // 상태 변경 처리
  const handleStatusChange = (status: string) => {
    setIsSubmitting(true);

    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setReviewStatus(status);
      setReview((prev: any) => ({ ...prev, status }));
      setIsSubmitting(false);
      toast({
        title: '리뷰 상태가 변경되었습니다',
        description: `리뷰 상태가 '${status}'(으)로 변경되었습니다.`,
      });
    }, 800);
  };

  // 리뷰 삭제 처리
  const handleDeleteReview = async () => {
    setIsDeleting(true);

    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setIsDeleting(false);
      toast({
        title: '리뷰가 삭제되었습니다',
        description: '리뷰가 성공적으로 삭제되었습니다.',
      });
      router.push('/seller/reviews');
    }, 1000);
  };

  if (isLoading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">리뷰 상세</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={
              reviewStatus === '표시중'
                ? 'bg-green-100 text-green-800'
                : reviewStatus === '숨김'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-red-100 text-red-800'
            }
          >
            {reviewStatus}
          </Badge>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                삭제
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>리뷰 삭제</AlertDialogTitle>
                <AlertDialogDescription>
                  이 리뷰를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{review.title}</CardTitle>
                  <CardDescription>리뷰 번호: #{review.id}</CardDescription>
                </div>
                <div className="flex">{renderStars(review.rating)}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <span className="font-medium">{review.customer}</span>
                    <span className="text-gray-500 ml-2">({review.email})</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{review.date}</span>
                </div>
                <Separator />
                <div className="whitespace-pre-line">{review.content}</div>

                {review.hasImage && review.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">첨부 이미지</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {review.images.map((image: string, index: number) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-md overflow-hidden border"
                        >
                          <Image
                            src={image || '/placeholder.svg'}
                            alt={`Review image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>답글</CardTitle>
            </CardHeader>
            <CardContent>
              {review.replyContent ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">관리자</span>
                    <span className="text-gray-500 ml-2">
                      ({review.replyDate})
                    </span>
                  </div>
                  <div className="whitespace-pre-line">
                    {review.replyContent}
                  </div>
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setReview((prev: any) => ({
                          ...prev,
                          replyContent: '',
                          replyDate: '',
                        }))
                      }
                    >
                      답글 수정하기
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Textarea
                    placeholder="리뷰에 대한 답글을 입력하세요..."
                    className="min-h-[150px]"
                    value={replyContent}
                    onChange={e => setReplyContent(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleSubmitReply}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '등록 중...' : '답글 등록하기'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>리뷰 상품</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">{review.productName}</p>
                  <p className="text-sm text-gray-500">
                    ID: {review.productId}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600"
                    onClick={() =>
                      router.push(`/seller/products/${review.productId}`)
                    }
                  >
                    상품 상세보기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>주문 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">주문번호</span>
                  <span>{review.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">주문일자</span>
                  <span>{review.orderDate}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() =>
                    router.push(
                      `/seller/orders/${review.orderNumber.replace('ORD-', '')}`,
                    )
                  }
                >
                  주문 상세보기
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>리뷰 관리</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  리뷰 상태
                </label>
                <Select
                  value={reviewStatus}
                  onValueChange={handleStatusChange}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="표시중">표시중</SelectItem>
                    <SelectItem value="숨김">숨김</SelectItem>
                    <SelectItem value="신고됨">신고됨</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    router.push(
                      `/seller/users/${review.customer.replace('고객', '')}`,
                    )
                  }
                >
                  작성자 정보 보기
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>빠른 답글 템플릿</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  '안녕하세요, 고객님. 소중한 리뷰 감사합니다.',
                  '말씀해주신 내용을 참고하여 더 나은 제품과 서비스를 제공하도록 노력하겠습니다.',
                  '불편을 드려 죄송합니다. 문제 해결을 위해 고객센터로 연락 부탁드립니다.',
                  '긍정적인 리뷰 감사합니다. 앞으로도 좋은 제품으로 보답하겠습니다.',
                  '고객님의 소중한 의견 감사합니다. 개선을 위해 노력하겠습니다.',
                ].map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto py-2 px-3 whitespace-normal text-left"
                    onClick={() =>
                      setReplyContent(prev =>
                        prev ? `${prev}\n\n${template}` : template,
                      )
                    }
                    disabled={review.replyContent !== '' || isSubmitting}
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
