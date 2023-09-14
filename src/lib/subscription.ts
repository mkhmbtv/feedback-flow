import { db } from "./db";
import { stripe } from "./stripe";
import { UserSubscriptionPlan } from "@/types";
import { subscriptionPlans } from "@/config";

export async function getUserSubscription(
  userId: string,
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if user is subscribed
  const isPro =
    !!user.stripePriceId &&
    !!user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now();

  const plan = isPro ? subscriptionPlans.pro : subscriptionPlans.free;

  // Check if user has canceled subscription
  let isCanceled = false;
  if (isPro && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId,
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...user,
    ...plan,
    isPro,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isCanceled,
  };
}
