import { api } from "./api";

/**
 * ======================
 * TYPES
 * ======================
 */

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

/**
 * ======================
 * API CALLS
 * ======================
 */

// 🌍 Público — carrossel ativo (site)
export async function getHomeCarousel() {
  const response = await api.get<HomeCarouselItem[]>(
    "/home-carousel"
  );
  return response.data;
}

// 🔐 Admin — listar todos
export async function getAdminHomeCarousel() {
  const response = await api.get<HomeCarouselItem[]>(
    "/admin/home-carousel"
  );
  return response.data;
}

// 🔐 Admin — criar slide
export async function createHomeCarouselItem(
  data: HomeCarouselFormData
) {
  const response = await api.post<HomeCarouselItem>(
    "/admin/home-carousel",
    data
  );
  return response.data;
}

// 🔐 Admin — editar slide
export async function updateHomeCarouselItem(
  id: string,
  data: HomeCarouselFormData
) {
  const response = await api.put<HomeCarouselItem>(
    `/admin/home-carousel/${id}`,
    data
  );
  return response.data;
}

// 🔐 Admin — reorder (drag & drop)
export async function reorderHomeCarousel(
  items: HomeCarouselReorderItem[]
) {
  const response = await api.patch(
    "/admin/home-carousel/reorder",
    items
  );
  return response.data;
}
