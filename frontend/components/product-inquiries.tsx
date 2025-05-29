'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useSession } from 'next-auth/react';
import { fetchProductInquiries } from '@/lib/api/inquiries';
import { ProductInquiry } from '@/types/inquiries';
import PaginationControl from './pagination-control';

type Inquiry = {
  seq: number;
  productSeq: number;
  productName: string;
  productImage: string;
  name: string;
  title: string;
  question: string;
  answer: string;
  answerDate: string;
  createdAt: string;
};

type ProductInquiriesProps = {
  productSeq: number;
};

// Mock inquiries data
const mockInquiries: Record<string, Inquiry[]> = {
  1: [
    {
      seq: 1,
      productSeq: 1,
      productName: 'ProBook X5',
      productImage: '/placeholder.svg?height=80&width=80',
      name: '존안',
      title: '배송문의',
      question: '상품 언제 배송 되나요??',
      createdAt: '2023-05-18',
      answer: '오늘 배송 예정 입니다.',
      answerDate: '2023-05-20',
    },
    {
      seq: 2,
      productSeq: 2,
      productName: 'ProBook X5',
      productImage: '/placeholder.svg?height=80&width=80',
      name: '존안바',
      title: '배송문의',
      question: '상품 언제 배송 되나요??',
      createdAt: '2023-05-18',
      answer: '',
      answerDate: '',
    },
    {
      seq: 3,
      productSeq: 3,
      productName: 'ProBook X5',
      productImage: '/placeholder.svg?height=80&width=80',
      name: '존안마',
      title: '배송문의',
      question: '상품 언제 배송 되나요??',
      createdAt: '2023-05-18',
      answer: '오늘 배송 예정 입니다.',
      answerDate: '2023-05-20',
    },
  ],
  2: [
    {
      seq: 1,
      productSeq: 1,
      productName: 'ProBook X5',
      productImage: '/placeholder.svg?height=80&width=80',
      name: '존안하',
      title: '배송문의',
      question: '상품 언제 배송 되나요??',
      createdAt: '2023-05-18',
      answer: '오늘 배송 예정 입니다.',
      answerDate: '2023-05-20',
    },
    {
      seq: 2,
      productSeq: 2,
      productName: 'ProBook X5',
      productImage: '/placeholder.svg?height=80&width=80',
      name: '존안라',
      title: '배송문의',
      question: '상품 언제 배송 되나요??',
      createdAt: '2023-05-18',
      answer: '',
      answerDate: '',
    },
  ],
};

export const ProductInquiries = ({
  productSeq,
}: ProductInquiriesProps): React.JSX.Element => {
  const [inquiries, setInquiries] = useState<ProductInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const { toast } = useToast();
  const { data: session } = useSession();

  useEffect(() => {
    const getProductInquiries = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProductInquiries(
          productSeq,
          currentPage,
          pageSize,
        );
        setTotalCount(data.result.totalProductInquiryCount);
        setInquiries(data.result.productInquiries);
      } catch (err) {
        toast({
          title: '상품 문의 조회 실패',
          description: '상품 문의 조회 실패',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    getProductInquiries();
  }, [productSeq, currentPage]);

  const handleSubmitQuestion = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    console.log('handleSubmitQuestion');

    // if (!newQuestion.trim()) {
    //   toast({
    //     title: 'Empty question',
    //     description: 'Please enter your question',
    //     variant: 'destructive',
    //   });
    //   return;
    // }

    // setIsSubmitting(true);

    // // Simulate API call
    // await new Promise(resolve => setTimeout(resolve, 1500));

    // toast({
    //   title: 'Question submitted',
    //   description: 'Your question has been submitted and will be answered soon',
    // });

    // // Add new question to the list (in a real app, this would come from the server)
    // const newInquiry: Inquiry = {
    //   seq: 4,
    //   productSeq: 4,
    //   productName: 'ProBook X5',
    //   productImage: '/placeholder.svg?height=80&width=80',
    //   name: '존안가',
    //   title: '배송문의',
    //   question: '상품 언제 배송 되나요??',
    //   createdAt: '2023-05-18',
    //   answer: '',
    //   answerDate: '',
    // };

    // setInquiries([newInquiry, ...inquiries]);
    // setNewQuestion('');
    // setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {session && (
        <div>
          <h3 className="text-lg font-medium mb-4">문의하기</h3>
          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <Textarea
              placeholder="문의할 내용을 입력해주세요."
              value={newQuestion}
              onChange={e => setNewQuestion(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    문의
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6">상품 문의 ({totalCount})</h2>

        {totalCount === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <p className="text-lg font-medium mt-2">
              상품 문의 내역이 없습니다.
            </p>
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-4">
            {inquiries.map(inquiry => (
              <AccordionItem
                key={inquiry.seq}
                value={inquiry.seq.toString()}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">
                        {inquiry.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(inquiry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm font-normal">{inquiry.question}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 pb-4">
                    {inquiry.answer ? (
                      <div className="bg-muted p-4 rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(
                                inquiry.answerDate,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm">{inquiry.answer}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        답변을 기다리고 있습니다
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
        <PaginationControl
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
