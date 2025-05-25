'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  ArrowLeft,
  User,
  Calendar,
  Package,
  MessageSquare,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// 샘플 문의 데이터 (실제로는 API에서 가져올 것)
const getInquiryData = (id: string) => {
  const inquiryId = Number.parseInt(id);
  return {
    id: inquiryId,
    productId: 1000 + Math.floor(Math.random() * 50),
    productName: `노트북 모델 ${String.fromCharCode(65 + (inquiryId % 26))}${Math.floor(Math.random() * 50) + 1}`,
    customer: `고객${inquiryId}`,
    email: `user${inquiryId}@example.com`,
    date: `2024-05-${(inquiryId % 30) + 1}`,
    title: [
      '배송 관련 문의드립니다',
      '상품 스펙 확인 부탁드려요',
      '재고 확인 가능할까요?',
      '할인 적용 관련 문의',
      '교환/반품 가능한가요?',
    ][inquiryId % 5],
    content: [
      '주문한 상품이 언제쯤 배송될지 알 수 있을까요? 급하게 필요해서요.',
      '이 노트북의 램 업그레이드가 가능한지 알고 싶습니다. 그리고 그래픽카드 사양도 자세히 알려주세요.',
      '현재 재고가 있는지 확인 부탁드립니다. 다음 주까지 필요한데 구매 가능할까요?',
      '현재 진행 중인 프로모션이 이 제품에도 적용되나요? 쿠폰과 중복 적용 가능한지도 알려주세요.',
      '수령한 제품에 약간의 흠집이 있어서요. 교환이나 반품이 가능할까요?',
    ][inquiryId % 5],
    status: inquiryId % 2 === 0 ? '답변완료' : '답변대기',
    isPrivate: Boolean(inquiryId % 3),
    answer:
      inquiryId % 2 === 0
        ? [
            '안녕하세요, 고객님. 주문하신 상품은 현재 출고 준비 중이며, 내일 발송될 예정입니다. 배송은 보통 1-2일 소요됩니다.',
            '안녕하세요, 고객님. 해당 모델은 메모리 슬롯이 2개로 최대 64GB까지 업그레이드 가능합니다. 그래픽카드는 NVIDIA GeForce RTX 3060 6GB GDDR6입니다.',
            '안녕하세요, 고객님. 현재 해당 상품은 재고가 있으며, 주문 시 다음 날 바로 발송 가능합니다.',
            '안녕하세요, 고객님. 네, 현재 진행 중인 프로모션은 해당 제품에도 적용되며, 쿠폰과 중복 적용 가능합니다.',
            '안녕하세요, 고객님. 제품 수령 후 7일 이내에는 교환/반품이 가능합니다. 고객센터(1234-5678)로 연락주시면 안내해드리겠습니다.',
          ][inquiryId % 5]
        : '',
    answerDate: inquiryId % 2 === 0 ? `2024-05-${(inquiryId % 30) + 2}` : '',
  };
};

const InquiryDetailPage = ({
  params,
}: {
  params: { id: string };
}): React.JSX.Element => {
  const router = useRouter();
  const [inquiry, setInquiry] = useState<any>(null);
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 문의 데이터 로드
  useEffect(() => {
    // 실제 구현에서는 API 호출
    const inquiryData = getInquiryData(params.id);
    setInquiry(inquiryData);
    setAnswer(inquiryData.answer || '');
    setIsLoading(false);
  }, [params.id]);

  // 답변 제출 처리
  const handleSubmitAnswer = async (): Promise<void> => {
    if (!answer.trim()) {
      toast({
        title: '입력 오류',
        description: '답변 내용을 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // 실제 구현에서는 API 호출
    setTimeout(() => {
      setInquiry((prev: any) => ({
        ...prev,
        answer,
        status: '답변완료',
        answerDate: new Date().toISOString().split('T')[0],
      }));
      setIsSubmitting(false);
      toast({
        title: '답변이 등록되었습니다',
        description: '문의에 대한 답변이 성공적으로 등록되었습니다.',
      });
    }, 800);
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
          <h1 className="text-2xl font-bold">문의 상세</h1>
        </div>
        <Badge
          className={
            inquiry.status === '답변대기'
              ? 'bg-red-100 text-red-800'
              : 'bg-green-100 text-green-800'
          }
        >
          {inquiry.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{inquiry.title}</CardTitle>
                  <CardDescription>문의 번호: #{inquiry.id}</CardDescription>
                </div>
                {inquiry.isPrivate && (
                  <Badge variant="outline" className="ml-2">
                    비공개
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <span className="font-medium">{inquiry.customer}</span>
                    <span className="text-gray-500 ml-2">
                      ({inquiry.email})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{inquiry.date}</span>
                </div>
                <Separator />
                <div className="whitespace-pre-line">{inquiry.content}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>답변</CardTitle>
            </CardHeader>
            <CardContent>
              {inquiry.status === '답변완료' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">관리자</span>
                    <span className="text-gray-500 ml-2">
                      ({inquiry.answerDate})
                    </span>
                  </div>
                  <div className="whitespace-pre-line">{inquiry.answer}</div>
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setInquiry((prev: any) => ({
                          ...prev,
                          status: '답변대기',
                          answer: '',
                          answerDate: '',
                        }))
                      }
                    >
                      답변 수정하기
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Textarea
                    placeholder="문의에 대한 답변을 입력하세요..."
                    className="min-h-[150px]"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={handleSubmitAnswer}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '등록 중...' : '답변 등록하기'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>문의 상품</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">{inquiry.productName}</p>
                  <p className="text-sm text-gray-500">
                    ID: {inquiry.productId}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600"
                    onClick={() =>
                      router.push(`/seller/products/${inquiry.productId}`)
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
              <CardTitle>빠른 답변 템플릿</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  '안녕하세요, 고객님. 문의해주셔서 감사합니다.',
                  '현재 해당 상품은 재고가 있으며, 주문 시 1-2일 내에 발송됩니다.',
                  '해당 제품은 1년 무상 보증이 제공됩니다.',
                  '교환/반품은 제품 수령 후 7일 이내에 가능합니다.',
                  '추가 문의사항이 있으시면 언제든지 문의해주세요.',
                ].map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto py-2 px-3 whitespace-normal text-left"
                    onClick={() =>
                      setAnswer(prev =>
                        prev ? `${prev}\n\n${template}` : template,
                      )
                    }
                    disabled={inquiry.status === '답변완료' || isSubmitting}
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
};

export default InquiryDetailPage;
