export interface SocialLoginResult {
  seq: number;
  email: string;
  name: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
}
