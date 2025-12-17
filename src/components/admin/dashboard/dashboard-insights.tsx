'use client';

import { useState, useTransition } from 'react';
import { Sparkles } from 'lucide-react';
import { generateInsightsAction } from '@/app/admin/actions/ai';
import { toast } from 'sonner';

interface DashboardInsightsProps {
  stats: {
    destinations: number;
    services: number;
    gallery: number;
    bookings: number;
    messages: number;
    pendingBookings: number;
  };
}

export function DashboardInsights({ stats }: DashboardInsightsProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = () => {
    const context = `
Provide actionable insights for a travel agency admin panel based on:
- Total destinations: ${stats.destinations}
- Total services: ${stats.services}
- Total gallery items: ${stats.gallery}
- Total bookings: ${stats.bookings}
- Pending bookings: ${stats.pendingBookings}
- Unread messages: ${stats.messages}

Highlight high demand periods, recommended focus areas, and any potential risks.
    `;

    startTransition(async () => {
      try {
        const response = await generateInsightsAction(context);
        setInsight(response);
      } catch (error) {
        console.error(error);
        toast.error('Failed to generate insights');
      }
    });
  };

  return (
    <section className="flex h-full flex-col rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/20">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">AI Insights</h3>
        <button
          onClick={handleGenerate}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg border border-teal-500/50 bg-teal-500/10 px-3 py-2 text-sm font-medium text-teal-200 transition hover:bg-teal-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Sparkles className="h-4 w-4" />
          {isPending ? 'Generating…' : 'Generate'}
        </button>
      </div>
      <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900/80 p-4">
        {insight ? (
          <p className="text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">{insight}</p>
        ) : (
          <p className="text-sm text-slate-400">
            Tap “Generate” to get AI-powered recommendations based on the latest bookings and
            inquiries.
          </p>
        )}
      </div>
    </section>
  );
}


