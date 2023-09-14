import { Metadata } from "next";
import { redirect } from "next/navigation";

import { SubscriptionForm } from "@/components/subscription-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { getUserSubscription } from "@/lib/subscription";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Billing",
  description: "Manage your billing and subscription",
};

export default async function BillingPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const subscriptionPlan = await getUserSubscription(session.user.id);
  return (
    <DashboardShell className="space-y-4">
      <DashboardHeader
        title="Billing"
        description="Manage your billing and subscription"
      />
      <SubscriptionForm subscriptionPlan={subscriptionPlan} />
    </DashboardShell>
  );
}
