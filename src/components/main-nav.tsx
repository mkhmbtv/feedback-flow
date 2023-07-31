import Link from "next/link";
import { Icons } from "./icons";

const navItems = [
  { title: "Pricing", href: "/pricing" },
  { title: "Docs", href: "/docs" },
  { title: "Privacy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
];

export function MainNav() {
  return (
    <div className="flex items-center space-x-6">
      <Link href={"/"} className="flex items-center space-x-2">
        <Icons.logo />
        <span className="text-lg font-bold">Feedback Flow</span>
      </Link>
      <nav className="flex space-x-6">
        {navItems.map((item, index) => (
          <Link
            key={`${item.href}-${index}`}
            href={item.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground/80"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
