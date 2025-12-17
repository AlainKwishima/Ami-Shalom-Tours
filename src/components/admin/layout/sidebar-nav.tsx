import Link from 'next/link';
import { useMemo } from 'react';
import {
  BarChart3,
  FileText,
  Map,
  Briefcase,
  Image,
  Calendar,
  Inbox,
  Shield,
} from 'lucide-react';
import clsx from 'clsx';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  chart: BarChart3,
  file: FileText,
  map: Map,
  briefcase: Briefcase,
  image: Image,
  calendar: Calendar,
  inbox: Inbox,
  shield: Shield,
};

interface NavLink {
  href: string;
  label: string;
  icon: string;
}

export function SidebarNav({
  links,
  activePath,
  userRole,
}: {
  links: NavLink[];
  activePath: string;
  userRole?: string;
}) {
  const filteredLinks = useMemo(() => {
    if (userRole === 'super_admin') return links;
    return links.filter((link) => link.href !== '/admin/admins');
  }, [links, userRole]);

  return (
    <nav className="flex-1 overflow-y-auto px-4 py-6">
      <ul className="space-y-1">
        {filteredLinks.map((link) => {
          const Icon = ICONS[link.icon] ?? FileText;
          const isActive =
            activePath === link.href ||
            (link.href !== '/admin' && activePath.startsWith(link.href));

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={clsx(
                  'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-teal-500/10 text-teal-300'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white',
                )}
              >
                <Icon
                  className={clsx(
                    'h-4 w-4',
                    isActive ? 'text-teal-300' : 'text-slate-400 group-hover:text-white',
                  )}
                />
                <span>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


