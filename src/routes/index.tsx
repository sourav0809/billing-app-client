import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import Login from "@/features/auth";
import { Customers } from "@/features/customers";
import { AuthGuard } from "./guards/AuthGuard";
import { GuestGuard } from "./guards/GuestGuard";
import { paths } from "./paths";

const router = createBrowserRouter([
  {
    path: paths.LOGIN,
    element: (
      <GuestGuard>
        <AuthLayout>
          <Login />
        </AuthLayout>
      </GuestGuard>
    ),
  },
  {
    path: paths.DASHBOARD,
    element: (
      <AuthGuard>
        <DashboardLayout>
          <div>
            <h2 className="text-2xl font-medium">Welcome to Dashboard</h2>
            <p className=" mt-1 text-sm text-muted-foreground">
              Your dashboard content goes here.
            </p>
          </div>
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: paths.CUSTOMERS,
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Customers />
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: paths.PLANS,
    element: (
      <AuthGuard>
        <DashboardLayout>
          <div>
            <h2 className="text-2xl font-medium">Plans</h2>
            <p className=" mt-1 text-sm text-muted-foreground">
              Manage your plans here.
            </p>
          </div>
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: paths.CHANNELS,
    element: (
      <AuthGuard>
        <DashboardLayout>
          <div>
            <h2 className="text-2xl font-medium">Channels</h2>
            <p className=" mt-1 text-sm text-muted-foreground">
              Manage your channels here.
            </p>
          </div>
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: paths.BILLING,
    element: (
      <AuthGuard>
        <DashboardLayout>
          <div>
            <h2 className="text-2xl font-medium">Billing</h2>
            <p className=" mt-1 text-sm text-muted-foreground">
              Manage your billing here.
            </p>
          </div>
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: paths.PROFILE,
    element: (
      <AuthGuard>
        <DashboardLayout>
          <div>
            <h2 className="text-2xl font-medium">Profile</h2>
            <p className=" mt-1 text-sm text-muted-foreground">
              Manage your profile here.
            </p>
          </div>
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: paths.HOME,
    element: <Navigate to={paths.DASHBOARD} replace />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
