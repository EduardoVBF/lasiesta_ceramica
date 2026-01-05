import { FastifyRequest, FastifyReply } from "fastify";
import { registerSchema } from "./auth.schemas";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export async function loginController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const user = await authService.login(request.body as any);

  const accessToken = await reply.jwtSign(
    {
      sub: user.id,
      role: user.role,
    },
    {
      expiresIn: "3h",
    }
  );

  return reply.send({
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    },
  });
}

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsedData = registerSchema.safeParse(request.body);

  if (!parsedData.success) {
    return reply.status(400).send({
      message: "Dados de registro inválidos.",
      errors: parsedData.error || 'Erro desconhecido',
    });
  }

  try {
    const user = await authService.register(parsedData.data);
    return reply.status(201).send(user);
  } catch (err: any) {
    return reply.status(400).send({
      message: err.message ?? 'Erro ao registrar usuário.',
    });
  }
}

