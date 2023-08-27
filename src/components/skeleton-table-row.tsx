import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonTableRowProps extends React.ComponentPropsWithoutRef<"div"> {}

export function SkeletonTableRow({
  className,
  ...props
}: SkeletonTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className={cn("h-4", className)} {...props} />
      </TableCell>
      <TableCell>
        <Skeleton className={cn("h-4", className)} {...props} />
      </TableCell>
      <TableCell>
        <Skeleton className={cn("h-4", className)} {...props} />
      </TableCell>
      <TableCell>
        <Skeleton className={cn("ml-auto h-4", className)} {...props} />
      </TableCell>
    </TableRow>
  );
}
