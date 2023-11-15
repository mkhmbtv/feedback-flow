"use client";

import * as React from "react";
import { Feedback } from "@prisma/client";
import { toast } from "sonner";

import { Switch } from "./ui/switch";
import { updateFeedback } from "@/lib/actions";
import { catchErrors } from "@/lib/utils";

interface SwitchFeedbackStatusProps {
  feedback: Feedback;
}

export function SwitchFeedbackStatus({ feedback }: SwitchFeedbackStatusProps) {
  const [_, startTransition] = React.useTransition();
  const isChecked = feedback.status === "APPROVED";

  return (
    <Switch
      checked={isChecked}
      onCheckedChange={() => {
        startTransition(async () => {
          try {
            await updateFeedback(feedback);
            toast.success("Sucessfully updated feedback.");
          } catch (error) {
            catchErrors(error);
          }
        });
      }}
    />
  );
}
