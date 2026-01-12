import { z } from "zod";

export const HomeCarouselSchema = z.object({
  id: z.uuid().optional(),

  imageUrl: z.url().optional(),
  imageBase64: z.string().optional(),

  title: z.string().min(1).max(100).optional().nullable(),
  subtitle: z.string().max(600).optional().nullable(),
  linkUrl: z.string().url().optional().nullable(),

  isActive: z.boolean().default(true),
  orderIndex: z.number().int().optional(),
});

export const CreateHomeCarouselSchema = z
  .object({
    imageBase64: z.string().optional(),
    imageUrl: z.url().optional(),

    title: z.string().min(1).max(100).optional().nullable(),
    subtitle: z.string().max(600).optional().nullable(),
    linkUrl: z.string().url().optional().nullable(),

    isActive: z.boolean().optional(),
    orderIndex: z.number().int().optional(),
  })
  .refine((data) => data.imageBase64 || data.imageUrl, {
    message: "Imagem é obrigatória",
    path: ["imageBase64"],
  });

export const UpdateHomeCarouselSchema = HomeCarouselSchema.partial();

export const HomeCarouselIdSchema = z.object({
  id: z.uuid("ID do item do carrossel inválido"),
});

export const ReorderHomeCarouselSchema = z.array(
  z.object({
    id: z.uuid(),
    orderIndex: z.number().int(),
  })
);

export type CreateHomeCarouselDTO = z.infer<typeof CreateHomeCarouselSchema>;
export type UpdateHomeCarouselDTO = z.infer<typeof UpdateHomeCarouselSchema>;

export type ReorderHomeCarouselDTO = z.infer<typeof ReorderHomeCarouselSchema>;
