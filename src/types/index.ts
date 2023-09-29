import type { Feedback, User } from "@prisma/client";

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

type Feature = {
  icon: keyof typeof Icons;
  title: string;
  body: string;
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
  features: Feature[];
};

export type FeedbackWithAuthor = Feedback & { author: User };

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd?: number;
    isPro: boolean;
    isCanceled: boolean;
  };
