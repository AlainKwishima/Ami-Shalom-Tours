import { apiMutation, apiRequest } from '@/lib/api/client';

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedMessages {
  data: ContactMessage[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function listMessages(token: string, page = 1, limit = 20) {
  return apiRequest<PaginatedMessages>('/contact', {
    token,
    searchParams: { page, limit },
  });
}

export function deleteMessage(token: string, id: string) {
  return apiMutation<{ success: boolean }>(`/contact/${id}`, 'DELETE', {}, { token });
}


