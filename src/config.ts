import { DashboardConfig, MarketingConfig } from "./types";

export const marketingConfig: MarketingConfig = {
  mainNav: [
    { title: "Pricing", href: "/pricing" },
    { title: "Docs", href: "/docs" },
    { title: "Privacy", href: "/privacy" },
    { title: "Terms", href: "/terms" },
  ],
};

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Account",
      href: "/dashboard/account",
      icon: "user",
    },
    {
      title: "Sites",
      href: "/dashboard",
      icon: "site",
    },
    {
      title: "Feedback",
      href: "/dashboard/feedback",
      icon: "feedback",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
  ],
};
