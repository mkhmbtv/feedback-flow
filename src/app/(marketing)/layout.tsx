import Link from "next/link";

import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { Icons } from "@/components/icons";
import { marketingConfig } from "@/config";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-50 border-b bg-background">
        <div className="flex h-16 items-center justify-between">
          <MainNav items={marketingConfig.mainNav} />
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
      <Footer />
    </div>
  );
}
