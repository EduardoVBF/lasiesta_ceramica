import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './auth.service';

const authService = new AuthService();

export async function loginController(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const user = await authService.login(request.body as any);

    return reply.send({
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
    });
}