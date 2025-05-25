import { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    accessTokenExpires?: number;
    user: {
      seq?: number;
      email?: string;
      name?: string;
      role?: string;
    };
  }

  interface User {
    seq?: number;
    email?: string;
    name?: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiresIn?: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    seq?: number;
    email?: string;
    name?: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}
