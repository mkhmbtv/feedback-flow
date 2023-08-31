"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { siteSchema } from "./validations/site";
import { feedbackSchema } from "./validations/feedback";
import { getAuthSession } from "./auth";
import { db } from "./db";

export async function addSite(input: z.infer<typeof siteSchema>) {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
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

export async function deleteFeedback(
  id: string,
) {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const feedback = await db.feedback.findUnique({
    where: {
      id,
    },
  });

  if (!feedback) {
    throw new Error("Feedback not found.");
  }

  await db.feedback.delete({
    where: {
      id,
    },
  });
}
