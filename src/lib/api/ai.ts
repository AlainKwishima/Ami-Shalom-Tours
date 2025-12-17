import { apiMutation } from '@/lib/api/client';

export function generateDestinationDescription(
  token: string,
  payload: {
    title: string;
    location?: string;
    highlights?: string[];
    tone?: 'friendly' | 'luxury' | 'adventure';
  },
) {
  return apiMutation<{ description: string }>(
    '/ai/destinations/description',
    'POST',
    payload,
    { token },
  );
}

export function suggestMessageReply(
  token: string,
  payload: { name: string; subject: string; message: string },
) {
  return apiMutation<{ reply: string }>('/ai/messages/reply', 'POST', payload, {
    token,
  });
}

export function generateBookingInsight(token: string, context: string) {
  return apiMutation<{ insight: string }>(
    '/ai/bookings/insights',
    'POST',
    { context },
    { token },
  );
}


