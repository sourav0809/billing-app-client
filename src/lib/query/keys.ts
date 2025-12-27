/**
 * Query key factory for type-safe query keys
 */

export const queryKeys = {
  // Auth queries
  auth: {
    all: ["auth"] as const,
    me: () => [...queryKeys.auth.all, "me"] as const,
  },
} as const;
