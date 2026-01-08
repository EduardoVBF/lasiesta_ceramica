import {
  getAllUsersController,
  getUserByIdController,
  resetPasswordController,
  updateUserController,
} from "./users.controller";
import { authMiddleware } from "../../shared/middlewares/auth";
import { adminOnly } from "../../shared/middlewares/adminOnly";
import { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
    // Admin
    app.get(
      "/users",
      {
        preHandler: [authMiddleware, adminOnly],
      },
      getAllUsersController
    );

    app.get(
      "/users/:id",
      {
        preHandler: [authMiddleware, adminOnly],
      },
      getUserByIdController
    );

    app.put(
      "/users/:id",
      {
        preHandler: [authMiddleware, adminOnly],
      },
      updateUserController
    ); 

    app.post(
      "/users/:id/reset-password",
      {
        preHandler: [authMiddleware, adminOnly],
      },
      resetPasswordController
    );
}
