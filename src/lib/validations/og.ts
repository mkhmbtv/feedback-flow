import * as z from "zod";

export const ogImageSchema = z.object({
  heading: z.string(),
  type: z.string(),
  description: z.string().optional(),
  mode: z.enum(["light", "dark"]).default("dark"),
});
