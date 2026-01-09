import { z } from "zod";

export const createPlanSchema = z.object({
  name: z.string().min(1, "Nome do plano é obrigatório"),
  slug: z.string().min(1, "Slug do plano é obrigatório"),
  price: z.number().positive().optional(),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  durationLabel: z.string().optional(),
  isFeatured: z.boolean().optional(),
  orderIndex: z.number().optional(),
  isActive: z.boolean().optional(),
  imageBase64: z.string().optional(),
});

export const planIdSchema = z.object({
  id: z.string().uuid("ID do plano inválido"),
});

export type CreatePlanDTO = z.infer<typeof createPlanSchema>;
