import { MainNav } from "@/components/main-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="container sticky top-0 z-50 border-b bg-background">
        <div className="flex h-16 items-center justify-between">
          <MainNav />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
