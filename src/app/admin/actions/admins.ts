'use server';

import { serverMutation } from '@/lib/api/server';
import { UserProfile } from '@/lib/api/auth';

export async function createAdminAction(payload: {
  email: string;
  password: string;
  name: string;
  role: 'super_admin' | 'editor';
}) {
  return serverMutation<UserProfile>('/auth/register', 'POST', payload);
}

export async function updateAdminAction(
  id: string,
  payload: Partial<{ email: string; password: string; name: string; role: 'super_admin' | 'editor' }>,
) {
  return serverMutation<UserProfile>(`/auth/${id}`, 'PATCH', payload);
}

export async function deleteAdminAction(id: string) {
  return serverMutation<{ success: boolean }>(`/auth/${id}`, 'DELETE', {});
}


