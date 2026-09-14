import { apiClient } from '@/lib/api-client';
import { Appointment } from '@/lib/types';

export interface CreateAppointmentInput {
  requesterName: string;
  scheduledDate: string;
  scheduledTime: string;
}

export type UpdateAppointmentInput = Partial<CreateAppointmentInput>;

export async function listAppointments(): Promise<Appointment[]> {
  const response = await apiClient.get<Appointment[]>('/appointments');
  return response.data;
}

export async function createAppointment(data: CreateAppointmentInput): Promise<Appointment> {
  const response = await apiClient.post<Appointment>('/appointments', data);
  return response.data;
}

export async function updateAppointment(
  id: string,
  data: UpdateAppointmentInput,
): Promise<Appointment> {
  const response = await apiClient.patch<Appointment>(`/appointments/${id}`, data);
  return response.data;
}

export async function deleteAppointment(id: string): Promise<void> {
  await apiClient.delete(`/appointments/${id}`);
}
