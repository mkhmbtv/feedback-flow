import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
});

export const updateUsernameSchema = z.object({
  name: z.string().min(2, "Username must be at least 2 characters long"),
});
