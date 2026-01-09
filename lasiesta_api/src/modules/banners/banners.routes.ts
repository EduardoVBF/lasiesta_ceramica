import {
  getAllBannersController,
  getActiveBannerByPageController,
  updateBannerController,
} from "./banners.controller";
import { authMiddleware } from "../../shared/middlewares/auth";
import { adminOnly } from "../../shared/middlewares/adminOnly";
import { FastifyInstance } from "fastify";

export async function bannersRoutes(app: FastifyInstance) {

  // 🌍 Público
  app.get("/banners/:page", getActiveBannerByPageController);

  // 🔐 Admin
  app.get(
    "/admin/banners",
    { preHandler: [authMiddleware, adminOnly] },
    getAllBannersController
  );

  app.put(
    "/admin/banners/:id",
    { preHandler: [authMiddleware, adminOnly] },
    updateBannerController
  );
}
