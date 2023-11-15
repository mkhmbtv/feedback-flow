"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { CreateSite } from "@/lib/validations/site";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addSite } from "@/lib/actions";
import { Icons } from "./icons";
import { catchErrors } from "@/lib/utils";

interface AddSiteFormProps {
  onSuccess: () => void;
}

type FormValues = z.infer<typeof CreateSite>;

export function AddSiteForm({ onSuccess }: AddSiteFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(CreateSite),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await addSite(values);
      form.reset();
      toast.success("Sucessfully added your site.");
      onSuccess();
    } catch (error) {
      catchErrors(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My site" {...field} />
              </FormControl>
              <FormDescription>A name to identify your website</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://website.com" {...field} />
              </FormControl>
              <FormDescription>
                The full address of your website
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Add Site
        </Button>
      </form>
    </Form>
  );
}
