"use server";

import { z } from "zod";
import { revalidateTag } from "next/cache";

import {
  deleteSiteSchema,
  siteSchema,
  updateSiteSchema,
} from "./validations/site";
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

export async function addSite(rawData: z.infer<typeof siteSchema>) {
  const data = siteSchema.parse(rawData);

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
      ...data,
      authorId: session.user.id,
    },
  });

  revalidateTag(`${newSite.id}-data`);
}

export async function updateSite(rawData: z.infer<typeof updateSiteSchema>) {
  const { id, timestamps, socialLogos, ratings } =
    updateSiteSchema.parse(rawData);

  if (!hasSiteAccess(id)) {
    throw new Error("Unauthorized");
  }

  await db.site.update({
    where: {
      id: id,
    },
    data: {
      timestamps,
      socialLogos,
      ratings,
    },
  });

  revalidateTag(`${id}-data`);
}

export async function deleteSite(rawData: z.infer<typeof deleteSiteSchema>) {
  const { id } = deleteSiteSchema.parse(rawData);

  if (!hasSiteAccess(id)) {
    throw new Error("Unauthorized");
  }

  await db.site.delete({
    where: {
      id,
    },
  });

  revalidateTag(`${id}-data`);
}

export async function createFeedback(rawData: z.infer<typeof feedbackSchema>) {
  const data = feedbackSchema.parse(rawData);

  const session = await getAuthSession();
  if (!session || !hasSiteAccess(data.siteId)) {
    throw new Error("Unauthorized");
  }

  await db.feedback.create({
    data: {
      ...data,
      authorId: session.user.id,
      provider: session.user.provider,
    },
  });

  revalidateTag(`${data.siteId}-${data.route}-feedback`);
}

export async function updateFeedback(
  rawData: z.infer<typeof updateFeedbackSchema>,
) {
  const data = updateFeedbackSchema.parse(rawData);

  if (!hasSiteAccess(data.siteId)) {
    throw new Error("Unauthorized");
  }

  const { siteId, route } = await db.feedback.update({
    where: {
      id: data.id,
    },
    data: {
      status: data.status === "PENDING" ? "APPROVED" : "PENDING",
    },
  });

  revalidateTag(`${siteId}-${route}-feedback`);
}

export async function deleteFeedback(
  rawData: z.infer<typeof deleteFeedbackSchema>,
) {
  const { id, siteId, route } = deleteFeedbackSchema.parse(rawData);

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
  rawData: z.infer<typeof manageSubscriptionSchema>,
) {
  const data = manageSubscriptionSchema.parse(rawData);

  const billingUrl = absoluteUrl("/dashboard/billing");

  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("User not found");
  }

  if (data.isPro && data.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: data.stripeCustomerId,
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

export async function editUsername(rawData: z.infer<typeof userSchema>) {
  const data = userSchema.parse(rawData);

  const session = await getAuthSession();
  if (!session?.user || session.user.id !== data.id) {
    throw new Error("Unauthorized");
  }

  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: data.name,
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
