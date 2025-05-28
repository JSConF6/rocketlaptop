export interface LoginResponse {
  seq: number;
  email: string;
  name: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
}
