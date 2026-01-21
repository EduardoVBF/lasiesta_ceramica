import {
  createProductController,
  getAllProductsController,
  getActiveProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
  getProductBySlugController,
} from "./products.controller";
import {
  createProductSchema,
  productIdSchema,
  productSlugSchema,
  productsQuerySchema,
  updateProductSchema,
} from "./products.schemas";
import { authMiddleware } from "../../shared/middlewares/auth";
import { adminOnly } from "../../shared/middlewares/adminOnly";
import { validateRequest } from "../../infra/http/validate";
import { FastifyInstance } from "fastify";

export async function productsRoutes(app: FastifyInstance) {
  // =========================
  // Público
  // =========================

  app.get("/products/active", async (request, reply) => {
    const { query } = await validateRequest(request, {
      query: productsQuerySchema,
    });

    return getActiveProductsController({ ...request, query } as any);
  });

  app.get("/products/:id", async (request, reply) => {
    const { params } = await validateRequest(request, {
      params: productIdSchema,
    });

    return getProductByIdController({ ...request, params } as any, reply);
  });

  app.get("/products/slug/:slug", async (request, reply) => {
    const { params } = await validateRequest(request, {
      params: productSlugSchema,
    });

    return getProductBySlugController({ ...request, params } as any, reply);
  });
  // =========================
  // Admin
  // =========================

  app.get(
    "/products",
    { preHandler: [authMiddleware, adminOnly] },
    async (request, reply) => {
      const { query } = await validateRequest(request, {
        query: productsQuerySchema,
      });

      return getAllProductsController({ ...request, query } as any);
    }
  );

  app.post(
    "/products",
    { preHandler: [authMiddleware, adminOnly] },
    async (request, reply) => {
      const { body } = await validateRequest(request, {
        body: createProductSchema,
      });

      return createProductController({ ...request, body } as any, reply);
    }
  );

  app.put(
    "/products/:id",
    { preHandler: [authMiddleware, adminOnly] },
    async (request, reply) => {
      const { body, params } = await validateRequest(request, {
        body: updateProductSchema,
        params: productIdSchema,
      });

      return updateProductController(
        { ...request, body, params } as any,
        reply
      );
    }
  );

  app.delete(
    "/products/:id",
    { preHandler: [authMiddleware, adminOnly] },
    async (request, reply) => {
      const { params } = await validateRequest(request, {
        params: productIdSchema,
      });

      return deleteProductController({ ...request, params } as any, reply);
    }
  );
}
