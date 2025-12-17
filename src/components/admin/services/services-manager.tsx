'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ServiceItem } from '@/lib/api/services';
import {
  createServiceAction,
  deleteServiceAction,
  updateServiceAction,
} from '@/app/admin/actions/services';
import { PlusCircle, Trash2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(4),
  imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ServicesManager({ initialServices }: { initialServices: ServiceItem[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
    },
  });

  const { register, handleSubmit, reset } = form;

  const resetForm = () => {
    setSelectedId(null);
    reset({
      title: '',
      description: '',
      imageUrl: '',
    });
  };

  const onEdit = (service: ServiceItem) => {
    setSelectedId(service._id);
    reset({
      title: service.title,
      description: service.description,
      imageUrl: service.imageUrl ?? '',
    });
  };

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      try {
        if (selectedId) {
          await updateServiceAction(selectedId, values);
          toast.success('Service updated');
        } else {
          await createServiceAction(values);
          toast.success('Service created');
        }
        resetForm();
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('Failed to save service');
      }
    });
  });

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteServiceAction(id);
        toast.success('Service deleted');
        if (id === selectedId) {
          resetForm();
        }
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete service');
      }
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_minmax(0,1fr)]">
      <section className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {selectedId ? 'Edit Service' : 'Add Service'}
          </h2>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-teal-400 hover:text-teal-200"
          >
            <PlusCircle className="h-4 w-4" />
            New
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-300">Title</label>
            <input
              {...register('title')}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-300">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-300">Image URL</label>
            <input
              {...register('imageUrl')}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Saving…' : selectedId ? 'Update Service' : 'Create Service'}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20">
        <h2 className="mb-4 text-lg font-semibold text-white">Existing Services</h2>
        <div className="space-y-4">
          {initialServices.length === 0 ? (
            <p className="text-sm text-slate-400">No services yet.</p>
          ) : (
            initialServices.map((service) => (
              <div
                key={service._id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-teal-500/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{service.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-teal-400 hover:text-teal-200"
                      onClick={() => onEdit(service)}
                    >
                      Edit
                    </button>
                    <button
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-500/40 px-3 py-1 text-xs text-rose-300 hover:bg-rose-500/20"
                      onClick={() => handleDelete(service._id)}
                      disabled={isPending}
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-xs text-slate-400">
                  {service.description}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}


