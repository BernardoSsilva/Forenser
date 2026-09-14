import { apiClient } from '@/lib/api-client';

export interface CreateComplaintInput {
  reporterName: string;
  location: string;
  description: string;
}

export async function createComplaint(data: CreateComplaintInput) {
  const response = await apiClient.post('/complaints', data);
  return response.data;
}
