import { ApiResponse } from '@/types/api';
import { API_URL } from '../config';
import { SocialLoginResult } from '@/types/auth';

export const socialLogin = async (
  code: string,
  provider: string,
): Promise<ApiResponse<SocialLoginResult>> => {
  const res = await fetch(`${API_URL}/auth/social/${provider}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      authorizeCode: code,
    }),
  });
  return await res.json();
};

export const logout = async (accessToken: string): Promise<void> => {
  await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
