import { useState, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomersSummary } from "./components/CustomersSummary";
import { CustomersTable } from "./components/CustomersTable";
import { CustomersPagination } from "./components/CustomersPagination";
import { usePagination } from "@/hooks/usePagination";
import { mockCustomers } from "./data/mockCustomers";

const ITEMS_PER_PAGE = 10;

export const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter customers based on search
  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.registrationNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Pagination
  const { currentPage, totalPages, goToPage, startIndex, endIndex } =
    usePagination({
      totalItems: filteredCustomers.length,
      itemsPerPage: ITEMS_PER_PAGE,
    });

  // Get paginated customers
  const paginatedCustomers = useMemo(() => {
    return filteredCustomers.slice(startIndex, endIndex);
  }, [filteredCustomers, startIndex, endIndex]);

  const handleAddCustomer = () => {
    // TODO: Implement add customer functionality
    console.log("Add customer clicked");
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
      <CustomersSummary totalCustomers={filteredCustomers.length} />

      {/* Search Input */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
        <Input
          placeholder="Search customers by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 pr-4 py-3 h-12 bg-white"
        />
      </div>

      {/* Table Info and Pagination */}
      {filteredCustomers.length > 0 && (
        <CustomersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          totalItems={filteredCustomers.length}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      )}

      {/* Table */}
      <CustomersTable customers={paginatedCustomers} />
    </div>
  );
};
