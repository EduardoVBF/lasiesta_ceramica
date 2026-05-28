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

export type CategoryFormData = {
  name: string;
  slug: string;
  isActive: boolean;
  isFeatured?: boolean;
  imageBase64?: string | null;
};

export type CreateCategoryDTO = {
  name: string;
  slug: string;
  isActive: boolean;
};

export async function getAdminCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>("/categories");
  return response.data;
}

export async function getActiveCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>("/categories/active");
  return response.data;
}

export async function createCategory(data: CategoryFormData): Promise<Category> {
  const response = await api.post<Category>("/categories", data);
  return response.data;
}

export async function updateCategoryStatus(id: string, isActive: boolean): Promise<Category> {
  const response = await api.put<Category>(`/categories/${id}`, {
    isActive,
  });

  return response.data;
}

export async function updateCategory(
  id: string,
  data: CategoryFormData
): Promise<Category> {
  const response = await api.put<Category>(`/categories/${id}`, data);

  return response.data;
}
