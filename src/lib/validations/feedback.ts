import { z } from "zod";

export const feedbackSchema = z.object({
  siteId: z.string(),
  text: z.string().min(1, "Please enter your comment"),
  route: z.string(),
});

export const createFeedbackSchema = z.object({
  text: z.string().min(1, "Please enter your comment"),
});