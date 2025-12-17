'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { SidebarNav } from './sidebar-nav';
import { Topbar } from './topbar';
import { UserProfile } from '@/lib/api/auth';

const NAV_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: 'chart' },
  { href: '/admin/pages', label: 'Pages', icon: 'file' },
  { href: '/admin/destinations', label: 'Destinations', icon: 'map' },
  { href: '/admin/services', label: 'Services', icon: 'briefcase' },
  { href: '/admin/gallery', label: 'Gallery', icon: 'image' },
  { href: '/admin/bookings', label: 'Bookings', icon: 'calendar' },
  { href: '/admin/messages', label: 'Messages', icon: 'inbox' },
  { href: '/admin/admins', label: 'Admins', icon: 'shield' },
];

export function AdminShell({
  user,
  children,
}: {
  user: UserProfile;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/admin/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex h-screen w-full">
        <aside
          className={clsx(
            'fixed inset-y-0 left-0 z-40 w-64 bg-slate-900/80 border-r border-slate-800/60 backdrop-blur-xl transition-transform lg:translate-x-0',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          )}
        >
          <div className="flex h-16 items-center gap-2 px-6 border-b border-slate-800">
            <Link href="/admin" className="text-lg font-semibold text-white">
              Ami Shalom Tours
            </Link>
            <span className="rounded-full bg-teal-500/10 px-2 py-0.5 text-xs text-teal-300">
              Admin
            </span>
          </div>
          <SidebarNav links={NAV_LINKS} activePath={pathname} userRole={user.role} />
        </aside>

        <div className="flex flex-1 flex-col lg:pl-64">
          <Topbar
            onMenuClick={() => setSidebarOpen((prev) => !prev)}
            user={user}
            onLogout={handleLogout}
          />
          <main className="flex-1 overflow-y-auto bg-slate-950/60 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>

      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
    </div>
  );
}


