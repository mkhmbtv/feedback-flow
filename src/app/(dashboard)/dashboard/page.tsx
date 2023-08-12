import { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { EmptyState } from "@/components/empty-state";
import { AddSiteModal } from "@/components/add-site-modal";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader title="Sites" description="Add and manage your sites">
        <AddSiteModal />
      </DashboardHeader>
      <div>
        <EmptyState>
          <EmptyState.Icon name="layout" />
          <EmptyState.Title>No sites added</EmptyState.Title>
          <EmptyState.Description>
            You haven&apos;t added any sites. Let&apos;s get started.
          </EmptyState.Description>
          <AddSiteModal />
        </EmptyState>
      </div>
    </DashboardShell>
  );
}
