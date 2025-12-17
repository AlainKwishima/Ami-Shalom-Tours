import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';

@Injectable()
export class StorageService {
  private baseUrl: string | null;
  private apiKey: string | null;
  private bucket: string | null;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = this.config.get<string>('INSFORGE_BASE_URL') ?? null;
    this.apiKey = this.config.get<string>('INSFORGE_API_KEY') ?? null;
    this.bucket = this.config.get<string>('INSFORGE_STORAGE_BUCKET') ?? null;
  }

  isConfigured() {
    return Boolean(this.baseUrl && this.apiKey && this.bucket);
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('Storage not configured');
    }
    const form = new (global as any).FormData();
    const blob = new (global as any).Blob([file.buffer], { type: file.mimetype });
    form.append('file', blob, file.originalname);
    form.append('bucket', this.bucket as string);

    const res = await fetch(`${this.baseUrl}/storage/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: form as any,
    });
    if (!res.ok) {
      throw new Error(`Upload failed with status ${res.status}`);
    }
    const data = (await res.json()) as { url?: string; data?: { url?: string } };
    const url: string | undefined = data?.url ?? data?.data?.url;
    if (!url) throw new Error('Upload failed');
    return url;
  }
}