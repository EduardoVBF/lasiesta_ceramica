import { uploadBase64ToFirebase } from "../../services/uploadImageBase64";
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

  const { imageBase64, ...planData } = parsedBody.data;

  let imageUrl: string | undefined;

  // ✅ upload só se base64 existir
  if (imageBase64) {
    imageUrl = await uploadBase64ToFirebase(
      imageBase64,
      "plans"
    );
  }

  // ✅ Prisma recebe só dados finais
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

  const parsedBody = createPlanSchema.partial().safeParse(
    request.body
  );

  if (!parsedBody.success) {
    return reply.status(400).send({
      error: "Dados inválidos.",
      details: parsedBody.error,
    });
  }

  const { imageBase64, ...planData } = parsedBody.data;

  let imageUrl: string | undefined;

  // ✅ Se veio base64, faz upload e troca imagem
  if (imageBase64) {
    imageUrl = await uploadBase64ToFirebase(
      imageBase64,
      "plans"
    );
  }

  try {
    const plan = await plansService.updatePlan(id, {
      ...planData,
      ...(imageUrl && { imageUrl }),
    });

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