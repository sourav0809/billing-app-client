/**
 * Query utility functions
 */

import { QueryClient } from '@tanstack/react-query';

export const invalidateQueries = (queryClient: QueryClient, keys: readonly unknown[]) => {
  queryClient.invalidateQueries({ queryKey: [...keys] });
};

