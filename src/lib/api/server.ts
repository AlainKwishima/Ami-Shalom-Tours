import { apiMutation, apiRequest, HttpMethod } from '@/lib/api/client';
import { getAuthToken } from '@/lib/auth/cookies';

export class AuthTokenMissingError extends Error {
  constructor() {
    super('Authentication token missing');
    this.name = 'AuthTokenMissingError';
  }
}

export async function serverRequest<T>(
  path: string,
  options?: Parameters<typeof apiRequest<T>>[1],
) {
  const token = await getAuthToken();
  if (!token) {
    throw new AuthTokenMissingError();
  }

  return apiRequest<T>(path, { ...(options || {}), token });
}

export async function serverMutation<T>(
  path: string,
  method: HttpMethod,
  body: unknown,
  options?: Parameters<typeof apiMutation<T>>[3],
) {
  const token = await getAuthToken();
  if (!token) {
    throw new AuthTokenMissingError();
  }

  return apiMutation<T>(path, method, body, { ...(options || {}), token });
}


