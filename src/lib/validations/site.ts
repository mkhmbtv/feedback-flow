import { z } from "zod";

export const SiteSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  url: z.string().url("Must be a valid URL"),
  timestamps: z.boolean(),
  socialLogos: z.boolean(),
  ratings: z.boolean(),
});

export const CreateSite = SiteSchema.omit({
  id: true,
  timestamps: true,
  socialLogos: true,
  ratings: true,
});

export const UpdateSite = SiteSchema.omit({ name: true, url: true, id: true });
