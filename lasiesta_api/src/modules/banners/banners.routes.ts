import {
  getAllBannersController,
  getActiveBannerByPageController,
  updateBannerController,
} from "./banners.controller";
import { authMiddleware } from "../../shared/middlewares/auth";
import { adminOnly } from "../../shared/middlewares/adminOnly";
import { FastifyInstance } from "fastify";
import { validateRequest } from "../../infra/http/validate";
import { BannerIdSchema, updateBannerSchema } from "./banners.schema";

export async function bannersRoutes(app: FastifyInstance) {
  // Público
  app.get("/banners/:page", getActiveBannerByPageController);

  // Admin
  app.get(
    "/admin/banners",
    { preHandler: [authMiddleware, adminOnly] },
    getAllBannersController
  );

  app.put(
    "/admin/banners/:id",
    { preHandler: [authMiddleware, adminOnly] },
    async (request, reply) => {
      const { body, params } = await validateRequest(request, {
        body: updateBannerSchema.partial(),
        params: BannerIdSchema,
      });

      return updateBannerController({ ...request, body, params } as any, reply);
    }
  );
}
