import { Users } from "lucide-react";

interface CustomersSummaryProps {
  totalCustomers: number;
}

export const CustomersSummary = ({ totalCustomers }: CustomersSummaryProps) => {
  return (
    <div className="inline-flex items-center gap-3 rounded-lg px-4 py-3 mb-6 w-[300px] bg-white shadow-sm">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
        <Users className="h-5 w-5 text-blue-600" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Total Customers</p>
        <p className="text-2xl font-bold text-foreground">{totalCustomers}</p>
      </div>
    </div>
  );
};
