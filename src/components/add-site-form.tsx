"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { siteSchema } from "@/lib/validations/site";
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
import { useToast } from "./ui/use-toast";
import { Icons } from "./icons";

interface AddSiteFormProps {
  onSuccess: () => void;
}

type FormValues = z.infer<typeof siteSchema>;

export function AddSiteForm({ onSuccess }: AddSiteFormProps) {
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(siteSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      try {
        await addSite(values);
        form.reset();
        toast({
          title: "Sucessfully added your site.",
        });
        onSuccess();
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors = error.issues.map((issue) => issue.message);
          toast({
            title: errors.join("\n"),
            variant: "destructive",
          });
        } else if (error instanceof Error) {
          toast({
            title: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Something went wrong, please try again later.",
            variant: "destructive",
          });
        }
      }
    });
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
        <Button type="submit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Add Site
        </Button>
      </form>
    </Form>
  );
}
