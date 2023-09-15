"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { siteSchema } from "./validations/site";
import {
  deleteFeedbackSchema,
  feedbackSchema,
  updateFeedbackSchema,
} from "./validations/feedback";
import { manageSubscriptionSchema } from "./validations/stripe";
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

  await db.site.create({
    data: {
      name: input.name,
      url: input.url,
      authorId: session.user.id,
    },
  });

  revalidatePath("/dashboard");
}

export async function createFeedback(input: z.infer<typeof feedbackSchema>) {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.feedback.create({
    data: {
      ...input,
      authorId: session.user.id,
      provider: session.user.provider,
    },
  });

  revalidatePath(`/site/${input.siteId}`);
}

export async function updateFeedback(
  input: z.infer<typeof updateFeedbackSchema>,
) {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.feedback.update({
    where: {
      id: input.id,
    },
    data: {
      status: input.status === "PENDING" ? "APPROVED" : "PENDING",
    },
  });

  revalidatePath("/dashboard/feedback");
}

export async function deleteFeedback(
  input: z.infer<typeof deleteFeedbackSchema>,
) {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const feedback = await db.feedback.findUnique({
    where: {
      id: input.id,
    },
  });

  if (!feedback) {
    throw new Error("Feedback not found.");
  }

  await db.feedback.delete({
    where: {
      id: input.id,
    },
  });
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
