import { z } from "zod";

export const createPlanSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  price: z.number().positive().optional(),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  durationLabel: z.string().optional(),
  isFeatured: z.boolean().optional(),
  orderIndex: z.number().optional(),
  isActive: z.boolean().optional(),
  imageBase64: z.string().optional(),
});

export type CreatePlanDTO = z.infer<typeof createPlanSchema>;
