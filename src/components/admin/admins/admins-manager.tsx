'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/lib/api/auth';
import { createAdminAction, deleteAdminAction } from '@/app/admin/actions/admins';
import { Trash2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(['super_admin', 'editor']).default('editor'),
});

type FormValues = z.infer<typeof formSchema>;

export function AdminsManager({ admins }: { admins: UserProfile[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: 'editor',
    },
  });

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      try {
        await createAdminAction(values);
        toast.success('Admin created');
        reset({ email: '', password: '', name: '', role: 'editor' });
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('Failed to create admin');
      }
    });
  });

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteAdminAction(id);
        toast.success('Admin removed');
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete admin');
      }
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20">
        <h2 className="mb-4 text-lg font-semibold text-white">Invite Admin</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-300">Name</label>
            <input
              {...register('name')}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-300">Email</label>
            <input
              {...register('email')}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-300">Temporary Password</label>
            <input
              type="password"
              {...register('password')}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
            />
            <p className="text-xs text-slate-500">
              Share this password securely. The admin should change it after logging in.
            </p>
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-300">Role</label>
            <select
              {...register('role')}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
            >
              <option value="editor">Editor</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Inviting…' : 'Invite Admin'}
          </button>
        </form>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20">
        <h2 className="text-lg font-semibold text-white">Team Members</h2>
        {admins.length === 0 ? (
          <p className="text-sm text-slate-400">No admins configured.</p>
        ) : (
          admins.map((admin) => (
            <div
              key={admin.id}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4"
            >
              <div>
                <p className="text-sm font-semibold text-white">{admin.name ?? admin.email}</p>
                <p className="text-xs text-slate-400">{admin.email}</p>
                <p className="text-xs text-teal-300 capitalize">{admin.role ?? 'editor'}</p>
              </div>
              <button
                onClick={() => handleDelete(admin.id!)}
                disabled={isPending}
                className="inline-flex items-center gap-1 rounded-lg border border-rose-500/40 px-3 py-1 text-xs text-rose-300 hover:bg-rose-500/20 disabled:opacity-60"
              >
                <Trash2 className="h-3 w-3" />
                Remove
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}


