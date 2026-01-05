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

export async function categoriesRoutes(app: FastifyInstance) {
  // Público
  app.get("/categories/active", getActiveCategoriesController);

  app.get("/categories/:id", getCategoryByIdController);

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
    createCategoryController
  );

  app.put(
    "/categories/:id",
    { preHandler: [authMiddleware, adminOnly] },
    updateCategoryController
  );

  app.delete(
    "/categories/:id",
    { preHandler: [authMiddleware, adminOnly] },
    deleteCategoryController
  );
}
