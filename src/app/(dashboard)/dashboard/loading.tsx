import { AddSiteModal } from "@/components/add-site-modal";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { SiteTable } from "@/components/site-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader title="Sites" description="Add and manage your sites">
        <AddSiteModal />
      </DashboardHeader>
      <div>
        <Table>
          <TableCaption>A list of your websites.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Site Link</TableHead>
              <TableHead>Feedback Link</TableHead>
              <TableHead className="text-right">Date Added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <SiteTable.SkeletonRow className="w-20" />
            <SiteTable.SkeletonRow className="w-32" />
            <SiteTable.SkeletonRow className="w-14" />
            <SiteTable.SkeletonRow className="w-28" />
            <SiteTable.SkeletonRow className="w-20" />
          </TableBody>
        </Table>
      </div>
    </DashboardShell>
  );
}
