import { apiMutation, apiRequest } from '@/lib/api/client';

export interface GalleryItem {
  _id: string;
  imageUrl: string;
  caption?: string;
  destinationId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedGallery {
  data: GalleryItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function listGallery(token: string, page = 1, limit = 20, destinationId?: string) {
  return apiRequest<PaginatedGallery>('/gallery', {
    token,
    searchParams: {
      page,
      limit,
      ...(destinationId ? { destinationId } : {}),
    },
  });
}

export function getGalleryItem(token: string, id: string) {
  return apiRequest<GalleryItem>(`/gallery/${id}`, { token });
}

export function createGalleryItem(token: string, payload: FormData) {
  return apiMutation<GalleryItem>('/gallery', 'POST', payload, {
    token,
    headers: {}, // FormData handled by apiMutation
  });
}

export function deleteGalleryItem(token: string, id: string) {
  return apiMutation<{ success: boolean }>(`/gallery/${id}`, 'DELETE', {}, { token });
}


