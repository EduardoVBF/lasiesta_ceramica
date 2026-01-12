import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../shared/middlewares/auth";
import { adminOnly } from "../../shared/middlewares/adminOnly";
import { validateRequest } from "../../infra/http/validate";
import { reorderCarouselController } from "./home-carousel.controller";
import {
  getAllCarouselItemsController,
  getActiveCarouselItemsController,
  createCarouselItemController,
  updateCarouselItemController,
} from "./home-carousel.controller";

import {
  CreateHomeCarouselSchema,
  UpdateHomeCarouselSchema,
  HomeCarouselIdSchema,
} from "./home-carousel.schema";

export async function homeCarouselRoutes(app: FastifyInstance) {
  // 🌍 Público
  app.get("/home-carousel", getActiveCarouselItemsController);

  // 🔐 Admin
  app.get(
    "/admin/home-carousel",
    { preHandler: [authMiddleware, adminOnly] },
    getAllCarouselItemsController
  );

  app.post(
    "/admin/home-carousel",
    { preHandler: [authMiddleware, adminOnly] },
    async (request, reply) => {
      const { body } = await validateRequest(request, {
        body: CreateHomeCarouselSchema,
      });
      return createCarouselItemController({ ...request, body } as any, reply);
    }
  );

  app.put(
    "/admin/home-carousel/:id",
    { preHandler: [authMiddleware, adminOnly] },
    async (request, reply) => {
      const { body, params } = await validateRequest(request, {
        body: UpdateHomeCarouselSchema,
        params: HomeCarouselIdSchema,
      });

      return updateCarouselItemController(
        { ...request, body, params } as any,
        reply
      );
    }
  );

  app.patch(
    "/admin/home-carousel/reorder",
    { preHandler: [authMiddleware, adminOnly] },
    reorderCarouselController
  );
}
