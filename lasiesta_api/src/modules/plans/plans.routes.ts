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

export async function plansRoutes(app: FastifyInstance) {
  // Público
  app.get("/plans/active", getActivePlansController);

  app.get("/plans/:id", getPlanByIdController);

  // Admin
  app.get(
    "/plans",
    {
      preHandler: [authMiddleware, adminOnly],
    },
    getAllPlansController
  );

  app.post(
    "/plans",
    { preHandler: [authMiddleware, adminOnly] },
    createPlanController
  );

  app.put(
    "/plans/:id",
    { preHandler: [authMiddleware, adminOnly] },
    updatePlanController
  );

  app.delete(
    "/plans/:id",
    { preHandler: [authMiddleware, adminOnly] },
    deletePlanController
  );
}
