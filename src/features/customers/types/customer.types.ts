/**
 * Customer types based on API response structure (camelCase)
 */

export interface Area {
  id: string;
  userId: string;
  name: string;
  pincode: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CustomerProfile {
  id: string;
  userId: string;
  vcNumber: string;
  stbNumber: string;
  panNumber: string;
  aadhaarNumber: string;
  address: string;
  areaId: string | null;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  area: Area | null;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "dealer" | "distributor";
  parentUserId: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  customer_profile: CustomerProfile | null;
  dealer_profile: unknown | null;
  distributor_profile: unknown | null;
}

export interface CustomersPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CustomersResponse {
  data: Customer[];
  pagination: CustomersPagination;
}

export interface GetCustomersParams {
  page?: number;
  limit?: number;
  name?: string;
}

export type SearchBy = "name" | "email";

export interface CustomerFilters {
  search: string;
  searchBy: SearchBy;
  status: "all" | "active" | "inactive";
  plan: "all" | string;
}
