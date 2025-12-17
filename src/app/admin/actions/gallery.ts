'use server';

import { serverMutation } from '@/lib/api/server';
import { GalleryItem } from '@/lib/api/gallery';

export async function createGalleryItemAction(formData: FormData) {
  return serverMutation<GalleryItem>('/gallery', 'POST', formData);
}

export async function deleteGalleryItemAction(id: string) {
  return serverMutation<{ success: boolean }>(`/gallery/${id}`, 'DELETE', {});
}

export async function getDestinationGalleryItemsAction(destinationId: string) {
  const { serverRequest } = await import('@/lib/api/server');
  // We import the type for generic usage, but at runtime we don't need the value if it's just an interface.
  // However, serverRequest needs a generic type.
  // We can just import the module and use the type from it if exported.
  // But dynamic import returns a module object.
  const galleryModule = await import('@/lib/api/gallery');
  return serverRequest<import('@/lib/api/gallery').PaginatedGallery>(`/gallery?destinationId=${destinationId}&limit=100`);
}


