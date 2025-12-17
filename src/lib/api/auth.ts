import { apiMutation, apiRequest } from '@/lib/api/client';

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  role?: 'super_admin' | 'editor';
  name?: string;
}

export async function login(email: string, password: string) {
  return apiMutation<LoginResponse>('/auth/login', 'POST', { email, password });
}

export async function fetchProfile(token: string) {
  return apiRequest<UserProfile>('/auth/profile', { token });
}


