'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Destination } from '@/lib/api/destinations';
import { GalleryItem } from '@/lib/api/gallery';
import {
  createDestinationAction,
  deleteDestinationAction,
  updateDestinationAction,
} from '@/app/admin/actions/destinations';
import { generateDestinationDescriptionAction } from '@/app/admin/actions/ai';
import { createGalleryItemAction, deleteGalleryItemAction, getDestinationGalleryItemsAction } from '@/app/admin/actions/gallery';
import { Loader2, PlusCircle, Sparkles, Trash2, Upload, Image as ImageIcon, Plus } from 'lucide-react';

const itineraryItemSchema = z.object({
  day: z.coerce.number().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

const formSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  location: z.string().min(2),
  description: z.string().min(10),
  price: z.string().optional(),
  duration: z.string().optional(),
  images: z.string().optional(),
  highlights: z.string().optional(),
  itinerary: z.array(itineraryItemSchema).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function DestinationsManager({
  initialDestinations,
}: {
  initialDestinations: Destination[];
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [generating, setGenerating] = useState(false);
  const [destinationGallery, setDestinationGallery] = useState<GalleryItem[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      location: '',
      description: '',
      price: '',
      duration: '',
      images: '',
      highlights: '',
      itinerary: [],
    },
  });

  const { register, control, handleSubmit, setValue, reset, watch } = form;
  const { fields: itineraryFields, append: appendItinerary, remove: removeItinerary } = useFieldArray({
    control,
    name: 'itinerary',
  });

  const [imageUploadsPending, setImageUploadsPending] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [galleryUploadPending, setGalleryUploadPending] = useState(false);

  // Fetch gallery items when selectedId changes
  useEffect(() => {
    if (selectedId) {
      setGalleryLoading(true);
      getDestinationGalleryItemsAction(selectedId)
        .then((res: any) => {
          if (res && res.data) {
            setDestinationGallery(res.data);
          }
        })
        .catch((err) => console.error('Failed to fetch gallery', err))
        .finally(() => setGalleryLoading(false));
    } else {
      setDestinationGallery([]);
    }
  }, [selectedId]);

  const handleImageUploadSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const list = Array.from(files);
    setImageUploadsPending(true);
    Promise.all(
      list.map(async (file) => {
        const fd = new FormData();
        fd.append('image', file);
        try {
          const item = await createGalleryItemAction(fd);
          return item.imageUrl;
        } catch {
          return null;
        }
      }),
    )
      .then((urls: (string | null)[]) => {
        const next = urls.filter((u): u is string => typeof u === 'string');
        if (next.length) {
          setUploadedImages((prev) => [...prev, ...next]);
          setValue('images', [...uploadedImages, ...next].join('\n'));
          toast.success(`Uploaded ${next.length} image${next.length > 1 ? 's' : ''}`);
        } else {
          toast.error('Failed to upload selected images');
        }
      })
      .finally(() => setImageUploadsPending(false));
  };

  const handleGalleryUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedId) return;
    const list = Array.from(files);
    setGalleryUploadPending(true);
    Promise.all(
      list.map(async (file) => {
        const fd = new FormData();
        fd.append('image', file);
        fd.append('destinationId', selectedId);
        try {
          return await createGalleryItemAction(fd);
        } catch {
          return null;
        }
      }),
    )
      .then((items) => {
        const success = items.filter((i): i is GalleryItem => !!i);
        if (success.length) {
          setDestinationGallery((prev) => [...success, ...prev]);
          toast.success(`Added ${success.length} photos to gallery`);
        }
      })
      .finally(() => setGalleryUploadPending(false));
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    try {
      await deleteGalleryItemAction(id);
      setDestinationGallery((prev) => prev.filter((item) => item._id !== id));
      toast.success('Photo deleted');
    } catch (error) {
      toast.error('Failed to delete photo');
    }
  };

  const removeUploadedImage = (url: string) => {
    setUploadedImages((prev) => prev.filter((u) => u !== url));
    const next = uploadedImages.filter((u) => u !== url);
    setValue('images', next.join('\n'));
  };

  const resetForm = () => {
    setSelectedId(null);
    reset({
      title: '',
      slug: '',
      location: '',
      description: '',
      price: '',
      duration: '',
      images: '',
      highlights: '',
      itinerary: [],
    });
    setUploadedImages([]);
    setDestinationGallery([]);
  };

  const onEdit = (destination: Destination) => {
    setSelectedId(destination._id);
    reset({
      title: destination.title,
      slug: destination.slug,
      location: destination.location,
      description: destination.description ?? '',
      price: destination.price ?? '',
      duration: destination.duration ?? '',
      images: (destination.images ?? []).join('\n'),
      highlights: (destination.highlights ?? []).join('\n'),
      itinerary: destination.itinerary ?? [],
    });
    setUploadedImages(destination.images ?? []);
  };

  const onSubmit = handleSubmit((values) => {
    const payload: Partial<Destination> = {
      title: values.title,
      slug: values.slug,
      location: values.location,
      description: values.description,
      price: values.price,
      duration: values.duration,
      images:
        uploadedImages.length > 0
          ? uploadedImages
          : values.images
            ?.split('\n')
            .map((img) => img.trim())
            .filter(Boolean),
      highlights: values.highlights
        ?.split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      itinerary: values.itinerary,
    };

    startTransition(async () => {
      try {
        if (selectedId) {
          await updateDestinationAction(selectedId, payload);
          toast.success('Destination updated');
        } else {
          await createDestinationAction(payload);
          toast.success('Destination created');
        }
        resetForm();
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('Failed to save destination');
      }
    });
  });

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteDestinationAction(id);
        toast.success('Destination deleted');
        if (id === selectedId) {
          resetForm();
        }
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete destination');
      }
    });
  };

  const handleGenerateDescription = async () => {
    const title = watch('title');
    if (!title) {
      toast.info('Enter a title first');
      return;
    }
    setGenerating(true);
    try {
      const description = await generateDestinationDescriptionAction({
        title,
        location: watch('location'),
        highlights: watch('highlights')
          ?.split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
      });
      setValue('description', description);
      toast.success('AI description generated');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate description');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_minmax(0,1fr)]">
      <section className="space-y-6">
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              {selectedId ? 'Edit Destination' : 'Add Destination'}
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
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-xs font-medium text-slate-300">Title</label>
              <input
                {...register('title')}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-medium text-slate-300">Slug</label>
              <input
                {...register('slug')}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-medium text-slate-300">Location</label>
              <input
                {...register('location')}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-medium text-slate-300">Price</label>
                <input
                  {...register('price')}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-medium text-slate-300">Duration</label>
                <input
                  {...register('duration')}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-300">Description</label>
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={generating}
                  className="inline-flex items-center gap-2 rounded-lg border border-teal-500/40 px-2 py-1 text-xs text-teal-200 hover:bg-teal-500/10 disabled:opacity-60"
                >
                  {generating ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Sparkles className="h-3 w-3" />
                  )}
                  AI Suggest
                </button>
              </div>
              <textarea
                {...register('description')}
                rows={6}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
              />
            </div>

            {/* Itinerary Section */}
            <div className="grid gap-2 rounded-xl border border-slate-800 bg-slate-950/30 p-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-200">Itinerary</label>
                <button
                  type="button"
                  onClick={() => appendItinerary({ day: itineraryFields.length + 1, title: '', description: '' })}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:border-teal-400 hover:text-teal-200"
                >
                  <Plus className="h-3 w-3" /> Add Day
                </button>
              </div>
              <div className="space-y-3">
                {itineraryFields.map((field, index) => (
                  <div key={field.id} className="grid gap-2 rounded-lg border border-slate-800 bg-slate-900 p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16">
                        <input
                          {...register(`itinerary.${index}.day`)}
                          type="number"
                          placeholder="Day"
                          className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-white focus:border-teal-400 focus:outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          {...register(`itinerary.${index}.title`)}
                          placeholder="Title (e.g. Arrival in Kigali)"
                          className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-white focus:border-teal-400 focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItinerary(index)}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <textarea
                      {...register(`itinerary.${index}.description`)}
                      rows={2}
                      placeholder="Description of the day's activities..."
                      className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-white focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                ))}
                {itineraryFields.length === 0 && (
                  <p className="text-center text-xs text-slate-500 py-2">No itinerary steps added yet.</p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-xs font-medium text-slate-300">
                Cover Images
              </label>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-teal-400 cursor-pointer">
                    <Upload className="h-4 w-4" />
                    Upload images
                    <input type="file" accept="image/*" multiple onChange={handleImageUploadSelect} className="sr-only" />
                  </label>
                  {imageUploadsPending ? (
                    <span className="inline-flex items-center gap-2 text-xs text-slate-300">
                      <Loader2 className="h-3 w-3 animate-spin" /> Uploading…
                    </span>
                  ) : null}
                </div>
                {uploadedImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {uploadedImages.map((url) => (
                      <div key={url} className="relative rounded-lg border border-slate-700 p-2">
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <ImageIcon className="h-4 w-4" />
                          <span className="truncate">{url}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeUploadedImage(url)}
                          className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-rose-500/40 px-2 py-1 text-xs text-rose-300 hover:bg-rose-500/20"
                        >
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <textarea
                    {...register('images')}
                    rows={3}
                    className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
                    placeholder="Image URLs (one per line) — optional, use Upload images above"
                  />
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-medium text-slate-300">
                Highlights (one per line)
              </label>
              <textarea
                {...register('highlights')}
                rows={3}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? 'Saving…' : selectedId ? 'Update Destination' : 'Create Destination'}
            </button>
          </form>
        </div>

        {/* Destination Gallery Section (Only in Edit Mode) */}
        {selectedId && (
          <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Destination Gallery</h2>
              <label className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-teal-400 hover:text-teal-200 cursor-pointer">
                <PlusCircle className="h-4 w-4" />
                Add Photos
                <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="sr-only" />
              </label>
            </div>

            {galleryLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
              </div>
            ) : destinationGallery.length === 0 ? (
              <p className="text-center text-sm text-slate-500 py-8">No gallery photos linked to this destination yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {destinationGallery.map((item) => (
                  <div key={item._id} className="group relative aspect-square overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
                    <img src={item.imageUrl} alt={item.caption || 'Gallery photo'} className="h-full w-full object-cover transition group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteGalleryItem(item._id)}
                        className="rounded-full bg-rose-500/80 p-2 text-white hover:bg-rose-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {galleryUploadPending && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
                <Loader2 className="h-4 w-4 animate-spin" /> Uploading photos...
              </div>
            )}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20 h-fit">
        <h2 className="mb-4 text-lg font-semibold text-white">Existing Destinations</h2>
        <div className="space-y-4">
          {initialDestinations.length === 0 ? (
            <p className="text-sm text-slate-400">No destinations yet.</p>
          ) : (
            initialDestinations.map((destination) => (
              <div
                key={destination._id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-teal-500/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{destination.title}</p>
                    <p className="text-xs text-slate-400">
                      {destination.location} • {destination.duration}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-teal-400 hover:text-teal-200"
                      onClick={() => onEdit(destination)}
                    >
                      Edit
                    </button>
                    <button
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-500/40 px-3 py-1 text-xs text-rose-300 hover:bg-rose-500/20"
                      onClick={() => handleDelete(destination._id)}
                      disabled={isPending}
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-xs text-slate-400">
                  {destination.description}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}


