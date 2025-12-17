import { UserProfile } from '@/lib/api/auth';
import { serverRequest } from '@/lib/api/server';

export async function getCurrentUser(): Promise<UserProfile | null> {
  try {
    const profile = await serverRequest<UserProfile>('/auth/profile');
    return profile;
  } catch {
    return null;
  }
}

export function hasRole(user: UserProfile | null, roles: UserProfile['role'][] = []) {
  if (!user) return false;
  if (!roles.length) return true;
  return user.role ? roles.includes(user.role) : false;
}


