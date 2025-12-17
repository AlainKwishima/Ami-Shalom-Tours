import { Activity, CalendarClock, Images, Map, MessagesSquare, Briefcase } from 'lucide-react';
import clsx from 'clsx';

interface DashboardStatsProps {
  stats: {
    destinations: number;
    services: number;
    gallery: number;
    bookings: number;
    messages: number;
    pendingBookings: number;
  };
}

const CARD_CONFIG = [
  {
    key: 'destinations',
    label: 'Destinations',
    icon: Map,
    color: 'bg-emerald-500/10 text-emerald-300',
  },
  {
    key: 'services',
    label: 'Services',
    icon: Briefcase,
    color: 'bg-sky-500/10 text-sky-300',
  },
  {
    key: 'gallery',
    label: 'Gallery Items',
    icon: Images,
    color: 'bg-indigo-500/10 text-indigo-300',
  },
  {
    key: 'bookings',
    label: 'Total Bookings',
    icon: CalendarClock,
    color: 'bg-teal-500/10 text-teal-300',
  },
  {
    key: 'pendingBookings',
    label: 'Pending Bookings',
    icon: Activity,
    color: 'bg-amber-500/10 text-amber-300',
  },
  {
    key: 'messages',
    label: 'Messages',
    icon: MessagesSquare,
    color: 'bg-rose-500/10 text-rose-300',
  },
] as const;

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-white">Overview</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CARD_CONFIG.map((card) => {
          const Icon = card.icon;
          const value = stats[card.key];
          return (
            <div
              key={card.key}
              className="rounded-2xl border border-slate-800/70 bg-slate-900/50 p-5 shadow-lg shadow-slate-950/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-400">
                    {card.label}
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
                </div>
                <div
                  className={clsx(
                    'rounded-full p-3 shadow-inner shadow-slate-950/30',
                    card.color,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


