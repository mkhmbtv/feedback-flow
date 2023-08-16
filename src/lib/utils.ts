import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function catchErrors(error: unknown) {
  if (error instanceof z.ZodError) {
    const errors = error.issues.map((issue) => issue.message);
    return toast.error(errors.join("\n"));
  } else if (error instanceof Error) {
    return toast.error(error.message);
  } else {
    return toast.error("Something went wrong, please try again later.");
  }
}
