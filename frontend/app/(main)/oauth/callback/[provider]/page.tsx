'use client';

import { signIn, useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { use, useEffect, useRef } from 'react';
import { socialLogin } from '@/lib/api/auth';

type Props = {
  params: Promise<{ provider: string }>;
};

const OAuthCallbackPage = ({ params }: Props): React.JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { provider } = use(params);
  const code = useSearchParams().get('code');
  const hasLoggedIn = useRef(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
      return;
    }

    if (hasLoggedIn.current || !code || !provider) return;

    const loginAndSignIn = async (): Promise<void> => {
      const data = await socialLogin(code, provider);

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

    hasLoggedIn.current = true;
    loginAndSignIn();
  }, [router, code, provider, status]);

  return (
    <div className="flex flex-col items-center justify-center login-screen text-lg">
      로그인 처리중...
      <Loader2 className="mr-2 h-8 w-8 animate-spin" />
    </div>
  );
};

export default OAuthCallbackPage;
