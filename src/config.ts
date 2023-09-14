import { MarketingConfig, SubscriptionPlan } from "./types";

export const marketingConfig: MarketingConfig = {
  mainNav: [
    { title: "Pricing", href: "/pricing" },
    { title: "Docs", href: "/docs" },
    { title: "Privacy", href: "/privacy" },
    { title: "Terms", href: "/terms" },
  ],
};

export const subscriptionPlans: { [key in "free" | "pro"]: SubscriptionPlan } =
  {
    free: {
      name: "Free",
      description:
        "The free plan is limited to 1 site. Upgrade to the Pro plan for unlimited sites.",
      stripePriceId: "",
    },
    pro: {
      name: "Pro",
      description: "The Pro plan has unlimited sites.",
      stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID!,
    },
  };
