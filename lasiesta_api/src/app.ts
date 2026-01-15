import Fastify from "fastify";

import { homeCarouselRoutes } from "./modules/home-carousel/home-carousel.routes";
import { categoriesRoutes } from "./modules/categories/categories.routes";
import { bannersRoutes } from "./modules/banners/banners.routes";
import { plansRoutes } from "./modules/plans/plans.routes";
import { usersRoutes } from "./modules/users/users.routes";
import { authRoutes } from "./modules/auth/auth.routes";

import { registerPlugins } from "./config/fastify";
import { errorHandler } from "./infra/http/error-handler";

const app = Fastify({
  logger: true,
  bodyLimit: 10 * 1024 * 1024,
});

// tudo async vai aqui
app.register(async (app) => {
  app.setErrorHandler(errorHandler);

  await registerPlugins(app);

  await app.register(homeCarouselRoutes);
  await app.register(categoriesRoutes);
  await app.register(bannersRoutes);
  await app.register(plansRoutes);
  await app.register(usersRoutes);
  await app.register(authRoutes);
});

// 🚨 ISSO É O MAIS IMPORTANTE
export default app;
