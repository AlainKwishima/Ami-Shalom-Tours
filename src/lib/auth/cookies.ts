import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE } from '@/lib/constants';

const MAX_AGE = 7 * 24 * 60 * 60; // 7 days

export async function setAuthCookie(token: string) {
  const store = await cookies();
  store.set({
    name: ACCESS_TOKEN_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function clearAuthCookie() {
  const store = await cookies();
  store.delete(ACCESS_TOKEN_COOKIE);
}

export async function getAuthToken() {
  const store = await cookies();
  return store.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
}


