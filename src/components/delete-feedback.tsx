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
import { deleteFeedback } from "@/lib/actions";
import { catchErrors } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface DeleteFeedbackProps {
  feedbackId: string;
}

export default function DeleteFeedback({ feedbackId }: DeleteFeedbackProps) {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center justify-center">
        <Icons.delete className="h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Feedback - are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 focus:ring-red-600"
            onClick={() => {
              try {
                startTransition(async () => {
                  await deleteFeedback({ id: feedbackId });
                  toast.success("Sucessfully deleted feedback.");
                  router.refresh();
                });
              } catch (error) {
                catchErrors(error);
              }
            }}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
