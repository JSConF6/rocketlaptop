'use client';

import type React from 'react';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const LoginPage = (): React.JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();

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

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-md space-y-6 mt-[150px]">
        <Card className="border border-white/20 backdrop-blur-md bg-white/60 dark:bg-slate-900/70 shadow-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-3xl">RocketLaptop</CardTitle>
          </CardHeader>
          <CardFooter>
            <button
              className="w-full flex items-center justify-center bg-[#FEE500] text-black py-3 px-4 rounded-lg shadow hover:brightness-95 transition"
              onClick={handleKakaoLogin}
            >
              <Image
                src="/kakao_logo.svg"
                alt="Kakao Logo"
                width={24}
                height={24}
                className="me-2"
              />
              카카오 로그인
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
