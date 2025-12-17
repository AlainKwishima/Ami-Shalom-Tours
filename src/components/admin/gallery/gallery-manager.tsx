'use client';

import Image from 'next/image';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { GalleryItem } from '@/lib/api/gallery';
import { Destination } from '@/lib/api/destinations';
import {
  createGalleryItemAction,
  deleteGalleryItemAction,
} from '@/app/admin/actions/gallery';
import { Loader2, Trash2 } from 'lucide-react';

const formSchema = z.object({
  caption: z.string().optional(),
  destinationId: z.string().optional(),
  imageFile: z
    .any()
    .refine((file) => file instanceof File, 'Image is required')
    .or(z.string().optional()),
});

type FormValues = z.infer<typeof formSchema>;

export function GalleryManager({
  items,
  destinations,
}: {
  items: GalleryItem[];
  destinations: Destination[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const hasUploadsSupport = typeof window !== 'undefined' && 'FormData' in window;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { register, handleSubmit, reset } = form;

  const onSubmit = handleSubmit((values) => {
    if (!hasUploadsSupport) {
      toast.error('File uploads not supported in this environment.');
      return;
    }

    const fileList = (values.imageFile as unknown as FileList) ?? null;
    const file = fileList?.[0];
    if (!file) {
      toast.error('Select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    if (values.caption) formData.append('caption', values.caption);
    if (values.destinationId) formData.append('destinationId', values.destinationId);

    startTransition(async () => {
      try {
        await createGalleryItemAction(formData);
        toast.success('Image uploaded');
        reset();
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('Failed to upload image');
      }
    });
  });

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteGalleryItemAction(id);
        toast.success('Image removed');
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete image');
      }
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,1.5fr)]">
      <section className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20">
        <h2 className="mb-4 text-lg font-semibold text-white">Upload Image</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-300">Image file</label>
            <input
              type="file"
              accept="image/*"
              {...register('imageFile')}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-300">Caption</label>
            <input
              {...register('caption')}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-medium text-slate-300">Destination</label>
            <select
              {...register('destinationId')}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
            >
              <option value="">Unassigned</option>
              {destinations.map((destination) => (
                <option key={destination._id} value={destination._id}>
                  {destination.title}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Upload Image'}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20">
        <h2 className="mb-4 text-lg font-semibold text-white">Gallery Items</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.length === 0 ? (
            <p className="text-sm text-slate-400">No images uploaded yet.</p>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80"
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.caption || 'Gallery image'}
                    width={400}
                    height={300}
                    className="h-40 w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center text-slate-500">
                    No preview
                  </div>
                )}
                <div className="space-y-2 p-3 text-xs text-slate-300">
                  {item.caption ? <p className="font-medium">{item.caption}</p> : null}
                  {item.destinationId ? (
                    <p className="text-slate-400">
                      Linked to{' '}
                      {destinations.find((d) => d._id === item.destinationId)?.title ??
                        item.destinationId}
                    </p>
                  ) : null}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="inline-flex items-center gap-1 rounded-lg border border-rose-500/40 px-2 py-1 text-rose-300 transition hover:bg-rose-500/20"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}


