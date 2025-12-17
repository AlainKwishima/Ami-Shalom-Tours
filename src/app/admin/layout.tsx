import { ReactNode } from 'react';
import { AdminProviders } from './providers';

export const metadata = {
  title: 'Admin | Ami Shalom Tours',
  description: 'Content management panel for Ami Shalom Tours',
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <AdminProviders>{children}</AdminProviders>;
}


