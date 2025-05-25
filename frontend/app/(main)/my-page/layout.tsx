import type React from 'react';
import type { Metadata } from 'next';
import { MyPageSidebar } from '@/components/my-page/sidebar';

export const metadata: Metadata = {
  title: '마이 페이지',
  description: 'Manage your account, orders, points, and more',
};

const MyPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  // 서버 컴포넌트에서는 localStorage에 접근할 수 없으므로
  // 쿠키를 확인하거나 클라이언트 컴포넌트로 인증 체크를 위임해야 함
  // 여기서는 간단히 처리하기 위해 인증 체크를 건너뛰고 항상 접근 허용

  // 실제 프로덕션 환경에서는 아래와 같이 제대로 된 인증 체크를 구현해야 함
  // const cookieStore = cookies()
  // const userCookie = cookieStore.get("user")
  // if (!userCookie?.value) {
  //   redirect("/login?callbackUrl=/my-page")
  // }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">마이페이지</h1>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <MyPageSidebar />
        <main className="min-h-[50vh]">{children}</main>
      </div>
    </div>
  );
};

export default MyPageLayout;
