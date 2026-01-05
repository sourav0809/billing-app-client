import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { LoginDto, AuthResponse, User } from "../types/auth.types";

export const authApi = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(endpoints.AUTH.LOGIN, data);
  },

  getMe: async (): Promise<User> => {
    return apiClient.get<User>(endpoints.AUTH.ME);
  },
};
