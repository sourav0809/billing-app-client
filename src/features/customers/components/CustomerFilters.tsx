import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  CustomerFilters as CustomerFiltersType,
  SearchBy,
} from "../types/customer.types";

interface CustomerFiltersProps {
  filters: CustomerFiltersType;
  onFiltersChange: (filters: CustomerFiltersType) => void;
  availablePlans: string[];
}

const searchByOptions: {
  value: SearchBy;
  label: string;
  placeholder: string;
}[] = [
  { value: "name", label: "Name", placeholder: "Search by name..." },
  { value: "email", label: "Email", placeholder: "Search by email..." },
];

export const CustomerFilters = ({
  filters,
  onFiltersChange,
  availablePlans,
}: CustomerFiltersProps) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleSearchByChange = (value: string) => {
    onFiltersChange({
      ...filters,
      searchBy: value as SearchBy,
      search: "", // Reset search when changing search by
    });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: value as CustomerFiltersType["status"],
    });
  };

  const handlePlanChange = (value: string) => {
    onFiltersChange({ ...filters, plan: value });
  };

  const currentSearchBy = searchByOptions.find(
    (opt) => opt.value === filters.searchBy
  );

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search with Selector */}
        <div className="flex-1 flex gap-2 w-full">
          <div className="w-[140px]">
            <Select
              value={filters.searchBy}
              onValueChange={handleSearchByChange}
            >
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {searchByOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={currentSearchBy?.placeholder || "Search..."}
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="w-full sm:w-[160px]">
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Plan Filter */}
        <div className="w-full sm:w-[160px]">
          <Select value={filters.plan} onValueChange={handlePlanChange}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="All Plans" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              {availablePlans.map((plan) => (
                <SelectItem key={plan} value={plan}>
                  {plan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
