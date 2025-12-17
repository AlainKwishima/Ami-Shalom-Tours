import { apiMutation, apiRequest } from '@/lib/api/client';

export interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  priceRange?: string;
  createdAt: string;
  updatedAt: string;
}

export function listServices(token: string) {
  return apiRequest<ServiceItem[]>('/services', { token });
}

export function getService(token: string, id: string) {
  return apiRequest<ServiceItem>(`/services/${id}`, { token });
}

export function createService(token: string, payload: Partial<ServiceItem>) {
  return apiMutation<ServiceItem>('/services', 'POST', payload, { token });
}

export function updateService(token: string, id: string, payload: Partial<ServiceItem>) {
  return apiMutation<ServiceItem>(`/services/${id}`, 'PATCH', payload, { token });
}

export function deleteService(token: string, id: string) {
  return apiMutation<{ success: boolean }>(`/services/${id}`, 'DELETE', {}, { token });
}


