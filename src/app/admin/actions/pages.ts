'use server';

import { serverMutation } from '@/lib/api/server';
import { Page } from '@/lib/api/pages';

export async function upsertPageAction(
  slug: string,
  payload: Partial<Pick<Page, 'title' | 'content' | 'sections'>>,
) {
  return serverMutation<Page>(`/pages/${slug}`, 'PATCH', payload);
}


