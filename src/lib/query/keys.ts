/**
 * Query key factory for type-safe query keys
 */
export const queryKeys = {
  auth: {
    token: ["auth", "token"] as const,
    status: ["auth", "status"] as const,
  },
  user: {
    me: ["user", "me"] as const,
  },
  customers: {
    all: ["customers"] as const,
    lists: () => [...queryKeys.customers.all, "list"] as const,
    list: (params?: { page?: number; limit?: number; name?: string }) =>
      [...queryKeys.customers.lists(), params] as const,
    detail: (id: string) => [...queryKeys.customers.all, "detail", id] as const,
  },
};
