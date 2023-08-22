"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useSelectedLayoutSegments } from "next/navigation";

import { SidebarNavItem } from "@/types";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

export function SidebarNav() {
  const segments = useSelectedLayoutSegments();
  const { site: siteParams } = useParams() as { site?: string[] };
  const siteId = siteParams ? siteParams[0] : null;
  const route = siteParams && siteParams.length > 1 ? siteParams[1] : "";
  const pathname = `/${segments.join("/")}`;

  const tabs: SidebarNavItem[] = React.useMemo(() => {
    if (segments[0] === "site" && siteId) {
      return [
        {
          title: "Back to dashboard",
          href: "/dashboard",
          icon: "chevronLeft",
        },
        {
          title: "Comments",
          href: `/site/${siteId}/${route}`,
          icon: "comments",
        },
      ];
    } else {
      return [
        {
          title: "Account",
          href: "/dashboard/account",
          icon: "user",
        },
        {
          title: "Sites",
          href: "/dashboard",
          icon: "site",
        },
        {
          title: "Feedback",
          href: "/dashboard/feedback",
          icon: "feedback",
        },
        {
          title: "Billing",
          href: "/dashboard/billing",
          icon: "billing",
        },
      ];
    }
  }, [segments, siteId, route]);

  return (
    <nav className="flex w-full flex-col gap-2">
      {tabs.map((item) => {
        const Icon = Icons[item.icon ?? "chevronRight"];
        return (
          <Link key={item.title} href={item.href}>
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
