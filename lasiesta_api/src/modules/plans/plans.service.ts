import { prisma } from "../../shared/database/prisma";
import { CreatePlanDTO } from "./plans.schemas";

export class PlansService {
  async createPlan(data: CreatePlanDTO) {
    return prisma.plan.create({
      data,
    });
  }

  async getAllPlans() {
    return prisma.plan.findMany({
      orderBy: { name: "asc" },
    });
  }

  async getActivePlans() {
    return prisma.plan.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
  }

  async getPlanById(id: string) {
    const plan = await prisma.plan.findUnique({
        where: { id },
    });

    if (!plan) {
      throw new Error("Plano não encontrado.");
    }

    return prisma.plan.findUnique({
      where: { id },
    });
  }

  async updatePlan(id: string, data: Partial<CreatePlanDTO>) {
    const plan = await prisma.plan.findUnique({
      where: { id },
    });

    if (!plan) {
      throw new Error("Plano não encontrado.");
    }

    return prisma.plan.update({
      where: { id },
      data,
    });
  }

  async deletePlan(id: string) {
    const plan = await prisma.plan.findUnique({
      where: { id },
    });

    if (!plan || !plan.isActive) {
      throw new Error("Plano não encontrado.");
    }
    
    return prisma.plan.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
