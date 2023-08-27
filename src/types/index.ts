import { Icons } from "@/components/icons";
import type { Feedback, User } from "@prisma/client";

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

export type FeedbackWithAuthor = Feedback & { author: User };
