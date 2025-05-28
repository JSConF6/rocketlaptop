import { ApiResponse } from '@/types/api';
import { API_URL } from '../config';
import { LoginResponse } from '@/types/auth';

export const signup = async (
  registerEmail: string,
  registerPassword: string,
  registerName: string,
): Promise<ApiResponse<null>> => {
  const res = await fetch(`${API_URL}/auth/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: registerEmail,
      password: registerPassword,
      name: registerName,
    }),
  });
  if (!res.ok) throw Error('회원가입 실패');
  return await res.json();
};

export const login = async (
  loginEmail: string,
  loginPassword: string,
): Promise<ApiResponse<LoginResponse>> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: loginEmail,
      password: loginPassword,
    }),
  });
  if (!res.ok) throw Error('로그인 실패');
  return await res.json();
};

export const socialLogin = async (
  code: string,
  provider: string,
): Promise<ApiResponse<LoginResponse>> => {
  const res = await fetch(`${API_URL}/auth/social/${provider}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      authorizeCode: code,
    }),
  });
  if (!res.ok) throw Error('소셜 로그인 실패');
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
