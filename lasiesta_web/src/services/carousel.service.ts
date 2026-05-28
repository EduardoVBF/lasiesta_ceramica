import { api } from "./api";

export type HomeCarouselItem = {
  id: string;
  imageUrl: string;
  title?: string | null;
  subtitle?: string | null;
  linkUrl?: string | null;
  isActive: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
};

export type HomeCarouselFormData = {
  title?: string | null;
  subtitle?: string | null;
  linkUrl?: string | null;
  isActive?: boolean;
  imageBase64?: string;
  imageUrl?: string; // fallback (caso não troque imagem)
};

export type HomeCarouselReorderItem = {
  id: string;
  orderIndex: number;
};

// Público
export async function getHomeCarousel(): Promise<HomeCarouselItem[]> {
  const response = await api.get<HomeCarouselItem[]>("/home-carousel");
  return response.data;
}

// Admin
export async function getAdminHomeCarousel(): Promise<HomeCarouselItem[]> {
  const response = await api.get<HomeCarouselItem[]>("/admin/home-carousel");
  return response.data;
}

export async function createHomeCarouselItem(
  data: HomeCarouselFormData,
): Promise<HomeCarouselItem> {
  const response = await api.post<HomeCarouselItem>(
    "/admin/home-carousel",
    data,
  );
  return response.data;
}

export async function updateHomeCarouselItem(
  id: string,
  data: HomeCarouselFormData,
): Promise<HomeCarouselItem> {
  const response = await api.put<HomeCarouselItem>(
    `/admin/home-carousel/${id}`,
    data,
  );
  return response.data;
}

export async function reorderHomeCarousel(
  items: HomeCarouselReorderItem[],
): Promise<HomeCarouselItem[]> {
  const response = await api.patch<HomeCarouselItem[]>(
    "/admin/home-carousel/reorder",
    items,
  );
  return response.data;
}
