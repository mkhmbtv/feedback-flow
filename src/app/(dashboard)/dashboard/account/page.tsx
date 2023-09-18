import { Metadata } from "next";
import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { UsernameUpdateForm } from "@/components/username-form";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your account",
};

export default async function AccountPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader title="Account" description="Manage your account" />
      <div>
        <UsernameUpdateForm
          user={{ id: session.user.id, name: session.user.name || "" }}
        />
      </div>
    </DashboardShell>
  );
}
