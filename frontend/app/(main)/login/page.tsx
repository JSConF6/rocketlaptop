'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { login } from '@/lib/api/auth';

const LoginPage = (): React.JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  const handleKakaoLogin = (): void => {
    const KAKAO_AUTH_URL =
      `https://kauth.kakao.com/oauth/authorize` +
      `?response_type=code` +
      `&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}` +
      `&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      toast({
        title: '로그인 오류',
        description: '아이디와 비밀번호를 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoggingIn(true);

    try {
      const data = await login(loginEmail, loginPassword);

      const {
        accessToken,
        refreshToken,
        accessTokenExpiresIn,
        email,
        name,
        role,
        seq,
      } = data.result;

      const user = JSON.stringify({
        seq,
        email,
        name,
        role,
      });

      await signIn('login', {
        accessToken,
        refreshToken,
        accessTokenExpiresIn,
        user: user,
        redirect: true,
        callbackUrl: '/',
      });
    } catch (error) {
      toast({
        title: '로그인 실패',
        description: '아이디 또는 비밀번호를 확인해주세요',
        variant: 'destructive',
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="container py-8 md:py-12 login-screen">
      <div className="mx-auto max-w-md space-y-6 mt-18">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">RocketLaptop</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">비밀번호</Label>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            className="w-full  cursor-pointer"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                로그인 중...
              </>
            ) : (
              '로그인'
            )}
          </Button>
        </form>
        <button
          className="w-full flex items-center justify-center bg-[#FEE500] text-black py-3 px-4 rounded-lg shadow hover:brightness-95 transition"
          onClick={handleKakaoLogin}
        >
          <Image
            src="/kakao_logo.svg"
            alt="Kakao Logo"
            width={24}
            height={24}
            className="me-2 cursor-pointer"
          />
          카카오 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
