'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
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
import { signOut, useSession } from 'next-auth/react';

const ProfilePage = (): React.JSX.Element => {
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [status, session]);

  const handleUpdateProfile = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast({
        title: 'Required Fields Missing',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsUpdating(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been updated successfully.',
    });

    setIsUpdating(false);
  };

  const handleDeleteAccount = async (): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Account Deleted',
      description: 'Your account has been deleted successfully.',
    });

    await signOut();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">내 정보 수정</h2>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>내 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  '내 정보 수정'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>회원 탈퇴</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            계정을 삭제 후 되돌릴 수 없습니다. 주문 내역, 리뷰, 포인트,
            개인정보를 포함한 데이터를 모두 삭제합니다
          </p>
        </CardContent>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">회원 탈퇴</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  정말 계정을 탈퇴 하시겠습니까?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  계정을 삭제 후 데이터(개인정보, 주문 내역, 리뷰, 문의,
                  포인트)를 되돌릴 수 없습니다. 정말 계정을 탈퇴 하시겠습니까?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-red-500 hover:bg-red-600"
                >
                  회원 탈퇴
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
