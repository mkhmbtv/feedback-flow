"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarNavItem } from "@/types";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const pathname = usePathname();

  if (!items.length) return null;

  return (
    <nav className="flex w-full flex-col gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon ?? "chevronRight"];
        return (
          <Link key={index} href={item.href}>
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:text-accent-foreground",
                pathname === item.href ? "bg-accent" : "transparent",
                item.disabled && "cursor-not-allowed opacity-80",
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
