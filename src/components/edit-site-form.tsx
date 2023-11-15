"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Site } from "@prisma/client";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { updateSite } from "@/lib/actions";
import { catchErrors } from "@/lib/utils";
import { Icons } from "./icons";
import { UpdateSite } from "@/lib/validations/site";

type FormValues = z.infer<typeof UpdateSite>;

interface EditSiteFormProps {
  site: Pick<Site, "id" | "timestamps" | "socialLogos" | "ratings">;
  onSuccess: () => void;
}

export function EditSiteForm({ site, onSuccess }: EditSiteFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(UpdateSite),
    defaultValues: {
      timestamps: site.timestamps,
      socialLogos: site.socialLogos,
      ratings: site.ratings,
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      await updateSite(site.id, data);
      toast.success("Sucessfully edited your site.");
      onSuccess();
    } catch (error) {
      catchErrors(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="timestamps"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">Show Timestamp</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="socialLogos"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">Show Icon</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ratings"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">Show Rating</FormLabel>
            </FormItem>
          )}
        />
        <Button type="submit">
          {form.formState.isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
}
