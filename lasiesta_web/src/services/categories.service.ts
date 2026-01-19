import { api } from "./api";

export type Category = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  imageUrl?: string;
  isFeatured?: boolean;
};

export type CreateCategoryDTO = {
  name: string;
  slug: string;
  isActive: boolean;
};

export async function getAdminCategories() {
  const response = await api.get("/categories");
  return response.data;
}

export async function getActiveCategories() {
  const response = await api.get("/categories/active");
  return response.data;
}

export async function createCategory(data: CreateCategoryDTO) {
  const response = await api.post("/categories", data);
  return response.data;
}

export async function updateCategoryStatus(id: string, isActive: boolean) {
  const response = await api.put(`/categories/${id}`, {
    isActive,
  });

  return response.data;
}

export async function updateCategory(
  id: string,
  data: {
    name: string;
    slug: string;
    isActive: boolean;
    isFeatured?: boolean;
    imageBase64?: string | null;
  }
) {
  const response = await api.put(`/categories/${id}`, data);

  return response.data;
}
