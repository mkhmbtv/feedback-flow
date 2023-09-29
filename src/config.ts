import { MarketingConfig, SubscriptionPlan } from "./types";

export const siteConfig = {
  name: "Feedback Flow",
  description: "Transform your static site with comments and reviews",
  github: "https://github.com/mkhmbtv/feedback-flow",
};

export const marketingConfig: MarketingConfig = {
  mainNav: [
    { title: "Pricing", href: "/pricing" },
    { title: "Docs", href: "/docs" },
    { title: "Privacy", href: "/privacy" },
    { title: "Terms", href: "/terms" },
  ],
  features: [
    {
      icon: "next",
      title: "Next.js 13",
      body: "Harness the power of Next.js 13 for blazing-fast web applications and cutting-edge development.",
    },
    {
      icon: "planetscale",
      title: "Database",
      body: "Built on the strength of PlanetScale for database management and Prisma as its ORM, ensuring reliability and efficiency at the core.",
    },
    {
      icon: "mdx",
      title: "MDX",
      body: "Enjoy dynamic and interactive content seamlessly, thanks to MDX",
    },
    {
      icon: "component",
      title: "User Interface",
      body: "Navigate and manage this app effortlessly with an intuitive user interface, designed for an exceptional user experience",
    },
    {
      icon: "auth",
      title: "NextAuth.js",
      body: "Enhanced security and user authentication made simple with NextAuth.js",
    },
    {
      icon: "stripe",
      title: "Stripe",
      body: "Elevate your experience by subscribing to our Pro Plan, granting you access to enhanced features and capabilities.",
    },
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
