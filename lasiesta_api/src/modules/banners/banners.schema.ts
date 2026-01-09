import { z } from "zod";

export enum BannerPage {
  CLASSES = "CLASSES",
  PRODUCTS = "PRODUCTS",
  ABOUT = "ABOUT",
}

export const BannerSchema = z.object({
  id: z.uuid(),
  page: z.enum(BannerPage),
  imageUrl: z.url().optional(),
  title: z.string().min(1).max(100).optional(),
  subtitle: z.string().max(600).optional().nullable(),
  linkUrl: z.url().optional().nullable(),
  isActive: z.boolean().default(true),
  imageBase64: z.string().optional(),
});

export const updateBannerSchema = BannerSchema.partial();

export type BannerDTO = z.infer<typeof BannerSchema>;
export type UpdateBannerDTO = z.infer<typeof updateBannerSchema>;
