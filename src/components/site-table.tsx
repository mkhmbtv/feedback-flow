import Link from "next/link";
import dayjs from "dayjs";
import { Site } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { DeleteSite } from "./delete-site";

interface SiteTableProps {
  sites: Pick<Site, "id" | "name" | "url" | "createdAt">[];
}

export function SiteTable({ sites }: SiteTableProps) {
  return (
    <Table>
      <TableCaption>A list of your websites.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Site Link</TableHead>
          <TableHead>Feedback Link</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead className="w-[50px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {sites.map((site) => (
          <TableRow key={site.id}>
            <TableCell>{site.name}</TableCell>
            <TableCell>
              <a
                href={site.url}
                className={cn(
                  buttonVariants({ variant: "link", size: "sm" }),
                  "px-0",
                )}
              >
                {site.url}
              </a>
            </TableCell>
            <TableCell>
              <Link
                href={`/site/${site.id}`}
                className={cn(
                  buttonVariants({ variant: "link", size: "sm" }),
                  "px-0",
                )}
              >
                View Feedback
              </Link>
            </TableCell>
            <TableCell>
              {dayjs(site.createdAt).format("MMM D, YYYY h:mm A")}
            </TableCell>
            <TableCell>
              <DeleteSite siteId={site.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
