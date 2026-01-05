import fastify from "fastify";
import { authRoutes } from "./modules/auth/auth.routes";
import { registerPlugins } from "./config/fastify";

export async function buildApp() {
  const app = fastify({
    logger: true,
  });

  // plugins PRIMEIRO
  await registerPlugins(app);

  // health check
  app.get("/health", async () => {
    return { status: "ok" };
  });

  app.get("/jwt-test", async (request, reply) => {
    const token = await reply.jwtSign({ test: true });
    return { token };
  });

  // rotas
  await app.register(authRoutes);

  return app;
}
