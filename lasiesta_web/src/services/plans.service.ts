import { api } from './api';

export type Plan = {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  durationLabel: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  shortDescription?: string;
  longDescription?: string;
  isFeatured?: boolean;
  imageUrl?: string;
};

export type PlanFormData = {
  name: string;
  slug: string;
  price: number | null;
  durationLabel: string | null;
  isActive: boolean;
  shortDescription?: string | null;
  longDescription?: string | null;
  isFeatured?: boolean;
  imageUrl?: string | null;
};

export async function getAdminPlans(): Promise<Plan[]> {
  const response = await api.get<Plan[]>('/plans');
  return response.data;
}

export async function getActivePlans(): Promise<Plan[]> {
  const response = await api.get<Plan[]>('/plans/active');
  return response.data;
}

export async function createPlan(data: PlanFormData): Promise<Plan> {
  const response = await api.post<Plan>('/plans', data);
  return response.data;
}

export async function updatePlan(id: string, data: PlanFormData): Promise<Plan> {
  const response = await api.put<Plan>(`/plans/${id}`, data);
  return response.data;
}

export async function updatePlanStatus(id: string, isActive: boolean): Promise<Plan> {
  const response = await api.put<Plan>(
    `/plans/${id}`,
    { isActive }
  );
  return response.data;
}
