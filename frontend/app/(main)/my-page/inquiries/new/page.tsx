'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';

const NewInquiryPage = (): React.JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const { toast } = useToast();

  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock product data based on productId
  const productName =
    productId === '1'
      ? 'ProBook X5'
      : productId === '2'
        ? 'GameForce RTX'
        : productId === '3'
          ? 'UltraSlim Air'
          : 'Product';

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!question.trim()) {
      toast({
        title: 'Question Required',
        description: 'Please enter your question',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Inquiry Submitted',
      description: 'Your question has been submitted successfully.',
    });

    router.push('/my-page/inquiries');
  };

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/my-page/inquiries">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Inquiries
          </Link>
        </Button>
        <h2 className="text-2xl font-bold">Ask a Question</h2>
        <p className="text-muted-foreground">
          Submit a question about {productName}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Inquiry for {productName}</CardTitle>
          <CardDescription>
            Our product specialists will answer your question as soon as
            possible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="question">Your Question</Label>
              <Textarea
                id="question"
                placeholder="Ask about product features, compatibility, or any other details"
                rows={5}
                value={question}
                onChange={e => setQuestion(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Please be specific with your question to help us provide the
                most accurate answer.
              </p>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Question'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewInquiryPage;
