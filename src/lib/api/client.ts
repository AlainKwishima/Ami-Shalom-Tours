import { API_BASE_URL } from '@/lib/constants';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiRequestOptions extends RequestInit {
  token?: string | null;
  searchParams?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(path: string, searchParams?: ApiRequestOptions['searchParams']) {
  const url = new URL(path.startsWith('http') ? path : `${API_BASE_URL}${path}`);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

export async function apiRequest<T>(
  path: string,
  { token, searchParams, headers, ...rest }: ApiRequestOptions = {},
): Promise<T> {
  const url = buildUrl(path, searchParams);

  let response: Response;
  try {
    response = await fetch(url, {
      ...rest,
      headers: {
        ...(!(rest.body instanceof FormData) && { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers || {}),
      },
      cache: 'no-store',
    });
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`Backend unreachable at ${url}: ${reason}`);
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export async function apiMutation<T>(
  path: string,
  method: HttpMethod,
  body: unknown,
  options?: ApiRequestOptions,
): Promise<T> {
  return apiRequest<T>(path, {
    ...options,
    method,
    body: body instanceof FormData ? body : JSON.stringify(body),
    headers:
      body instanceof FormData
        ? options?.headers
        : {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        },
  });
}







