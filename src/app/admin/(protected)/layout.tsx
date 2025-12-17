import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import { AdminShell } from '@/components/admin/layout/admin-shell';

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default async function ProtectedAdminLayout({
  children,
}: ProtectedLayoutProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}


