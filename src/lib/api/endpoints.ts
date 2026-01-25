/**
 * API endpoint constants
 */

export const endpoints = {
  AUTH: {
    LOGIN: "/v1/auth/login",
    REGISTER: "/v1/auth/register",
    LOGOUT: "/v1/auth/logout",
    REFRESH: "/v1/auth/refresh",
    ME: "/v1/me",
  },
  CUSTOMERS: {
    LIST: "/v1/customer",
    DETAIL: (id: string) => `/v1/customer/${id}`,
  },
} as const;
