import { FastifyReply, FastifyRequest } from "fastify";
import { createPlanSchema } from "./plans.schemas";
import { PlansService } from "./plans.service";

const plansService = new PlansService();

export async function createPlanController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsedBody = createPlanSchema.safeParse(request.body);

  if (!parsedBody.success) {
    return reply.status(400).send({
      error: "Dados inválidos.",
      details: parsedBody.error,
    });
  }

  const plan = await plansService.createPlan(parsedBody.data);
  return reply.status(201).send(plan);
}

export async function getAllPlansController() {
  return await plansService.getAllPlans();
}

export async function getActivePlansController() {
  return await plansService.getActivePlans();
}

export async function getPlanByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
    const { id } = request.params as { id: string };
    try {
      const plan = await plansService.getPlanById(id);
      return reply.send(plan);
    } catch (err: any) {
        return reply.status(404).send({
        message: err.message ?? "Plano não encontrado.",
      });
    }
}

export async function updatePlanController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const parsedBody = createPlanSchema.partial().safeParse(request.body);

    if (!parsedBody.success) {
        return reply.status(400).send({
        error: "Dados inválidos.",
        details: parsedBody.error,
      });
    }
    try {
      const plan = await plansService.updatePlan(id, parsedBody.data);
      return reply.send(plan);
    } catch (err: any) {
        return reply.status(404).send({
        message: err.message ?? "Plano não encontrado.",
      });
    }
}

export async function deletePlanController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const { id } = request.params as { id: string };
    try {
      const plan = await plansService.deletePlan(id);
      return reply.send(plan);
    } catch (err: any) {
        return reply.status(404).send({
        message: err.message ?? "Plano não encontrado.",
      });
    }
}