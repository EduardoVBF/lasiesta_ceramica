import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(1, 'Nome da categoria é obrigatório'),
    slug: z.string().min(1, 'Slug da categoria é obrigatório'),
    imageUrl: z.url().optional(),
    isActive: z.boolean().default(true),
    isFeatured: z.boolean().optional(),
    imageBase64: z.string().optional(),
});

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;