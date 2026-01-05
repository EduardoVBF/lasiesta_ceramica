import { FastifyRequest, FastifyReply } from "fastify";
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
