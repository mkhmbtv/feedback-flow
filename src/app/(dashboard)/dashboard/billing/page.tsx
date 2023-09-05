import { Metadata } from "next";
import { SubscriptionForm } from "@/components/subscription-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";

export const metadata: Metadata = {
  title: "Billing",
  description: "Manage your billing and subscription",
};

export default function BillingPage() {
  return (
    <DashboardShell className="space-y-4">
      <DashboardHeader
        title="Billing"
        description="Manage your billing and subscription"
      />
      <SubscriptionForm />
    </DashboardShell>
  );
}
