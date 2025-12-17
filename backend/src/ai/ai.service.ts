import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface AiDescriptionPayload {
  title: string;
  location?: string;
  highlights?: string[];
  tone?: 'friendly' | 'luxury' | 'adventure';
}

interface AiReplyPayload {
  name: string;
  subject: string;
  message: string;
}

type ChatCompletionResponse = {
  choices: { message: { content: string } }[];
};

@Injectable()
export class AiService {
  private baseUrl: string | null;
  private apiKey: string | null;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('INSFORGE_BASE_URL') ?? null;
    this.apiKey = this.configService.get<string>('INSFORGE_API_KEY') ?? null;
  }

  private ensureConfigured() {
    if (!this.baseUrl || !this.apiKey) {
      throw new Error('Insforge AI client is not configured');
    }
  }

  private async requestCompletions(body: {
    model: string;
    messages: { role: 'system' | 'user'; content: string }[];
    temperature?: number;
  }) {
    this.ensureConfigured();
    try {
      const response = await axios.post<ChatCompletionResponse>(
        `${this.baseUrl}/ai/chat/completions`,
        body,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      return { choices: [{ message: { content: '' } }] } as ChatCompletionResponse;
    }
  }

  async generateDestinationDescription(payload: AiDescriptionPayload) {
    if (!this.baseUrl || !this.apiKey) {
      return {
        description: `Suggested description for ${payload.title} in ${
          payload.location ?? 'our destination list'
        }. Highlight key experiences, pricing, and why travellers love it.`,
      };
    }

    const prompt = `
      You are writing a compelling travel destination description for "${payload.title}".
      Location: ${payload.location ?? 'Unknown'}
      Highlights: ${(payload.highlights ?? []).join(', ')}
      Tone: ${payload.tone ?? 'friendly'}

      Provide 2-3 paragraphs focusing on benefits and unique experiences.
    `;

    const response = await this.requestCompletions({
      model: 'openai/gpt-4o',
      messages: [
        { role: 'system', content: 'You are a marketing copywriter for a travel agency.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response.choices?.[0]?.message?.content ?? '';
    return {
      description:
        content ||
        `Suggested description for ${payload.title} in ${payload.location ?? 'our destination list'}.`,
    };
  }

  async suggestReply(payload: AiReplyPayload) {
    if (!this.baseUrl || !this.apiKey) {
      return {
        reply: `Hi ${payload.name},

Thank you for contacting Ami Shalom Tours about "${payload.subject}". We appreciate your interest and will follow up shortly with more information.

Warm regards,
Ami Shalom Tours Team`,
      };
    }

    const response = await this.requestCompletions({
      model: 'openai/gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are an attentive travel consultant. Craft warm, professional replies acknowledging the customer message and suggesting next steps.',
        },
        {
          role: 'user',
          content: `Customer name: ${payload.name}
Subject: ${payload.subject}
Message: ${payload.message}

Compose a helpful reply (150 words max).`,
        },
      ],
      temperature: 0.6,
    });

    const content = response.choices?.[0]?.message?.content ?? '';
    return {
      reply:
        content ||
        `Hi ${payload.name},\n\nThank you for contacting Ami Shalom Tours about "${payload.subject}". We appreciate your interest and will follow up shortly.\n\nWarm regards,\nAmi Shalom Tours Team`,
    };
  }

  async generateBookingInsight(context: string) {
    if (!this.baseUrl || !this.apiKey) {
      return {
        insight:
          'Insforge AI is not configured. Review recent bookings to spot peak travel periods and destinations with growing demand.',
      };
    }

    const response = await this.requestCompletions({
      model: 'openai/gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are an analytics assistant providing actionable insights for a tour company. Keep insights concise and focused on what actions the admin should consider.',
        },
        {
          role: 'user',
          content: context,
        },
      ],
      temperature: 0.4,
    });

    const content = response.choices?.[0]?.message?.content ?? '';
    return {
      insight: content || 'Review recent bookings to spot peak periods and popular destinations.',
    };
  }
}


