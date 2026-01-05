import { FastifyInstance } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import { env } from './env';

export async function registerPlugins(app: FastifyInstance) {
  // CORS (frontend vai consumir a API)
  await app.register(fastifyCors, {
    origin: true,
  });

  // JWT
  await app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });
}
