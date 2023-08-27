import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { SkeletonTableRow } from "@/components/skeleton-table-row";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function FeedbackLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        title="Feedback"
        description="Manage feedback for your sites"
      />
      <div>
        <Table>
          <TableCaption>Feedback left for your sites</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Route</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <SkeletonTableRow className="w-20" />
            <SkeletonTableRow className="w-32" />
            <SkeletonTableRow className="w-14" />
            <SkeletonTableRow className="w-28" />
            <SkeletonTableRow className="w-20" />
          </TableBody>
        </Table>
      </div>
    </DashboardShell>
  );
}
