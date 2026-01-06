import { FastifyInstance } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import { env } from "./env";

export async function registerPlugins(app: FastifyInstance) {
  // CORS (frontend vai consumir a API)
  await app.register(fastifyCors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // JWT
  await app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });
}
