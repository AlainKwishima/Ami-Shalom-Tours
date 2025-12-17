'use server';

import { serverMutation } from '@/lib/api/server';
import { ServiceItem } from '@/lib/api/services';

export async function createServiceAction(values: Partial<ServiceItem>) {
  return serverMutation<ServiceItem>('/services', 'POST', values);
}

export async function updateServiceAction(id: string, values: Partial<ServiceItem>) {
  return serverMutation<ServiceItem>(`/services/${id}`, 'PATCH', values);
}

export async function deleteServiceAction(id: string) {
  return serverMutation<{ success: boolean }>(`/services/${id}`, 'DELETE', {});
}


