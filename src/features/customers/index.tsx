import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomersSummary } from "./components/CustomersSummary";
import { CustomersTable } from "./components/CustomersTable";
import { CustomersPagination } from "./components/CustomersPagination";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { EmptyState } from "@/components/common/EmptyState";
import { useCustomers } from "./hooks/useCustomers";
import { useDebounce } from "@/hooks/useDebounce";

const ITEMS_PER_PAGE = 10;

export const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search query to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  // Fetch customers with React Query
  const { data, isLoading, isError, error } = useCustomers({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    name: debouncedSearchQuery || undefined,
  });

  const customers = data?.data ?? [];
  const pagination = data?.pagination;

  const handleAddCustomer = () => {
    // TODO: Implement add customer functionality
    console.log("Add customer clicked");
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Customer Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track all your customers in one place
          </p>
        </div>
        <Button
          onClick={handleAddCustomer}
          className="bg-blue-500 hover:bg-blue-600 text-white gap-2 self-start px-6 py-2 text-sm font-medium cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats Card */}
      <CustomersSummary totalCustomers={pagination?.total ?? 0} />

      {/* Search Input */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
        <Input
          placeholder="Search customers by name..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-11 pr-4 py-3 h-12 bg-white"
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <EmptyState
          title="Error loading customers"
          description={
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again."
          }
        />
      )}

      {/* Success State */}
      {!isLoading && !isError && (
        <>
          {/* Table Info and Pagination */}
          {pagination && pagination.total > 0 && (
            <CustomersPagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              totalItems={pagination.total}
              limit={pagination.limit}
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
            />
          )}

          {/* Table */}
          {customers.length > 0 ? (
            <CustomersTable customers={customers} />
          ) : (
            <EmptyState
              title="No customers found"
              description={
                debouncedSearchQuery
                  ? `No customers found matching "${debouncedSearchQuery}"`
                  : "Get started by adding your first customer"
              }
            />
          )}
        </>
      )}
    </div>
  );
};
