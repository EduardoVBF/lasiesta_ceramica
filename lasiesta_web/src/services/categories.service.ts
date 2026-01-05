import { api } from './api';

export type Category = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
};

export async function getAdminCategories() {
  const response = await api.get('/admin/categories');
  return response.data;
}
