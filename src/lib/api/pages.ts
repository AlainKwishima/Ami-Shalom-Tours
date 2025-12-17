import { apiMutation, apiRequest } from '@/lib/api/client';

export interface Page {
  _id: string;
  slug: string;
  title: string;
  content: string;
  sections: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export function listPages(token: string) {
  return apiRequest<Page[]>('/pages', { token });
}

export function getPage(token: string, slug: string) {
  return apiRequest<Page>(`/pages/${slug}`, { token });
}

export function upsertPage(
  token: string,
  slug: string,
  payload: Partial<Pick<Page, 'title' | 'content' | 'sections'>>,
) {
  return apiMutation<Page>(`/pages/${slug}`, 'PATCH', payload, { token });
}


