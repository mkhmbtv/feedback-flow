"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { catchErrors, cn, formatDate } from "@/lib/utils";
import { Icons } from "./icons";
import { manageSubscription } from "@/lib/actions";
import { UserSubscriptionPlan } from "@/types";

interface SubscriptionFormProps extends React.ComponentPropsWithoutRef<"form"> {
  subscriptionPlan: UserSubscriptionPlan;
}

export function SubscriptionForm({
  className,
  subscriptionPlan,
  ...props
}: SubscriptionFormProps) {
  const [isPending, startTransition] = React.useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      try {
        const session = await manageSubscription({
          stripePriceId: subscriptionPlan.stripePriceId,
          stripeCustomerId: subscriptionPlan.stripeCustomerId,
          stripeSubscriptionId: subscriptionPlan.stripeSubscriptionId,
          isPro: subscriptionPlan.isPro,
        });
        if (session) {
          window.location.href = session.url ?? "/dashboard/billing";
        }
      } catch (error) {
        catchErrors(error);
      }
    });
  }

  return (
    <form className={cn(className)} {...props} onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            You are currently on the <strong>{subscriptionPlan.name}</strong>{" "}
            plan.
          </CardDescription>
        </CardHeader>
        <CardContent>{subscriptionPlan.description}</CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:justify-between">
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {subscriptionPlan.isPro ? "Manage Subscription" : "Upgrade to Pro"}
          </Button>
          {subscriptionPlan.isPro ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on "}
              {subscriptionPlan.stripeCurrentPeriodEnd
                ? formatDate(subscriptionPlan.stripeCurrentPeriodEnd)
                : null}
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  );
}
