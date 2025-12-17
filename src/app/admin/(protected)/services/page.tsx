import { redirect } from 'next/navigation';
import { serverRequest, AuthTokenMissingError } from '@/lib/api/server';
import { ServiceItem } from '@/lib/api/services';
import { ServicesManager } from '@/components/admin/services/services-manager';

export default async function ServicesPage() {
  try {
    const services = await serverRequest<ServiceItem[]>('/services');

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Services</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage the curated services Ami Shalom Tours offers to travellers.
          </p>
        </div>
        <ServicesManager initialServices={services} />
      </div>
    );
  } catch (error) {
    if (error instanceof AuthTokenMissingError) {
      redirect('/admin/login');
    }
    throw error;
  }
}


