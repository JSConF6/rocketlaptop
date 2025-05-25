import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { User } from 'next-auth';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: 'social-login',
      name: 'Social Login',
      credentials: {
        accessToken: { label: 'Access Token', type: 'text' },
        refreshToken: { label: 'Refresh Token', type: 'text' },
        accessTokenExpiresIn: {
          label: 'Access Token Expiration (sec)',
          type: 'text',
        },
        user: { label: 'User', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = JSON.parse(credentials.user as string);
        user.accessToken = credentials.accessToken;
        user.refreshToken = credentials.refreshToken;
        user.accessTokenExpiresIn = Number(credentials.accessTokenExpiresIn);

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      const now = Date.now();

      if (user) {
        token.seq = user.seq;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        if (user.accessTokenExpiresIn) {
          token.accessTokenExpires =
            Date.now() + user.accessTokenExpiresIn * 1000;
        } else {
          token.accessTokenExpires = Date.now() + 1800 * 1000;
        }
      }

      if (
        token.accessToken &&
        token.accessTokenExpires &&
        now < token.accessTokenExpires
      ) {
        return token;
      }

      try {
        const res = await fetch(`${process.env.API_URL}/auth/token/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            refreshToken: token.refreshToken,
          }),
        });

        if (!res.ok) throw new Error('토큰 재발급 실패');

        const data = await res.json();

        token.accessToken = data.result.accessToken;
        token.refreshToken = data.result.refreshToken;
        token.accessTokenExpires =
          now + data.result.accessTokenExpiresIn * 1000;
        return token;
      } catch {
        return {};
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      session.user = {
        name: token.name,
        email: token.email,
        role: token.role,
        seq: token.seq,
      };
      return session;
    },
  },
});
