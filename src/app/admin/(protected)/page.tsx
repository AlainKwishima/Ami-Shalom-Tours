import { redirect } from 'next/navigation';
import { serverRequest, AuthTokenMissingError } from '@/lib/api/server';
import { PaginatedDestinations } from '@/lib/api/destinations';
import { ServiceItem } from '@/lib/api/services';
import { PaginatedGallery } from '@/lib/api/gallery';
import { PaginatedBookings } from '@/lib/api/bookings';
import { PaginatedMessages } from '@/lib/api/messages';
import { DashboardInsights } from '@/components/admin/dashboard/dashboard-insights';
import { DashboardStats } from '@/components/admin/dashboard/dashboard-stats';
import { RecentBookings } from '@/components/admin/dashboard/recent-bookings';

export default async function AdminDashboardPage() {
  try {
    const safe = async <T,>(fn: () => Promise<T>, fallback: T) => {
      try {
        return await fn();
      } catch {
        return fallback;
      }
    };

    const destinations = await safe(
      () =>
        serverRequest<PaginatedDestinations>('/destinations', {
          searchParams: { page: 1, limit: 1 },
        }),
      { data: [], pagination: { page: 1, limit: 1, total: 0, totalPages: 1 } },
    );
    const services = await safe(() => serverRequest<ServiceItem[]>('/services'), []);
    const gallery = await safe(
      () => serverRequest<PaginatedGallery>('/gallery', { searchParams: { page: 1, limit: 1 } }),
      { data: [], pagination: { page: 1, limit: 1, total: 0, totalPages: 1 } },
    );
    const bookings = await safe(
      () => serverRequest<PaginatedBookings>('/bookings', { searchParams: { page: 1, limit: 5 } }),
      { data: [], pagination: { page: 1, limit: 5, total: 0, totalPages: 1 } },
    );
    const messages = await safe(
      () => serverRequest<PaginatedMessages>('/contact', { searchParams: { page: 1, limit: 5 } }),
      { data: [], pagination: { page: 1, limit: 5, total: 0, totalPages: 1 } },
    );

    const stats = {
      destinations: destinations.pagination.total,
      services: services.length,
      gallery: gallery.pagination.total,
      bookings: bookings.pagination.total,
      messages: messages.pagination.total,
      pendingBookings: bookings.data.filter((booking) => booking.status === 'Pending').length,
    };

    return (
      <div className="space-y-8">
        <DashboardStats stats={stats} />
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentBookings bookings={bookings.data} />
          <DashboardInsights stats={stats} />
        </div>
      </div>
    );
  } catch (error) {
    if (
      error instanceof AuthTokenMissingError ||
      (error instanceof Error && error.message.includes('401'))
    ) {
      redirect('/admin/login');
    }
    return (
      <div className="space-y-8">
        <DashboardStats
          stats={{ destinations: 0, services: 0, gallery: 0, bookings: 0, messages: 0, pendingBookings: 0 }}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentBookings bookings={[]} />
          <DashboardInsights
            stats={{ destinations: 0, services: 0, gallery: 0, bookings: 0, messages: 0, pendingBookings: 0 }}
          />
        </div>
      </div>
    );
  }
}



