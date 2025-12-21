export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  plan: string;
  registrationNumber: string;
  joinedDate: string;
}

export type SearchBy = "name" | "email" | "id" | "phone";

export interface CustomerFilters {
  search: string;
  searchBy: SearchBy;
  status: "all" | "active" | "inactive" | "pending";
  plan: "all" | string;
}
