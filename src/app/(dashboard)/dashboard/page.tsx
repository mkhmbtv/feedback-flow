import { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { EmptyState } from "@/components/empty-state";
import { AddSiteModal } from "@/components/add-site-modal";
import { SiteTable } from "@/components/site-table";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getAuthSession();

  const sites = await db.site.findMany({
    where: {
      authorId: session?.user.id,
    },
    select: {
      id: true,
      name: true,
      url: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader title="Sites" description="Add and manage your sites">
        <AddSiteModal />
      </DashboardHeader>
      <div>
        {sites.length > 0 ? (
          <SiteTable sites={sites} />
        ) : (
          <EmptyState>
            <EmptyState.Icon name="layout" />
            <EmptyState.Title>No sites added</EmptyState.Title>
            <EmptyState.Description>
              You haven&apos;t added any sites. Let&apos;s get started.
            </EmptyState.Description>
            <AddSiteModal />
          </EmptyState>
        )}
      </div>
    </DashboardShell>
  );
}
