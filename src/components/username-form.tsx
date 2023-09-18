"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@prisma/client";
import { toast } from "sonner";

import { updateUsernameSchema } from "@/lib/validations/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { catchErrors, cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { editUsername } from "@/lib/actions";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";

interface UsernameUpdateFormProps
  extends React.ComponentPropsWithoutRef<"form"> {
  user: Pick<User, "id" | "name">;
}

type FormValues = z.infer<typeof updateUsernameSchema>;

export function UsernameUpdateForm({
  user,
  className,
  ...props
}: UsernameUpdateFormProps) {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: {
      name: user.name || "",
    },
  });

  function onSubmit(data: FormValues) {
    startTransition(async () => {
      try {
        await editUsername({
          id: user.id,
          ...data,
        });

        toast.success("Successully updated your name");
        router.refresh();
      } catch (error) {
        catchErrors(error);
      }
    });
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your name</CardTitle>
          <CardDescription>
            Please provide your desired name below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
