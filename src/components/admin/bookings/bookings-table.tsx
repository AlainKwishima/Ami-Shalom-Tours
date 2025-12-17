'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Booking } from '@/lib/api/bookings';
import { updateBookingStatusAction } from '@/app/admin/actions/bookings';
import { generateInsightsAction } from '@/app/admin/actions/ai';
import { format } from 'date-fns';

const STATUS_OPTIONS: Booking['status'][] = ['Pending', 'Confirmed', 'Cancelled'];

export function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (booking: Booking, status: Booking['status']) => {
    startTransition(async () => {
      try {
        await updateBookingStatusAction(booking._id, status);
        toast.success('Status updated');
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('Failed to update status');
      }
    });
  };

  const handleSuggestion = (booking: Booking) => {
    startTransition(async () => {
      try {
        const insight = await generateInsightsAction(
          `Booking details:
Name: ${booking.name}
Email: ${booking.email}
Destination: ${
            typeof booking.destinationId === 'string'
              ? booking.destinationId
              : booking.destinationId?.title ?? 'Unknown'
          }
Tour date: ${booking.tourDate}
Number of people: ${booking.numberOfPeople}
Current status: ${booking.status}
Special request: ${booking.specialRequest ?? 'None'}

Provide a suggested follow-up action or personalised note for the admin.`,
        );
        toast.info(insight, { duration: 8000 });
      } catch (error) {
        console.error(error);
        toast.error('Failed to generate suggestion');
      }
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/60 shadow-lg shadow-slate-950/20">
      <table className="min-w-full divide-y divide-slate-800 text-sm">
        <thead className="bg-slate-900/80 text-xs uppercase text-slate-400">
          <tr>
            <th className="px-4 py-3 text-left">Guest</th>
            <th className="px-4 py-3 text-left">Destination</th>
            <th className="px-4 py-3 text-left">Tour Date</th>
            <th className="px-4 py-3 text-left">People</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {bookings.map((booking) => (
            <tr key={booking._id} className="text-slate-200">
              <td className="px-4 py-3">
                <div className="font-medium text-white">{booking.name}</div>
                <div className="text-xs text-slate-400">{booking.email}</div>
                <div className="text-xs text-slate-500">{booking.phone}</div>
              </td>
              <td className="px-4 py-3">
                {typeof booking.destinationId === 'string'
                  ? booking.destinationId
                  : booking.destinationId?.title ?? 'Any destination'}
              </td>
              <td className="px-4 py-3">{format(new Date(booking.tourDate), 'PP')}</td>
              <td className="px-4 py-3">{booking.numberOfPeople}</td>
              <td className="px-4 py-3">
                <select
                  value={booking.status}
                  onChange={(event) =>
                    handleStatusChange(booking, event.target.value as Booking['status'])
                  }
                  disabled={isPending}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-white focus:border-teal-400 focus:outline-none"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSuggestion(booking)}
                  className="rounded-lg border border-teal-500/40 px-3 py-1 text-xs text-teal-200 hover:bg-teal-500/10 disabled:opacity-60"
                  disabled={isPending}
                >
                  AI Suggestion
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


