import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { LoginForm } from '@/features/auth';
import { AuthGuard } from './guards/AuthGuard';
import { paths } from './paths';

const router = createBrowserRouter([
  {
    path: paths.LOGIN,
    element: (
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    ),
  },
  {
    path: paths.DASHBOARD,
    element: (
      <AuthGuard>
        <DashboardLayout>
          <div>
            <h2 className="text-3xl font-bold">Welcome to Dashboard</h2>
            <p className="mt-4 text-muted-foreground">Your dashboard content goes here.</p>
          </div>
        </DashboardLayout>
      </AuthGuard>
    ),
  },
  {
    path: paths.HOME,
    element: <div>Home Page</div>,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

