import { notFound } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import { UserAccountNav } from "@/components/user-account-nav";
import { SidebarNav } from "@/components/dashboard-nav";
import { getAuthSession } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session?.user) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container sticky top-0 z-50 border-b bg-background">
        <div className="flex h-16 items-center justify-between">
          <MainNav />
          <UserAccountNav user={session.user} />
        </div>
      </header>
      <div className="container grid flex-1 gap-7 md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="-ml-2 hidden w-full border-r pr-6 pt-6 md:block">
          <SidebarNav />
        </aside>
        <main className="pt-6">{children}</main>
      </div>
    </div>
  );
}
