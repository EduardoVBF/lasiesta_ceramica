import { z } from "zod";

/**
 * Helpers
 */

// aceita base64 de imagem ou URL (caso você use os dois)
const imageSchema = z.string().min(1, "Imagem inválida");

// cores: array simples de nomes (esmaltes)
const colorsSchema = z
  .array(z.string().min(1))
  .min(1, "Informe ao menos uma cor");

/**
 * CREATE
 */
export const createProductSchema = z
  .object({
    name: z.string().min(1, "Nome do produto é obrigatório"),
    slug: z.string().min(1, "Slug do produto é obrigatório"),

    price: z.number().positive("Preço deve ser maior que zero"),

    // promoção
    isSale: z.boolean().optional(),
    salePrice: z.number().positive().optional(),

    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    material: z.string().optional(),
    dimensions: z.string().optional(),

    colors: colorsSchema,

    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),

    orderIndex: z.number().int().positive().optional(),

    // imagens
    mainImageBase64: imageSchema,
    secondaryImagesBase64: z.array(imageSchema).max(4).optional(),

    // relacionamento
    categoryId: z.string().uuid("Categoria inválida").optional(),
  })
  .superRefine((data, ctx) => {
    // regra de promoção
    if (data.isSale) {
      if (!data.salePrice) {
        ctx.addIssue({
          path: ["salePrice"],
          message: "Preço promocional é obrigatório",
          code: z.ZodIssueCode.custom,
        });
      }

      if (data.salePrice && data.salePrice >= data.price) {
        ctx.addIssue({
          path: ["salePrice"],
          message: "Preço promocional deve ser menor que o preço normal",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

/**
 * UPDATE
 */
export const updateProductSchema = z
  .object({
    name: z.string().min(1).optional(),
    slug: z.string().min(1).optional(),

    price: z.number().positive().optional(),

    isSale: z.boolean().optional(),
    salePrice: z.number().positive().optional(),

    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    material: z.string().optional(),
    dimensions: z.string().optional(),

    colors: z.array(z.string().min(1)).optional(),

    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),

    orderIndex: z.number().int().positive().optional(),

    mainImageBase64: imageSchema.optional(),
    secondaryImagesBase64: z.array(imageSchema).max(4).optional(),

    categoryId: z.string().uuid().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isSale === true && !data.salePrice) {
      ctx.addIssue({
        path: ["salePrice"],
        message: "Preço promocional é obrigatório",
        code: z.ZodIssueCode.custom,
      });
    }
  });

/**
 * PARAMS
 */
export const productIdSchema = z.object({
  id: z.uuid("ID do produto inválido"),
});

export const productsQuerySchema = z.object({
  search: z.string().optional(),

  categoryId: z.uuid().optional(),
  categorySlug: z.string().optional(),

  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
});


/**
 * DTOs
 */
export type CreateProductDTO = z.infer<typeof createProductSchema>;
export type UpdateProductDTO = z.infer<typeof updateProductSchema>;
export type ProductsQueryDTO = z.infer<typeof productsQuerySchema>;