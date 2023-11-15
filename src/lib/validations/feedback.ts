import { z } from "zod";

export const FeedbackSchema = z.object({
  id: z.string(),
  siteId: z.string(),
  text: z.string().min(1, "Please enter your comment"),
  route: z.string(),
  status: z.string(),
});

export const CreateFeedback = FeedbackSchema.omit({
  id: true,
  status: true,
});

export const UpdateFeedback = FeedbackSchema.omit({
  text: true,
  route: true,
});

export const DeleteFeedback = FeedbackSchema.omit({
  text: true,
  status: true,
});
