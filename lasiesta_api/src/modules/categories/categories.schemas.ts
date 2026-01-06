import { z } from 'zod';
import { is } from 'zod/v4/locales';

export const createCategorySchema = z.object({
    name: z.string().min(1, 'Nome da categoria é obrigatório'),
    slug: z.string().min(1, 'Slug da categoria é obrigatório'),
    imageUrl: z.url().optional(),
    isActive: z.boolean().default(true),
});

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;