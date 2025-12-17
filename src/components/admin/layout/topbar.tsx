import { Menu, Search, Bell, LogOut } from 'lucide-react';
import { UserProfile } from '@/lib/api/auth';

export function Topbar({
  onMenuClick,
  user,
  onLogout,
}: {
  onMenuClick: () => void;
  user: UserProfile;
  onLogout: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-800/70 bg-slate-900/70 px-4 backdrop-blur-lg lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex items-center justify-center rounded-lg border border-slate-700/60 p-2 text-slate-200 hover:bg-slate-800/60 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            className="w-64 rounded-lg border border-slate-700 bg-slate-800/80 px-9 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            placeholder="Search content..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-full border border-slate-700/70 p-2 text-slate-300 hover:bg-slate-800/60">
          <Bell className="h-4 w-4" />
        </button>
        <div className="text-right">
          <p className="text-sm font-semibold text-white">{user?.name ?? user.email}</p>
          <p className="text-xs text-slate-400 capitalize">{user?.role ?? 'admin'}</p>
        </div>
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/60"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}


