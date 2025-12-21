import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { paths } from '../paths';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export const RoleGuard = ({ children }: RoleGuardProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={paths.LOGIN} replace />;
  }

  // TODO: Implement role checking when user roles are added
  // if (allowedRoles && user && !allowedRoles.includes(user.role)) {
  //   return <Navigate to={paths.DASHBOARD} replace />;
  // }

  return <>{children}</>;
};

