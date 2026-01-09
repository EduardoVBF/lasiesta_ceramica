import { uploadBase64ToFirebase } from "../../services/uploadImageBase64";
import { FastifyReply, FastifyRequest } from "fastify";
import { createPlanSchema } from "./plans.schemas";
import { PlansService } from "./plans.service";

const plansService = new PlansService();

export async function createPlanController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { imageBase64, ...planData } = request.body as any;

  let imageUrl: string | undefined;

  if (imageBase64) {
    imageUrl = await uploadBase64ToFirebase(
      imageBase64,
      "plans"
    );
  }

  const plan = await plansService.createPlan({
    ...planData,
    ...(imageUrl && { imageUrl }),
  });

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

  const plan = await plansService.getPlanById(id);
  return reply.send(plan);
}

export async function updatePlanController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  const { imageBase64, ...planData } = request.body as any;

  let imageUrl: string | undefined;

  if (imageBase64) {
    imageUrl = await uploadBase64ToFirebase(
      imageBase64,
      "plans"
    );
  }

  const plan = await plansService.updatePlan(id, {
    ...planData,
    ...(imageUrl && { imageUrl }),
  });

  return reply.send(plan);
}

export async function deletePlanController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  const plan = await plansService.deletePlan(id);
  return reply.send(plan);
}
