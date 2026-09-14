import { apiClient } from '@/lib/api-client';
import { AuthResponse, Sex, User } from '@/lib/types';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  cpf: string;
  sex: Sex;
  birthDate: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterInput): Promise<User> {
  const response = await apiClient.post<User>('/auth/register', data);
  return response.data;
}

export async function login(data: LoginInput): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', data);
  return response.data;
}
