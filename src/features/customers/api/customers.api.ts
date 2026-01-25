import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { CustomersResponse, GetCustomersParams } from "../types/customer.types";

/**
 * Customers API functions
 */
export const customersApi = {
  /**
   * Get paginated list of customers with optional filters
   */
  getCustomers: async (
    params?: GetCustomersParams
  ): Promise<CustomersResponse> => {
    const queryParams = new URLSearchParams();

    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }
    if (params?.limit) {
      queryParams.append("limit", params.limit.toString());
    }
    if (params?.name) {
      queryParams.append("name", params.name);
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `${endpoints.CUSTOMERS.LIST}?${queryString}`
      : endpoints.CUSTOMERS.LIST;

    return apiClient.get<CustomersResponse>(url);
  },
};

