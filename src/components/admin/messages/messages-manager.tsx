'use client';

import { useState, useTransition } from 'react';
import { ContactMessage } from '@/lib/api/messages';
import { deleteMessageAction } from '@/app/admin/actions/messages';
import { suggestMessageReplyAction } from '@/app/admin/actions/ai';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Trash2, Sparkles, Mail } from 'lucide-react';

export function MessagesManager({ messages }: { messages: ContactMessage[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<Record<string, string>>({});

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteMessageAction(id);
        toast.success('Message archived');
        router.refresh();
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete message');
      }
    });
  };

  const handleSuggest = (message: ContactMessage) => {
    startTransition(async () => {
      try {
        const reply = await suggestMessageReplyAction({
          name: message.name,
          subject: message.subject,
          message: message.message,
        });
        setSuggestions((prev) => ({ ...prev, [message._id]: reply }));
        toast.success('Reply suggestion ready');
      } catch (error) {
        console.error(error);
        toast.error('Failed to generate suggestion');
      }
    });
  };

  const handleCopy = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <p className="text-sm text-slate-400">No messages yet.</p>
      ) : (
        messages.map((message) => {
          const suggestion = suggestions[message._id];
          return (
            <div
              key={message._id}
              className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{message.name}</p>
                  <p className="text-xs text-slate-400">{message.email}</p>
                  <p className="mt-1 text-xs text-teal-300">{message.subject}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSuggest(message)}
                    disabled={isPending}
                    className="inline-flex items-center gap-1 rounded-lg border border-teal-500/40 px-3 py-1 text-xs text-teal-200 hover:bg-teal-500/10 disabled:opacity-60"
                  >
                    <Sparkles className="h-3 w-3" />
                    Suggest Reply
                  </button>
                  <button
                    onClick={() => handleDelete(message._id)}
                    disabled={isPending}
                    className="inline-flex items-center gap-1 rounded-lg border border-rose-500/40 px-3 py-1 text-xs text-rose-300 hover:bg-rose-500/20 disabled:opacity-60"
                  >
                    <Trash2 className="h-3 w-3" />
                    Archive
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-200 whitespace-pre-line">{message.message}</p>
              {suggestion ? (
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wide text-teal-300">
                      Suggested reply
                    </p>
                    <button
                      onClick={() => handleCopy(suggestion)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2 py-1 text-[10px] text-slate-200 hover:border-teal-400 hover:text-teal-200"
                    >
                      <Mail className="h-3 w-3" />
                      Copy
                    </button>
                  </div>
                  <p className="text-sm text-slate-200 whitespace-pre-line">{suggestion}</p>
                </div>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
}


