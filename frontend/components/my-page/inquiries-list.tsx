'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type InquiryStatus = 'WAITING' | 'ANSWERED';

type Inquiry = {
  seq: number;
  productSeq: number;
  productName: string;
  productImage: string;
  title: string;
  question: string;
  isPrivate: boolean;
  status: InquiryStatus;
  answer: string;
  answerDate: string;
  createdAt: string;
};

type InquiriesListProps = {
  status: InquiryStatus | 'ALL';
};

// Mock data
const mockInquiries: Inquiry[] = [
  {
    seq: 1,
    productSeq: 1,
    productName: 'ProBook X5',
    productImage: '/placeholder.svg?height=80&width=80',
    title: '배송문의',
    question: '상품 언제 배송 되나요??',
    createdAt: '2023-05-18',
    isPrivate: false,
    status: 'ANSWERED',
    answer: '오늘 배송 예정 입니다.',
    answerDate: '2023-05-20',
  },
  {
    seq: 2,
    productSeq: 2,
    productName: 'ProBook X5',
    productImage: '/placeholder.svg?height=80&width=80',
    title: '배송문의',
    question: '상품 언제 배송 되나요??',
    createdAt: '2023-05-18',
    isPrivate: true,
    status: 'WAITING',
    answer: '',
    answerDate: '',
  },
  {
    seq: 3,
    productSeq: 3,
    productName: 'ProBook X5',
    productImage: '/placeholder.svg?height=80&width=80',
    title: '배송문의',
    question: '상품 언제 배송 되나요??',
    createdAt: '2023-05-18',
    isPrivate: false,
    status: 'ANSWERED',
    answer: '오늘 배송 예정 입니다.',
    answerDate: '2023-05-20',
  },
];

export const InquiriesList = ({
  status,
}: InquiriesListProps): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const filteredInquiries =
        status === 'ALL'
          ? mockInquiries
          : mockInquiries.filter(inquiry => inquiry.status === status);

      setInquiries(filteredInquiries);
      setIsLoading(false);
    };

    fetchData();
  }, [status]);

  const handleDeleteInquiry = (seq: number): void => {
    // Simulate API call
    setInquiries(inquiries.filter(inquiry => inquiry.seq !== seq));

    toast({
      title: '작성한 문의 삭제',
      description: '작성한 상품 문의를 삭제 했습니다',
    });
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
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">작성한 문의사항이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {inquiries.map(inquiry => (
        <div key={inquiry.seq} className="border rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={inquiry.productImage || '/placeholder.svg'}
                alt={inquiry.productName}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{inquiry.productName}</h4>
                  <div className="flex items-center mt-1">
                    <Badge
                      variant={
                        inquiry.status === 'ANSWERED' ? 'default' : 'outline'
                      }
                    >
                      {inquiry.status === 'ANSWERED'
                        ? '답변완료'
                        : '답변 대기중'}
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-2">
                      Asked on{' '}
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {inquiry.status === 'WAITING' && (
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/my-page/inquiries/edit/${inquiry.seq}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">수정</span>
                      </Link>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteInquiry(inquiry.seq)}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">삭제</span>
                  </Button>
                </div>
              </div>

              <Accordion type="single" collapsible className="mt-2">
                <AccordionItem value="inquiry" className="border-none">
                  <AccordionTrigger className="py-2 text-base font-normal">
                    {inquiry.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {inquiry.answer ? (
                      <div className="bg-muted p-3 rounded-md mt-2">
                        <p className="text-sm mt-1">{inquiry.answer}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(inquiry.answerDate).toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic mt-2">
                        이 문의는 답변 대기 중 입니다.
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
