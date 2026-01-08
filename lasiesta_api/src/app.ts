import { categoriesRoutes } from "./modules/categories/categories.routes";
import { authMiddleware } from "./shared/middlewares/auth";
import { plansRoutes } from "./modules/plans/plans.routes";
import { usersRoutes } from "./modules/users/users.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { registerPlugins } from "./config/fastify";
import multipart from "@fastify/multipart";
import fastify from "fastify";


export async function buildApp() {
  const app = fastify({
    logger: true,
  });

  await app.register(multipart, {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  });

  // plugins PRIMEIRO
  await registerPlugins(app);

  // rotas
  await app.register(categoriesRoutes);
  await app.register(plansRoutes);
  await app.register(usersRoutes);
  await app.register(authRoutes);

  return app;
}
