'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { upsertPageAction } from '@/app/admin/actions/pages';
import { Page } from '@/lib/api/pages';
import clsx from 'clsx';

const formSchema = z.object({
  title: z.string().min(2, 'Title required'),
  content: z.string().optional(),
  sections: z.array(
    z.object({
      key: z.string().min(1, 'Key required'),
      value: z.string().min(1, 'Value required'),
    }),
  ),
});

type FormValues = z.infer<typeof formSchema>;

export function PagesEditor({ pages }: { pages: Page[] }) {
  const [activeSlug, setActiveSlug] = useState(pages[0]?.slug ?? 'home');
  const [isPending, startTransition] = useTransition();

  const activePage = useMemo(
    () => pages.find((page) => page.slug === activeSlug),
    [pages, activeSlug],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: activePage?.title ?? '',
      content: activePage?.content ?? '',
      sections: Object.entries(activePage?.sections ?? {}).map(([key, value]) => ({
        key,
        value,
      })),
    },
  });

  const { control, register, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sections',
  });

  useEffect(() => {
    if (activePage) {
      reset({
        title: activePage.title,
        content: activePage.content,
        sections: Object.entries(activePage.sections ?? {}).map(([key, value]) => ({
          key,
          value,
        })),
      });
    }
  }, [activePage, reset]);

  const onSubmit = handleSubmit((values) => {
    const sections: Record<string, string> = {};
    values.sections.forEach((section) => {
      sections[section.key] = section.value;
    });

    startTransition(async () => {
      try {
        await upsertPageAction(activeSlug, {
          title: values.title,
          content: values.content ?? '',
          sections,
        });
        toast.success('Page content saved');
      } catch (error) {
        console.error(error);
        toast.error('Failed to save page');
      }
    });
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {pages.map((page) => (
          <button
            key={page.slug}
            onClick={() => setActiveSlug(page.slug)}
            className={clsx(
              'rounded-full px-4 py-2 text-sm font-medium transition',
              activeSlug === page.slug
                ? 'bg-teal-500/20 text-teal-200 border border-teal-500/40'
                : 'border border-slate-800 text-slate-300 hover:border-teal-500/40 hover:text-white',
            )}
          >
            {page.title}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">Title</label>
          <input
            {...register('title')}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
          />
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">Main Content (HTML)</label>
            <textarea
              {...register('content')}
              rows={10}
              className="h-full min-h-[220px] w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-teal-400 focus:outline-none"
              placeholder="<p>Welcome to Ami Shalom Tours...</p>"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-200">Live Preview</label>
              <span className="text-xs text-slate-500">
                Rendered as HTML for quick review
              </span>
            </div>
            <div className="min-h-[220px] rounded-lg border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-200">
              {form.watch('content') ? (
                <div
                  className="prose prose-invert max-w-none text-slate-200"
                  dangerouslySetInnerHTML={{ __html: form.watch('content') ?? '' }}
                />
              ) : (
                <p className="text-xs text-slate-500">Content preview will appear here.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-200">Custom Sections</label>
            <button
              type="button"
              onClick={() => append({ key: '', value: '' })}
              className="rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:border-teal-400 hover:text-teal-200"
            >
              Add Section
            </button>
          </div>
          <div className="space-y-3">
            {fields.length === 0 ? (
              <p className="text-xs text-slate-500">
                Use “Add Section” to define additional pieces of content (e.g., hero text, CTA).
              </p>
            ) : null}
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3 sm:grid-cols-5"
              >
                <input
                  placeholder="Key"
                  {...register(`sections.${index}.key` as const)}
                  className="sm:col-span-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-teal-400 focus:outline-none"
                />
                <textarea
                  placeholder="Content"
                  {...register(`sections.${index}.value` as const)}
                  className="sm:col-span-3 h-20 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-teal-400 focus:outline-none"
                />
                <div className="sm:col-span-1 flex items-start justify-end">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="rounded-lg border border-rose-500/40 px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/20"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}


