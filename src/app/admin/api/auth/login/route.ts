import { NextResponse } from 'next/server';
import { login } from '@/lib/api/auth';
import { setAuthCookie } from '@/lib/auth/cookies';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 },
      );
    }

    const data = await login(email, password);
    await setAuthCookie(data.access_token);

    return NextResponse.json({ user: data.user });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to login. Please try again.';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}


