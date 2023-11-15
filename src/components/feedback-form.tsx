"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { createFeedback } from "@/lib/actions";
import { catchErrors } from "@/lib/utils";
import { Icons } from "./icons";

interface FeedbackFormProps {
  siteId: string;
}

const FormSchema = z.object({
  text: z.string().min(1, "Please enter your comment"),
});

type FormValues = z.infer<typeof FormSchema>;

export function FeedbackForm({ siteId }: FeedbackFormProps) {
  const { site: siteParams } = useParams() as { site: string[] };
  const route = siteParams.length > 1 ? siteParams[1] : null;

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createFeedback({
        siteId,
        text: data.text,
        route: route ?? "/",
      });
      form.reset();
      toast.success("Successully created comment");
    } catch (error) {
      catchErrors(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 md:w-2/3"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Leave a comment"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Comments are initially in a &quot;pending&quot; state. Your
                comment will appear after the site owner approves it.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Leave Feedback
        </Button>
      </form>
    </Form>
  );
}
