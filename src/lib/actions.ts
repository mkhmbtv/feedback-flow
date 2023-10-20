"use server";

import { z } from "zod";
import { revalidateTag } from "next/cache";

import { deleteSiteSchema, siteSchema } from "./validations/site";
import {
  deleteFeedbackSchema,
  feedbackSchema,
  updateFeedbackSchema,
} from "./validations/feedback";
import { manageSubscriptionSchema } from "./validations/stripe";
import { userSchema } from "./validations/user";
import { getAuthSession } from "./auth";
import { db } from "./db";
import { absoluteUrl } from "./utils";
import { stripe } from "./stripe";
import { subscriptionPlans } from "@/config";
import { getUserSubscription } from "./subscription";

export async function addSite(input: z.infer<typeof siteSchema>) {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const subscriptionPlan = await getUserSubscription(session.user.id);

  if (!subscriptionPlan.isPro) {
    const sitesCount = await db.site.count({
      where: {
        authorId: session.user.id,
      },
    });

    if (sitesCount >= 1) {
      throw new Error(
        "Site limit reached. Upgrade to a pro plan to add more sites.",
      );
    }
  }

  const newSite = await db.site.create({
    data: {
      name: input.name,
      url: input.url,
      authorId: session.user.id,
    },
  });

  revalidateTag(`${newSite.id}-data`);
}

export async function deleteSite(input: z.infer<typeof deleteSiteSchema>) {
  if (!hasSiteAccess(input.id)) {
    throw new Error("Unauthorized");
  }

  await db.site.delete({
    where: {
      id: input.id,
    },
  });

  revalidateTag(`${input.id}-data`);
}

export async function createFeedback(input: z.infer<typeof feedbackSchema>) {
  const session = await getAuthSession();
  if (!session || !hasSiteAccess(input.siteId)) {
    throw new Error("Unauthorized");
  }

  await db.feedback.create({
    data: {
      ...input,
      authorId: session.user.id,
      provider: session.user.provider,
    },
  });

  revalidateTag(`${input.siteId}-${input.route}-feedback`);
}

export async function updateFeedback(
  input: z.infer<typeof updateFeedbackSchema>,
) {
  if (!hasSiteAccess(input.siteId)) {
    throw new Error("Unauthorized");
  }

  const { siteId, route } = await db.feedback.update({
    where: {
      id: input.id,
    },
    data: {
      status: input.status === "PENDING" ? "APPROVED" : "PENDING",
    },
  });

  revalidateTag(`${siteId}-${route}-feedback`);
}

export async function deleteFeedback(
  input: z.infer<typeof deleteFeedbackSchema>,
) {
  const { id, siteId, route } = input;

  if (!hasSiteAccess(siteId)) {
    throw new Error("Unauthorized");
  }

  await db.feedback.delete({
    where: {
      id,
    },
  });

  revalidateTag(`${siteId}-${route}-feedback`);
}

export async function manageSubscription(
  input: z.infer<typeof manageSubscriptionSchema>,
) {
  const billingUrl = absoluteUrl("/dashboard/billing");

  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("User not found");
  }

  if (input.isPro && input.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: input.stripeCustomerId,
      return_url: billingUrl,
    });

    return {
      url: stripeSession.url,
    };
  }

  // If the user is not subscribed to a plan, we create a Stripe Checkout session
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billingUrl,
    cancel_url: billingUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: session.user.email!,
    line_items: [
      {
        price: subscriptionPlans.pro.stripePriceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: session.user.id,
    },
  });

  return {
    url: stripeSession.url,
  };
}

export async function editUsername(input: z.infer<typeof userSchema>) {
  const session = await getAuthSession();
  if (!session?.user || session.user.id !== input.id) {
    throw new Error("Unauthorized");
  }

  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: input.name,
    },
  });
}

async function hasSiteAccess(siteId: string) {
  const session = await getAuthSession();

  const count = await db.site.count({
    where: {
      id: siteId,
      authorId: session?.user.id,
    },
  });

  return count > 0;
}
