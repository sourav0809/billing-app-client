import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { queryKeys } from "@/lib/query/keys";
import type { User } from "../types/auth.types";

/**
 * Bootstrap hook that fetches user data on app initialization
 * This ensures the user state is restored on page refresh
 */
export const useAuthBootstrap = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: queryKeys.user.me,
    queryFn: authApi.getMe,
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  // Clear token and cache if /me fails (invalid/expired token)
  useEffect(() => {
    if (isError && token) {
      localStorage.removeItem("token");
      queryClient.setQueryData(queryKeys.user.me, null);
    }
  }, [isError, token, queryClient]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
};
