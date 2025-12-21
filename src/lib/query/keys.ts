/**
 * Query key factory for type-safe query keys
 */

export const queryKeys = {
  // Auth queries
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
  },
  
  // Trips queries (for future use)
  trips: {
    all: ['trips'] as const,
    lists: () => [...queryKeys.trips.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.trips.lists(), filters] as const,
    details: () => [...queryKeys.trips.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.trips.details(), id] as const,
  },
  
  // Riders queries (for future use)
  riders: {
    all: ['riders'] as const,
    lists: () => [...queryKeys.riders.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.riders.lists(), filters] as const,
  },
} as const;

