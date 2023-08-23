import type { Feedback, Site, User } from "@prisma/client";
import dayjs from "dayjs";

import { Icons } from "./icons";
import { Separator } from "./ui/separator";

interface FeedbackProps {
  data: Pick<Feedback, "text" | "provider" | "createdAt"> & {
    author: Pick<User, "name">;
    site: Pick<Site, "socialLogos" | "timestamps" | "ratings">;
  };
  isLast: boolean;
}

export function Feedback({ data, isLast }: FeedbackProps) {
  const { text, provider, author, site, createdAt } = data;

  const Icon = Icons[provider as "github"];

  return (
    <div className="w-full md:w-2/3">
      <div className="flex items-center space-x-2">
        <h3 className="font-semibold">{author.name}</h3>
        {site.socialLogos && <Icon className="h-4 w-4" />}
      </div>
      {site.timestamps && (
        <div className="text-xs text-muted-foreground">
          {dayjs(createdAt).format("MMM D, YYYY h:mm A")}
        </div>
      )}
      <p className="mt-4">{text}</p>
      {!isLast && <Separator className="my-6" />}
    </div>
  );
}
