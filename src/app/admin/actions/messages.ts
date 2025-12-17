'use server';

import { serverMutation } from '@/lib/api/server';

export async function deleteMessageAction(id: string) {
  return serverMutation<{ success: boolean }>(`/contact/${id}`, 'DELETE', {});
}


