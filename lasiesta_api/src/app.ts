import { categoriesRoutes } from "./modules/categories/categories.routes";
import { authMiddleware } from "./shared/middlewares/auth";
import { plansRoutes } from "./modules/plans/plans.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { registerPlugins } from "./config/fastify";
import fastify from "fastify";

export async function buildApp() {
  const app = fastify({
    logger: true,
  });

  // plugins PRIMEIRO
  await registerPlugins(app);

  // rotas
  await app.register(authRoutes);
  await app.register(categoriesRoutes);
  await app.register(plansRoutes);

  return app;
}
