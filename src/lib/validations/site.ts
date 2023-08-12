import { z } from "zod";

export const siteSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  url: z.string().url("Must be a valid URL"),
});
