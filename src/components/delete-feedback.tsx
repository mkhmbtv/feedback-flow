"use client";

import * as React from "react";
import { toast } from "sonner";
import { Feedback } from "@prisma/client";

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

interface DeleteFeedbackProps {
  feedback: Feedback;
}

export default function DeleteFeedback({ feedback }: DeleteFeedbackProps) {
  const [isLoading, setIsLoading] = React.useState(false);

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
            onClick={async () => {
              try {
                setIsLoading(true);
                await deleteFeedback(feedback);
                toast.success("Sucessfully deleted feedback.");
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
