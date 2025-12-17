import { apiMutation, apiRequest } from '@/lib/api/client';

export interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  destinationId?: {
    _id: string;
    title: string;
    location?: string;
  } | string;
  tourDate: string;
  numberOfPeople: number;
  specialRequest?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedBookings {
  data: Booking[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function listBookings(token: string, page = 1, limit = 20) {
  return apiRequest<PaginatedBookings>('/bookings', {
    token,
    searchParams: { page, limit },
  });
}

export function getBooking(token: string, id: string) {
  return apiRequest<Booking>(`/bookings/${id}`, { token });
}

export function updateBookingStatus(
  token: string,
  id: string,
  status: 'Pending' | 'Confirmed' | 'Cancelled',
) {
  return apiMutation<Booking>(
    `/bookings/${id}/status`,
    'PATCH',
    { status },
    { token },
  );
}


