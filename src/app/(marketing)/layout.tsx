import Link from "next/link";
import { getServerSession } from "next-auth";

import { MainNav } from "@/components/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { Icons } from "@/components/icons";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-50 bg-background">
        <div className="flex h-16 items-center justify-between">
          <MainNav />
          <nav>
            {session?.user ? (
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: "secondary" })}
              >
                Dashboard
                <Icons.chevronRight className="ml-1 h-4 w-4" />
              </Link>
            ) : (
              <Link
                href="/login"
                className={buttonVariants({ variant: "secondary" })}
              >
                Login
                <Icons.chevronRight className="ml-1 h-4 w-4" />
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
