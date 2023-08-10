import type { LucideProps } from "lucide-react";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";

interface EmptyStateProps extends React.ComponentPropsWithoutRef<"div"> {}

export function EmptyState({ className, children, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "grid  min-h-[400px] place-items-center rounded-md border p-8 text-center",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

interface EmptyStateIconProps extends LucideProps {
  name: keyof typeof Icons;
}

EmptyState.Icon = function EmptyStateIcon({
  name,
  className,
  ...props
}: EmptyStateIconProps) {
  const Icon = Icons[name];

  if (!Icon) return null;

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
      <Icon className={cn("h-10 w-10", className)} {...props} />
    </div>
  );
};

interface EmptyStateTitleProps extends React.ComponentPropsWithoutRef<"h2"> {}

EmptyState.Title = function EmptyStateTitle({
  className,
  ...props
}: EmptyStateTitleProps) {
  return (
    <h2 className={cn("mt-6 text-xl font-semibold", className)} {...props} />
  );
};

interface EmptyStateDescriptionProps
  extends React.ComponentPropsWithoutRef<"p"> {}

EmptyState.Description = function EmptyStateDescription({
  className,
  ...props
}: EmptyStateDescriptionProps) {
  return (
    <p
      className={cn(
        "mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
