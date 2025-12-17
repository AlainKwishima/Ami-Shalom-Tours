import { redirect } from 'next/navigation';
import { serverRequest, AuthTokenMissingError } from '@/lib/api/server';
import { PaginatedGallery, GalleryItem } from '@/lib/api/gallery';
import { PaginatedDestinations } from '@/lib/api/destinations';
import { GalleryManager } from '@/components/admin/gallery/gallery-manager';

export default async function GalleryPage() {
  try {
    const [gallery, destinations] = await Promise.all([
      serverRequest<PaginatedGallery>('/gallery', { searchParams: { page: 1, limit: 50 } }),
      serverRequest<PaginatedDestinations>('/destinations', {
        searchParams: { page: 1, limit: 100 },
      }),
    ]);

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Gallery</h1>
          <p className="mt-1 text-sm text-slate-400">
            Upload new imagery and keep each destination visually inspiring.
          </p>
        </div>
        <GalleryManager
          items={gallery.data as GalleryItem[]}
          destinations={destinations.data}
        />
      </div>
    );
  } catch (error) {
    if (error instanceof AuthTokenMissingError) {
      redirect('/admin/login');
    }
    throw error;
  }
}


