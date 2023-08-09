import { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader title="Sites" description="Add and manage your sites">
        <Button>New site</Button>
      </DashboardHeader>
    </DashboardShell>
  );
}
