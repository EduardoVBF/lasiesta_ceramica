import {
  createPlanController,
  getAllPlansController,
  getActivePlansController,
  getPlanByIdController,
  updatePlanController,
  deletePlanController,
} from "./plans.controller";
import { authMiddleware } from "../../shared/middlewares/auth";
import { adminOnly } from "../../shared/middlewares/adminOnly";
import { FastifyInstance } from "fastify";
import { validateRequest } from "../../infra/http/validate";
import { createPlanSchema, planIdSchema } from "./plans.schemas";

export async function plansRoutes(app: FastifyInstance) {
  // Público
  app.get("/plans/active", getActivePlansController);

  app.get("/plans/:id", async (request, reply) => {
    const { params } = await validateRequest(request, {
      params: planIdSchema,
    });

    return getPlanByIdController({ ...request, params } as any, reply);
  });

  // Admin
  app.get(
    "/plans",
    { preHandler: [authMiddleware, adminOnly] },
    getAllPlansController
  );

  app.post(
    "/plans",
    { preHandler: [authMiddleware, adminOnly] },
    async (request, reply) => {
      const { body } = await validateRequest(request, {
        body: createPlanSchema,
      });

      return createPlanController({ ...request, body } as any, reply);
    }
  );

  app.put(
    "/plans/:id",
    { preHandler: [authMiddleware, adminOnly] },
    async (request, reply) => {
      const { body, params } = await validateRequest(request, {
        body: createPlanSchema.partial(),
        params: planIdSchema,
      });

      return updatePlanController({ ...request, body, params } as any, reply);
    }
  );

  app.delete(
    "/plans/:id",
    { preHandler: [authMiddleware, adminOnly] },
    async (request, reply) => {
      const { params } = await validateRequest(request, {
        params: planIdSchema,
      });

      return deletePlanController({ ...request, params } as any, reply);
    }
  );
}
