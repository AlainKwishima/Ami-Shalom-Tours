import { apiMutation, apiRequest } from '@/lib/api/client';

export interface Destination {
  _id: string;
  title: string;
  slug: string;
  location: string;
  description: string;
  fullDescription?: string;
  price?: string;
  duration?: string;
  images?: string[];
  gallery?: string[];
  highlights?: string[];
  itinerary?: { title: string; description?: string; day?: number }[];
  included?: string[];
  notIncluded?: string[];
  bestTime?: string;
  difficulty?: string;
  groupSize?: string;
  rating?: number;
  events?: { title: string; date: string; description?: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedDestinations {
  data: Destination[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function listDestinations(token: string, page = 1, limit = 10) {
  return apiRequest<PaginatedDestinations>('/destinations', {
    token,
    searchParams: { page, limit },
  });
}

export function getDestination(token: string, id: string) {
  return apiRequest<Destination>(`/destinations/${id}`, { token });
}

export function createDestination(token: string, payload: Partial<Destination>) {
  return apiMutation<Destination>('/destinations', 'POST', payload, { token });
}

export function updateDestination(
  token: string,
  id: string,
  payload: Partial<Destination>,
) {
  return apiMutation<Destination>(`/destinations/${id}`, 'PATCH', payload, {
    token,
  });
}

export function deleteDestination(token: string, id: string) {
  return apiMutation<{ success: boolean }>(`/destinations/${id}`, 'DELETE', {}, {
    token,
  });
}


