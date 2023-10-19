"use client";

import * as React from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Icons } from "./icons";
import { deleteSite } from "@/lib/actions";
import { catchErrors } from "@/lib/utils";

interface DeleteSiteProps {
  siteId: string;
}

export function DeleteSite({ siteId }: DeleteSiteProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center justify-center">
        <Icons.delete className="h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Site - are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will also delete all feedback left on the site and
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 focus:ring-red-600"
            onClick={async () => {
              try {
                setIsLoading(true);
                await deleteSite({ id: siteId });
                toast.success("Sucessfully deleted site.");
              } catch (error) {
                catchErrors(error);
              } finally {
                setIsLoading(false);
              }
            }}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
