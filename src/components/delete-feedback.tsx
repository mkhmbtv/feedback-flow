"use client";

import * as React from "react";
import { toast } from "sonner";
import { Feedback } from "@prisma/client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "./icons";
import { deleteFeedback } from "@/lib/actions";
import { Button } from "./ui/button";
import { catchErrors } from "@/lib/utils";

interface DeleteFeedbackProps {
  feedback: Feedback;
}

export default function DeleteFeedback({ feedback }: DeleteFeedbackProps) {
  return (
    <form
      action={() => {
        toast.promise(
          deleteFeedback({
            id: feedback.id,
            siteId: feedback.siteId,
            route: feedback.route,
          }),
          {
            loading: "Deleting...",
            success: () => "Feedback deleted successfully.",
            error: (err: unknown) => catchErrors(err),
          },
        );
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" type="submit">
            <Icons.delete className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete Feedback</p>
        </TooltipContent>
      </Tooltip>
    </form>
  );
}
