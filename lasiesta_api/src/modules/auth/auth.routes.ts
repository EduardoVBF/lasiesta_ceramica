import { authMiddleware } from "../../shared/middlewares/auth";
import { adminOnly } from "../../shared/middlewares/adminOnly";
import { loginController } from "./auth.controller";
import { FastifyInstance } from "fastify";
// import { loginSchema } from "./auth.schemas";

// export async function authRoutes(app: FastifyInstance) {
//     app.post('/auth/login', {
//         schema: {
//             body: loginSchema,
//         },
//         handler: loginController,
//     });
// }

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/login', loginController);

  app.get('/auth/admin-test',
    {
      preHandler: [authMiddleware, adminOnly],
    },
    async () => {
      return { message: 'Acesso concedido: você é um administrador!' };
    }
  )
}