import { categoriesRoutes } from "./modules/categories/categories.routes";
import { authMiddleware } from "./shared/middlewares/auth";
import { authRoutes } from "./modules/auth/auth.routes";
import { registerPlugins } from "./config/fastify";
import fastify from "fastify";

export async function buildApp() {
  const app = fastify({
    logger: true,
  });

  // plugins PRIMEIRO
  await registerPlugins(app);

  // app.get("/health", async () => {
  //   return { status: "ok" };
  // });

  // app.get("/jwt-test", async (request, reply) => {
  //   const token = await reply.jwtSign({ test: true });
  //   return { token };
  // });

  // app.get(
  //   "/auth/me",
  //   {
  //     preHandler: [authMiddleware],
  //   },
  //   async (request) => {
  //     return request.user;
  //   }
  // );

  // rotas
  await app.register(authRoutes);
  await app.register(categoriesRoutes);

  return app;
}
