import { redirect } from 'next/navigation';
import { serverRequest, AuthTokenMissingError } from '@/lib/api/server';
import { Page } from '@/lib/api/pages';
import { PagesEditor } from '@/components/admin/pages/pages-editor';

const MANAGED_PAGES = ['home', 'about', 'services'];

export default async function PagesManagementPage() {
  try {
    const pages = await Promise.all(
      MANAGED_PAGES.map(async (slug) => {
        try {
          return await serverRequest<Page>(`/pages/${slug}`);
        } catch (error) {
          if (error instanceof AuthTokenMissingError) {
            throw error;
          }
          return {
            slug,
            title: slug.charAt(0).toUpperCase() + slug.slice(1),
            content: '',
            sections: {},
            _id: '',
            createdAt: '',
            updatedAt: '',
          } as Page;
        }
      }),
    );

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Manage Website Pages</h1>
          <p className="mt-1 text-sm text-slate-400">
            Update the content for Home, About, and Services without touching the code.
          </p>
        </div>
        <PagesEditor pages={pages} />
      </div>
    );
  } catch (error) {
    if (error instanceof AuthTokenMissingError) {
      redirect('/admin/login');
    }
    throw error;
  }
}


