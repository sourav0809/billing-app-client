import { useQuery } from "@tanstack/react-query";
import { customersApi } from "../api/customers.api";
import { queryKeys } from "@/lib/query/keys";
import type { GetCustomersParams } from "../types/customer.types";

/**
 * Hook to fetch customers with pagination and filters
 */
export const useCustomers = (params?: GetCustomersParams) => {
  return useQuery({
    queryKey: queryKeys.customers.list(params),
    queryFn: () => customersApi.getCustomers(params),
    enabled: true,
  });
};
