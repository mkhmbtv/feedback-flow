import Link from "next/link";

import { Icons } from "./icons";

type NavItem = {
  title: string;
  href: string;
};

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex items-center space-x-6">
      <Link href={"/"} className="flex items-center space-x-2">
        <Icons.logo />
        <span className="text-lg font-bold">Feedback Flow</span>
      </Link>
      <nav className="flex space-x-6">
        {items?.map((item, index) => (
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
