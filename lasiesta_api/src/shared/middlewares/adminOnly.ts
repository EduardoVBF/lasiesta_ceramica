import { FastifyReply, FastifyRequest } from 'fastify';

export async function adminOnly(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // jwtVerify já deve ter sido executado antes
  const user = request.user as { role?: string };

  if (!user || user.role !== 'admin') {
    console.log("usuário não é admin", user);
    return reply.status(403).send({
      message: 'Acesso negado: apenas administradores podem acessar este recurso.',
    });
  }
}
