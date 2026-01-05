import { FastifyInstance } from "fastify";
import { loginController } from "./auth.controller";
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
}