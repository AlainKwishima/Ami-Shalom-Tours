import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import { serverRequest, AuthTokenMissingError } from '@/lib/api/server';
import { UserProfile } from '@/lib/api/auth';
import { AdminsManager } from '@/components/admin/admins/admins-manager';

export default async function AdminsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'super_admin') {
    redirect('/admin');
  }

  try {
    const admins = await serverRequest<UserProfile[]>('/auth/users');

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Admin Users</h1>
          <p className="mt-1 text-sm text-slate-400">
            Invite new team members and manage roles for the Ami Shalom Tours admin panel.
          </p>
        </div>
        <AdminsManager admins={admins} />
      </div>
    );
  } catch (error) {
    if (error instanceof AuthTokenMissingError) {
      redirect('/admin/login');
    }
    throw error;
  }
}


