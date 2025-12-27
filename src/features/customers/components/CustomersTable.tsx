import { MoreHorizontal, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { Customer } from "../types/customer.types";

interface CustomersTableProps {
  customers: Customer[];
}

const getStatusBadgeClassName = (status: Customer["status"]) => {
  switch (status) {
    case "active":
      return "bg-blue-500 text-white border-transparent";
    case "inactive":
      return "bg-gray-200 text-gray-700 border-transparent";
    case "pending":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    default:
      return "";
  }
};

const getStatusLabel = (status: Customer["status"]) => {
  return status.charAt(0).toUpperCase() + status.slice(1).toUpperCase();
};

export const CustomersTable = ({ customers }: CustomersTableProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-gray-200">
            <TableHead className="text-muted-foreground font-medium text-sm py-3 px-4 border-r border-gray-200">
              Customer Name
            </TableHead>
            <TableHead className="text-muted-foreground font-medium text-sm py-3 px-4 border-r border-gray-200">
              Registration Number
            </TableHead>
            <TableHead className="text-muted-foreground font-medium text-sm py-3 px-4 border-r border-gray-200">
              Email
            </TableHead>
            <TableHead className="text-muted-foreground font-medium text-sm py-3 px-4 border-r border-gray-200">
              Phone
            </TableHead>
            <TableHead className="text-muted-foreground font-medium text-sm py-3 px-4 border-r border-gray-200">
              Status
            </TableHead>
            <TableHead className="text-muted-foreground font-medium text-sm py-3 px-4 border-r border-gray-200">
              Plan
            </TableHead>
            <TableHead className="text-muted-foreground font-medium text-sm py-3 px-4 border-r border-gray-200">
              Joined Date
            </TableHead>
            <TableHead className="text-muted-foreground font-medium text-sm py-3 px-4">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow className="border-b-0">
              <TableCell colSpan={8} className="h-16 text-center py-3 px-4">
                No customers found.
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer, index) => (
              <TableRow
                key={customer.id}
                className={`border-b border-gray-100 last:border-b-0 hover:bg-muted/30 ${
                  index % 2 === 0 ? "bg-card" : "bg-muted/10"
                }`}
              >
                <TableCell className="py-3 px-4 border-r border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {customer.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-foreground py-3 px-4 border-r border-gray-100">
                  {customer.registrationNumber}
                </TableCell>
                <TableCell className="py-3 px-4 border-r border-gray-100">
                  <a
                    href={`mailto:${customer.email}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {customer.email}
                  </a>
                </TableCell>
                <TableCell className="text-sm text-foreground py-3 px-4 border-r border-gray-100">
                  {customer.phone}
                </TableCell>
                <TableCell className="py-3 px-4 border-r border-gray-100">
                  <Badge
                    className={`text-xs font-medium ${getStatusBadgeClassName(
                      customer.status
                    )}`}
                  >
                    {getStatusLabel(customer.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-foreground py-3 px-4 border-r border-gray-100">
                  {customer.plan}
                </TableCell>
                <TableCell className="text-sm text-foreground py-3 px-4 border-r border-gray-100">
                  {customer.joinedDate}
                </TableCell>
                <TableCell className="py-3 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
