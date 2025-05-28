'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { signup } from '@/lib/api/auth';

const SignUpPage = (): React.JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !registerName ||
      !registerEmail ||
      !registerPassword ||
      !registerConfirmPassword
    ) {
      toast({
        title: '회원가입 필드 입력',
        description: '모든 필드를 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: '비밀번호 입력 오류',
        description: '패스워드가 일치하지 않습니다.',
        variant: 'destructive',
      });
      return;
    }

    setIsRegistering(true);

    try {
      const data = await signup(registerEmail, registerPassword, registerName);
      toast({
        title: '회원가입 성공',
        description: '회원가입 성공 했습니다.',
      });
      router.push('/login');
    } catch (error) {
      toast({
        title: '회원가입 실패',
        description: '회원가입 실패 했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="container py-8 md:py-12 login-screen">
      <div className="mx-auto max-w-md space-y-6 mt-12">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">RocketLaptop</h1>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              type="text"
              placeholder="테스터"
              value={registerName}
              onChange={e => setRegisterName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email">이메일</Label>
            <Input
              id="register-email"
              type="email"
              placeholder="test@test.com"
              value={registerEmail}
              onChange={e => setRegisterEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password">비밀번호</Label>
            <Input
              id="register-password"
              type="password"
              placeholder="••••••••"
              value={registerPassword}
              onChange={e => setRegisterPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">비밀번호 확인</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={registerConfirmPassword}
              onChange={e => setRegisterConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isRegistering}
          >
            {isRegistering ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                회원가입 중...
              </>
            ) : (
              '회원가입'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
