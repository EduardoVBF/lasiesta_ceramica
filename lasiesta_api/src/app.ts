import fastify from "fastify";

import { homeCarouselRoutes } from "./modules/home-carousel/home-carousel.routes";
import { categoriesRoutes } from "./modules/categories/categories.routes";
import { bannersRoutes } from "./modules/banners/banners.routes";
import { plansRoutes } from "./modules/plans/plans.routes";
import { usersRoutes } from "./modules/users/users.routes";
import { authRoutes } from "./modules/auth/auth.routes";

import { registerPlugins } from "./config/fastify";
import { errorHandler } from "./infra/http/error-handler";

export async function buildApp() {
  const app = fastify({
    logger: true,
    bodyLimit: 10 * 1024 * 1024, // 10MB
  });

  app.setErrorHandler(errorHandler);

  // plugins
  await registerPlugins(app);

  // rotas
  await app.register(homeCarouselRoutes);
  await app.register(categoriesRoutes);
  await app.register(bannersRoutes);
  await app.register(plansRoutes);
  await app.register(usersRoutes);
  await app.register(authRoutes);

  return app;
}
