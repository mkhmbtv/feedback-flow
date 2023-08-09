import { Icons } from "@/components/icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = NavItem & {
  external?: boolean;
  icon?: keyof typeof Icons;
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
};
