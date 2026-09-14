import { apiClient } from '@/lib/api-client';
import { FacialAttributes, GeneratedFace } from '@/lib/types';

export async function generateFace(attributes: FacialAttributes): Promise<GeneratedFace> {
  const response = await apiClient.post<GeneratedFace>('/faces/generate', attributes);
  return response.data;
}

export interface SaveFaceInput {
  imageUrl: string;
  description: string;
  incidentReportId: string;
}

export async function saveFace(data: SaveFaceInput) {
  const response = await apiClient.post('/faces', data);
  return response.data;
}
