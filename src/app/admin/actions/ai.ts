'use server';

import { serverMutation } from '@/lib/api/server';

export async function generateInsightsAction(context: string) {
  const response = await serverMutation<{ insight: string }>(
    '/ai/bookings/insights',
    'POST',
    { context },
  );

  return response.insight;
}

export async function generateDestinationDescriptionAction(payload: {
  title: string;
  location?: string;
  highlights?: string[];
  tone?: 'friendly' | 'luxury' | 'adventure';
}) {
  const response = await serverMutation<{ description: string }>(
    '/ai/destinations/description',
    'POST',
    payload,
  );
  return response.description;
}

export async function suggestMessageReplyAction(payload: {
  name: string;
  subject: string;
  message: string;
}) {
  const response = await serverMutation<{ reply: string }>(
    '/ai/messages/reply',
    'POST',
    payload,
  );
  return response.reply;
}


