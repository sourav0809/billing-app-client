import { type ReactNode } from "react";
import { useAuth } from "@/features/auth";
import { Navigate } from "react-router-dom";
import { paths } from "../paths";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={paths.LOGIN} replace />;
  }

  return <>{children}</>;
};
