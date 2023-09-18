import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { CardSkeleton } from "@/components/card-skeleton";

export default function AccountLoading() {
  return (
    <DashboardShell>
      <DashboardHeader title="Account" description="Manage your account" />
      <CardSkeleton />
    </DashboardShell>
  );
}
