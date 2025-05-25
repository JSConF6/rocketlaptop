import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (
  req: NextRequest,
): Promise<NextResponse<unknown>> => {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });
  const isLoggedIn = !!token;
  const protectedPaths = ['/my-page', '/cart', '/payment', '/seller'];
  const isProtected = protectedPaths.some(path =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (
    isLoggedIn &&
    (req.nextUrl.pathname === '/login' ||
      req.nextUrl.pathname.startsWith('/oauth/callback/'))
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/login',
    '/oauth/callback/:path*',
    '/my-page/:path*',
    '/payment/:path*',
    '/seller/:path*',
    '/cart/:path*',
  ],
};
