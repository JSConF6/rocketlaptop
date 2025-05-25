'use client';

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

type PointHistoryItem = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'earned' | 'used';
  typeKorean: string;
  balance: number;
};

type PointHistoryListProps = {
  type: 'all' | 'earned' | 'used';
};

// Mock data
const mockPointHistory: PointHistoryItem[] = [
  {
    id: '1',
    date: '2023-05-15',
    description: 'Purchase Reward - Order #12345',
    amount: 250,
    type: 'earned',
    typeKorean: '적립',
    balance: 1250,
  },
  {
    id: '2',
    date: '2023-05-10',
    description: 'Used for discount - Order #12340',
    amount: -100,
    type: 'used',
    typeKorean: '사용',
    balance: 1000,
  },
  {
    id: '3',
    date: '2023-05-01',
    description: 'Welcome Bonus',
    amount: 500,
    type: 'earned',
    typeKorean: '적립',
    balance: 1100,
  },
  {
    id: '4',
    date: '2023-04-15',
    description: 'Referral Bonus',
    amount: 200,
    type: 'earned',
    typeKorean: '적립',
    balance: 600,
  },
  {
    id: '5',
    date: '2023-04-10',
    description: 'Used for discount - Order #12330',
    amount: -150,
    type: 'used',
    typeKorean: '사용',
    balance: 400,
  },
];

export const PointHistoryList = ({
  type,
}: PointHistoryListProps): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<PointHistoryItem[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const filteredHistory =
        type === 'all'
          ? mockPointHistory
          : mockPointHistory.filter(item => item.type === type);

      setHistory(filteredHistory);
      setIsLoading(false);
    };

    fetchData();
  }, [type]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
          ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No point history found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>일자</TableHead>
          <TableHead>설명</TableHead>
          <TableHead>금액</TableHead>
          <TableHead>타입</TableHead>
          <TableHead className="text-right">포인트 잔액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map(item => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              {new Date(item.date).toLocaleDateString()}
            </TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell
              className={item.amount > 0 ? 'text-green-600' : 'text-red-600'}
            >
              {item.amount > 0 ? `+${item.amount}` : item.amount}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  item.type === 'earned'
                    ? 'default'
                    : item.type === 'used'
                      ? 'secondary'
                      : 'destructive'
                }
              >
                {item.typeKorean}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {item.balance.toLocaleString()} pts
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
