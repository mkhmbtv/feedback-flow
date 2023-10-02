import Link from "next/link";

import { Icons } from "./icons";
import { MainNavItem } from "@/types";
import { cn } from "@/lib/utils";

interface MainNavProps extends React.ComponentPropsWithoutRef<"div"> {
  items?: MainNavItem[];
}

export function MainNav({ items, className }: MainNavProps) {
  return (
    <div className={cn("items-center space-x-6 md:flex", className)}>
      <Link href={"/"} className="flex items-center space-x-2">
        <Icons.logo />
        <span className="hidden text-lg font-bold md:block">
          Feedback Flow
        </span>
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
