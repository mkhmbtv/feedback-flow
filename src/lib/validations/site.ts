import { z } from "zod";

export const siteSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  url: z.string().url("Must be a valid URL"),
});

export const updateSiteSchema = z.object({
  id: z.string(),
  timestamps: z.boolean(),
  socialLogos: z.boolean(),
  ratings: z.boolean(),
});

export const deleteSiteSchema = z.object({
  id: z.string(),
});
