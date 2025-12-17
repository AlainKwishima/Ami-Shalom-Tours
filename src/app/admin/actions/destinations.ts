'use server';

import { serverMutation } from '@/lib/api/server';
import { Destination } from '@/lib/api/destinations';

export async function createDestinationAction(values: Partial<Destination>) {
  return serverMutation<Destination>('/destinations', 'POST', values);
}

export async function updateDestinationAction(
  id: string,
  values: Partial<Destination>,
) {
  return serverMutation<Destination>(`/destinations/${id}`, 'PATCH', values);
}

export async function deleteDestinationAction(id: string) {
  return serverMutation<{ success: boolean }>(`/destinations/${id}`, 'DELETE', {});
}


