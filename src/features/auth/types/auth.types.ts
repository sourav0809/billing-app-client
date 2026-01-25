/**
 * Auth feature types
 */

export interface DistributorProfile {
  id: string;
  user_id: string;
  emergency_contact: string;
  address: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface DealerProfile {
  id: string;
  user_id: string;
  emergency_contact: string;
  address: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "dealer" | "distributor";
  parent_user_id: string | null;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  customer_profile: unknown | null;
  dealer_profile: DealerProfile | null;
  distributor_profile: DistributorProfile | null;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
