import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BillingLoading() {
  return (
    <DashboardShell className="space-y-4">
      <DashboardHeader
        title="Billing"
        description="Manage your billing and subscription"
      />
      <Card>
        <CardHeader className="gap-2">
          <Skeleton className="h-5 w-1/5" />
          <Skeleton className="h-4 w-4/5" />
        </CardHeader>
        <CardContent className="h-10" />
        <CardFooter>
          <Skeleton className="h-8 w-[120px]" />
        </CardFooter>
      </Card>
    </DashboardShell>
  );
}
