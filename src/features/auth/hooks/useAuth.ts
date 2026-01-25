import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { authApi } from "../api/auth.api";
import type { AuthResponse, LoginDto } from "../types/auth.types";
import { queryKeys } from "@/lib/query/keys";
import { paths } from "@/routes/paths";
import { useAuthBootstrap } from "./useAuthBootstrap";

/**
 * Main auth hook that provides authentication state and actions
 * Uses useAuthBootstrap to get user data
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get user data from bootstrap hook
  const { user, isLoading, isAuthenticated } = useAuthBootstrap();

  /* -------------------- LOGIN -------------------- */

  const login = useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: (response: AuthResponse) => {
      // Store token in localStorage
      localStorage.setItem("token", response.token);
      // Update query cache with user data
      queryClient.setQueryData(queryKeys.user.me, response.user);
      toast.success("Login successful!");
      navigate(paths.DASHBOARD);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Login failed. Please try again."
      );
    },
  });

  /* -------------------- LOGOUT -------------------- */

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(queryKeys.user.me, null);
    queryClient.clear();
    navigate(paths.LOGIN);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};
