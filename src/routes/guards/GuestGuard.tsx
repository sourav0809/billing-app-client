import { type ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { paths } from "../paths";

interface GuestGuardProps {
  children: ReactNode;
}

/**
 * GuestGuard redirects authenticated users away from guest-only pages (like login)
 */
export const GuestGuard = ({ children }: GuestGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to={paths.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

