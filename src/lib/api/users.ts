import { apiClient } from '@/lib/api-client';
import { User } from '@/lib/types';

export async function getMe(): Promise<User> {
  const response = await apiClient.get<User>('/users/me');
  return response.data;
}

export interface UpdateMeInput {
  email?: string;
  phoneNumber?: string;
}

export async function updateMe(data: UpdateMeInput): Promise<User> {
  const response = await apiClient.patch<User>('/users/me', data);
  return response.data;
}

export async function deleteMe(): Promise<void> {
  await apiClient.delete('/users/me');
}
