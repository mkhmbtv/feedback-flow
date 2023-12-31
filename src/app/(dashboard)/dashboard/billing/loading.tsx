import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { CardSkeleton } from "@/components/card-skeleton";

export default function BillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        title="Billing"
        description="Manage your billing and subscription"
      />
      <CardSkeleton />
    </DashboardShell>
  );
}
