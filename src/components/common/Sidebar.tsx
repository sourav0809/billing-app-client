import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  Package,
  Radio,
  Receipt,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVIGATION_ITEMS } from "@/config/navigation";
import { paths } from "@/routes/paths";
import { useAuth } from "@/features/auth";

const getIconComponent = (iconName: string) => {
  const iconMap = {
    Users,
    Package,
    Radio,
    Receipt,
  };
  return iconMap[iconName as keyof typeof iconMap] || Users;
};

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileSidebarOpen]);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const getNavigationItemClass = (path: string) => {
    const isActive = location.pathname === path;
    return cn(
      "flex cursor-pointer items-center p-3 transition-all",
      isActive
        ? "bg-blue-50 text-blue-600 rounded-lg"
        : "text-muted-foreground hover:bg-gray-50 hover:text-gray-900 rounded-lg"
    );
  };

  const getIconClass = (path: string) => {
    const isActive = location.pathname === path;
    return cn("h-6 w-6 shrink-0", isActive ? "text-blue-600" : "text-gray-500");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      closeMobileSidebar();
    }
  };

  const handleLogout = () => {
    logout();
    navigate(paths.LOGIN);
    if (isMobile) {
      closeMobileSidebar();
    }
  };

  return (
    <>
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-start gap-3 border-b bg-white px-4 shadow-sm">
          <button
            onClick={toggleMobileSidebar}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Billing</h1>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-white shadow-sm",
          isMobile
            ? cn(
                "fixed left-0 top-0 z-50 h-screen w-64 transform transition-transform duration-300 ease-in-out",
                isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
              )
            : "group fixed left-0 top-0 z-40 flex h-screen w-20 flex-col justify-between overflow-hidden border-r border-gray-200 transition-all duration-300 ease-in-out hover:w-64"
        )}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <div className="flex items-center justify-end p-4">
            <button
              onClick={closeMobileSidebar}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Top Section */}
        <div className={cn("p-4", !isMobile && "py-8")}>
          {/* Logo Section */}
          <div
            className={cn(
              "flex items-center justify-center",
              !isMobile ? "mb-6 h-24" : "mb-4"
            )}
          >
            <div
              className={cn(
                "flex items-center gap-3",
                !isMobile ? "h-20 flex-col" : "flex-row"
              )}
            >
              <div className="w-16 h-16 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span
                className={cn(
                  "font-bold text-gray-900",
                  !isMobile
                    ? "text-base opacity-0 transition-opacity duration-75 group-hover:opacity-100 group-hover:delay-300 group-hover:duration-300"
                    : "text-base"
                )}
              >
                Billing
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className={cn(!isMobile && "mt-5", "space-y-2")}>
            {NAVIGATION_ITEMS.map((item) => {
              const IconComponent = getIconComponent(item.icon);
              return (
                <div
                  key={item.id}
                  className={getNavigationItemClass(item.path)}
                  onClick={() => handleNavigation(item.path)}
                >
                  <IconComponent
                    className={getIconClass(item.path)}
                    strokeWidth={1.5}
                  />
                  <span
                    className={cn(
                      isMobile
                        ? "ml-3 text-base"
                        : "whitespace-nowrap text-sm opacity-0 transition-all duration-300 group-hover:translate-x-3 group-hover:opacity-100",
                      "text-base text-muted-foreground  "
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Icons (Profile & Logout) */}
        <div className="space-y-2 p-4">
          <div
            className={cn(
              "flex cursor-pointer items-center rounded-lg p-3 transition-all",
              location.pathname === paths.PROFILE
                ? "bg-blue-50 text-blue-600"
                : "text-muted-foreground hover:bg-gray-50 hover:text-gray-900"
            )}
            onClick={() => handleNavigation(paths.PROFILE)}
          >
            <User className="h-6 w-6 shrink-0" strokeWidth={1.5} />
            <span
              className={cn(
                isMobile
                  ? "ml-3 text-base"
                  : "ml-0 whitespace-nowrap text-sm opacity-0 transition-all group-hover:ml-3 group-hover:opacity-100",
                "text-base text-muted-foreground  "
              )}
            >
              Profile
            </span>
          </div>
          <div
            className="flex cursor-pointer items-center rounded-lg p-3 text-muted-foreground transition-all hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut
              className="h-6 w-6 shrink-0 text-red-500"
              strokeWidth={1.5}
            />
            <span
              className={cn(
                isMobile
                  ? "ml-3 text-base "
                  : "ml-0 whitespace-nowrap text-base opacity-0 transition-all group-hover:ml-3 group-hover:opacity-100",
                "text-base text-muted-foreground  "
              )}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
