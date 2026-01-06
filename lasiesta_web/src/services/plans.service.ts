import { api } from './api';

export type Plan = {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  durationLabel: string | null;
  isActive: boolean;
};

export type PlanFormData = {
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

export async function createPlan(data: PlanFormData) {
  const response = await api.post('/plans', data);
  return response.data;
}

export async function updatePlan(id: string, data: PlanFormData) {
  const response = await api.put(`/plans/${id}`, data);
  return response.data;
}

export async function updatePlanStatus(id: string, isActive: boolean) {
  const response = await api.put(
    `/plans/${id}`,
    { isActive }
  );
  return response.data;
}
