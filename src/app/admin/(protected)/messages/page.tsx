import { redirect } from 'next/navigation';
import { serverRequest, AuthTokenMissingError } from '@/lib/api/server';
import { PaginatedMessages } from '@/lib/api/messages';
import { MessagesManager } from '@/components/admin/messages/messages-manager';

export default async function MessagesPage() {
  try {
    const messages = await serverRequest<PaginatedMessages>('/contact', {
      searchParams: { page: 1, limit: 100 },
    });

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Messages</h1>
          <p className="mt-1 text-sm text-slate-400">
            Review enquiries and keep your guests engaged with timely responses.
          </p>
        </div>
        <MessagesManager messages={messages.data} />
      </div>
    );
  } catch (error) {
    if (error instanceof AuthTokenMissingError) {
      redirect('/admin/login');
    }
    throw error;
  }
}


