import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import { authOptions } from "@/lib/auth";
import { UserAccountNav } from "@/components/user-account-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="container sticky top-0 z-50 border-b bg-background">
        <div className="flex h-16 items-center justify-between">
          <MainNav />
          <UserAccountNav user={session.user} />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
