import { api } from "./api";

export type BannerPage = "CLASSES" | "PRODUCTS" | "ABOUT";

export type Banner = {
  id: string;
  page: BannerPage;
  imageUrl?: string;
  title?: string | null;
  subtitle?: string | null;
  linkUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BannerFormData = {
  title?: string | null;
  subtitle?: string | null;
  linkUrl?: string | null;
  isActive?: boolean;
  imageBase64?: string;
};

export async function getAdminBanners(): Promise<Banner[]> {
  const response = await api.get<Banner[]>("/admin/banners");
  return response.data;
}

export async function updateBanner(
  id: string,
  data: BannerFormData,
): Promise<Banner> {
  const response = await api.put<Banner>(`/admin/banners/${id}`, data);
  return response.data;
}

export async function getPublicBannerByPage(page: BannerPage): Promise<Banner> {
  const response = await api.get<Banner>(`/banners/${page}`);
  return response.data;
}
