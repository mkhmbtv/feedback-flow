"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "./icons";
import { deleteSite } from "@/lib/actions";
import { Button } from "./ui/button";
import { catchErrors } from "@/lib/utils";

interface DeleteSiteProps {
  siteId: string;
}

export function DeleteSite({ siteId }: DeleteSiteProps) {
  return (
    <form
      action={() => {
        toast.promise(deleteSite(siteId), {
          loading: "Deleting...",
          success: () => "Site deleted successfully.",
          error: (err: unknown) => catchErrors(err),
        });
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" type="submit">
            <Icons.delete className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete Site</p>
        </TooltipContent>
      </Tooltip>
    </form>
  );
}
