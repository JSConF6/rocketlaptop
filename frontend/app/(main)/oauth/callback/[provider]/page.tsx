'use client';

import { signIn, useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { use, useEffect } from 'react';

type Props = {
  params: Promise<{ provider: string }>;
};

const OAuthCallbackPage = ({ params }: Props): React.JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { provider } = use(params);
  const code = useSearchParams().get('code');

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'authenticated') {
      router.replace('/');
      return;
    }

    const kakaoLogin = async (): Promise<void> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/social/${provider}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            authorizeCode: code,
          }),
        },
      );

      const data = await res.json();

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

      await signIn('social-login', {
        accessToken,
        refreshToken,
        accessTokenExpiresIn,
        user: user,
        redirect: true,
        callbackUrl: '/',
      });
    };
    if (code && provider) kakaoLogin();
  }, [router, code, provider, status]);

  return (
    <div className="flex flex-col items-center justify-center login-screen text-lg">
      로그인 처리중...
      <Loader2 className="mr-2 h-8 w-8 animate-spin" />
    </div>
  );
};

export default OAuthCallbackPage;
