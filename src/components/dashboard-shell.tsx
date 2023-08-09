import { cn } from "@/lib/utils";

interface DashboardShellProps extends React.ComponentPropsWithoutRef<"div"> {}

export function DashboardShell({className, children, ...props}: DashboardShellProps) {
    return (
        <div className={cn('grid items-start gap-8', className)} {...props}>
            {children}
        </div>
    )
}