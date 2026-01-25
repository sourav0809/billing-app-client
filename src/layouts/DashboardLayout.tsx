import { type ReactNode } from "react";
import { Sidebar } from "@/components/common/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 ml-20 sm:ml-20 bg-gray-50">
        <main className="p-4 sm:p-6 pt-16 sm:pt-6">{children}</main>
      </div>
    </div>
  );
};
