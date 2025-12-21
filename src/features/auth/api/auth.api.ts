import { apiClient } from '@/lib/api/client';
import type { LoginDto, RegisterDto, AuthResponse } from '../types/auth.types';

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    return apiClient.post('/auth/login', data);
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    return apiClient.post('/auth/register', data);
  },

  logout: async (): Promise<void> => {
    return apiClient.post('/auth/logout');
  },

  getMe: async () => {
    return apiClient.get('/auth/me');
  },
};

