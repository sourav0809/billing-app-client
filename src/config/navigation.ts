import { paths } from "@/routes/paths";

export const NAVIGATION_ITEMS = [
  {
    id: "customers",
    label: "Customers",
    icon: "Users",
    path: paths.CUSTOMERS,
  },
  {
    id: "plans",
    label: "Plans",
    icon: "Package",
    path: paths.PLANS,
  },
  {
    id: "channels",
    label: "Channels",
    icon: "Radio",
    path: paths.CHANNELS,
  },
  {
    id: "billing",
    label: "Billing",
    icon: "Receipt",
    path: paths.BILLING,
  },
] as const;
