import { redirect } from 'next/navigation';
import { serverRequest, AuthTokenMissingError } from '@/lib/api/server';
import { PaginatedDestinations, Destination } from '@/lib/api/destinations';
import { DestinationsManager } from '@/components/admin/destinations/destinations-manager';

export default async function DestinationsPage() {
  try {
    const { data } = await serverRequest<PaginatedDestinations>('/destinations', {
      searchParams: { page: 1, limit: 50 },
    });

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Destinations</h1>
          <p className="mt-1 text-sm text-slate-400">
            Create, edit, and organise the experiences featured on the Ami Shalom Tours website.
          </p>
        </div>
        <DestinationsManager initialDestinations={data as Destination[]} />
      </div>
    );
  } catch (error) {
    if (error instanceof AuthTokenMissingError) {
      redirect('/admin/login');
    }
    throw error;
  }
}


