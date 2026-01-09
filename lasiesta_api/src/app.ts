import { categoriesRoutes } from "./modules/categories/categories.routes";
import { authMiddleware } from "./shared/middlewares/auth";
import { plansRoutes } from "./modules/plans/plans.routes";
import { usersRoutes } from "./modules/users/users.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { registerPlugins } from "./config/fastify";
import fastify from "fastify";


export async function buildApp() {
  const app = fastify({
    logger: true,
    bodyLimit: 10 * 1024 * 1024, // 10MB
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
