import { authMiddleware } from "../../shared/middlewares/auth";
import { adminOnly } from "../../shared/middlewares/adminOnly";
import { registerController } from "./auth.controller";
import { loginController } from "./auth.controller";
import { FastifyInstance } from "fastify";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", loginController);

  app.post(
    "/auth/register",
    {
      preHandler: [authMiddleware, adminOnly],
    },
    registerController
  );
}
