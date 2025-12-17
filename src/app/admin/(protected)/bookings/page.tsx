import { redirect } from 'next/navigation';
import { serverRequest, AuthTokenMissingError } from '@/lib/api/server';
import { PaginatedBookings } from '@/lib/api/bookings';
import { BookingsTable } from '@/components/admin/bookings/bookings-table';

export default async function BookingsPage() {
  try {
    const bookings = await serverRequest<PaginatedBookings>('/bookings', {
      searchParams: { page: 1, limit: 100 },
    });

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Bookings</h1>
          <p className="mt-1 text-sm text-slate-400">
            Review customer reservations and keep them updated as plans evolve.
          </p>
        </div>
        <BookingsTable bookings={bookings.data} />
      </div>
    );
  } catch (error) {
    if (error instanceof AuthTokenMissingError) {
      redirect('/admin/login');
    }
    throw error;
  }
}


