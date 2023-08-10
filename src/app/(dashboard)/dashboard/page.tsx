import { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { Icons } from "@/components/icons";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader title="Sites" description="Add and manage your sites">
        <Button>
          <Icons.add className="mr-2 h-4 w-4" />
          New site
        </Button>
      </DashboardHeader>
      <div>
        <EmptyState>
          <EmptyState.Icon name="layout" />
          <EmptyState.Title>No sites added</EmptyState.Title>
          <EmptyState.Description>
            You haven&apos;t added any sites. Let&apos;s get started.
          </EmptyState.Description>
          <Button variant="outline">
            <Icons.add className="mr-2 h-4 w-4" />
            New site
          </Button>
        </EmptyState>
      </div>
    </DashboardShell>
  );
}
