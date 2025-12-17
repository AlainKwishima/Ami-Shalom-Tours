'use server';

import { serverMutation } from '@/lib/api/server';
import { Booking } from '@/lib/api/bookings';

export async function updateBookingStatusAction(
  id: string,
  status: Booking['status'],
) {
  return serverMutation<Booking>(`/bookings/${id}/status`, 'PATCH', { status });
}


