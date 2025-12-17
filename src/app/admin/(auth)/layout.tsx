import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (user) {
    redirect('/admin');
  }

  return children;
}







