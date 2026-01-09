import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
  getActiveCategoriesController,
} from "./categories.controller";
import { authMiddleware } from "../../shared/middlewares/auth";
import { adminOnly } from "../../shared/middlewares/adminOnly";
import { FastifyInstance } from "fastify";
import { validateRequest } from "../../infra/http/validate";
import { CategoryIdSchema, createCategorySchema } from "./categories.schemas";

export async function categoriesRoutes(app: FastifyInstance) {
  // Público
  app.get("/categories/active", getActiveCategoriesController);

  app.get("/categories/:id", async (request, reply) => {
    const { params } = await validateRequest(request, {
      params: CategoryIdSchema,
    });

    return getCategoryByIdController({ ...request, params } as any, reply);
  });

  // Admin
  app.get(
    "/categories",
    {
      preHandler: [authMiddleware, adminOnly],
    },
    getAllCategoriesController
  );

  app.post(
    "/categories",
    { preHandler: [authMiddleware, adminOnly] },
    async (request, reply) => {
      const { body } = await validateRequest(request, {
        body: createCategorySchema,
      });
      

    return createCategoryController({ ...request, body } as any, reply);
    }
  );

  app.put(
    "/categories/:id",
    { preHandler: [authMiddleware, adminOnly] },
    async (request, reply) => {
      const { body, params } = await validateRequest(request, {
        body: createCategorySchema.partial(),
        params: CategoryIdSchema,
      });

      return updateCategoryController({ ...request, body, params } as any, reply);
    }
  );

  app.delete(
    "/categories/:id",
    { preHandler: [authMiddleware, adminOnly] },
    async (request, reply) => {
      const { params } = await validateRequest(request, {
        params: CategoryIdSchema,
      });

      return deleteCategoryController({ ...request, params } as any, reply);
    }
  );
}
