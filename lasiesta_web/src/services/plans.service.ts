import { api } from './api';

export type Plan = {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  durationLabel: string | null;
  isActive: boolean;
};

export async function getAdminPlans() {
  const response = await api.get<Plan[]>('/plans');
  return response.data;
}
