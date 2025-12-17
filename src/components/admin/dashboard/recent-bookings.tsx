import { Badge } from '@/components/ui/badge';
import { Booking } from '@/lib/api/bookings';
import { format } from 'date-fns';

function statusColor(status: Booking['status']) {
  switch (status) {
    case 'Confirmed':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    case 'Cancelled':
      return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    default:
      return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  }
}

export function RecentBookings({ bookings }: { bookings: Booking[] }) {
  return (
    <section className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
      </div>
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <p className="text-sm text-slate-400">No bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-teal-500/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{booking.name}</p>
                  <p className="text-xs text-slate-400">
                    {booking.destinationId && typeof booking.destinationId !== 'string'
                      ? booking.destinationId.title
                      : 'Any destination'}
                  </p>
                </div>
                <Badge className={statusColor(booking.status)}>{booking.status}</Badge>
              </div>
              <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2">
                <p>
                  <span className="text-slate-500">Tour date:</span>{' '}
                  {format(new Date(booking.tourDate), 'PPP')}
                </p>
                <p>
                  <span className="text-slate-500">Guests:</span> {booking.numberOfPeople}
                </p>
                <p>
                  <span className="text-slate-500">Email:</span> {booking.email}
                </p>
                <p>
                  <span className="text-slate-500">Phone:</span> {booking.phone}
                </p>
              </div>
              {booking.specialRequest ? (
                <p className="mt-3 text-sm text-slate-300">
                  <span className="text-slate-500">Notes:</span> {booking.specialRequest}
                </p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </section>
  );
}


