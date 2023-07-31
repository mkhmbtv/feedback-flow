import Link from "next/link";

import { MainNav } from "@/components/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-50 bg-background">
        <div className="flex h-16 items-center justify-between">
          <MainNav />
          <nav>
            <Link
              href="#"
              className={cn(buttonVariants({ variant: "secondary" }), "px-4")}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
