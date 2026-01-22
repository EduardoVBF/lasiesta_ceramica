import { CreateProductDTO, ProductsQueryDTO } from "./products.schemas";
import { AppError } from "../../infra/errors/app-error";
import { prisma } from "../../shared/database/prisma";
import { Prisma } from "@prisma/client";

export class ProductsService {
  /**
   * CREATE
   */
  async createProduct(
    data: CreateProductDTO & {
      mainImageUrl: string;
      secondaryImages?: string[];
    }
  ) {
    if (data.categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!categoryExists) {
        throw new AppError("Categoria não encontrada", 404);
      }
    }

    return prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        price: data.price,
        isSale: data.isSale ?? false,
        salePrice: data.isSale ? data.salePrice : null,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        material: data.material,
        dimensions: data.dimensions,
        colors: data.colors,
        isFeatured: data.isFeatured ?? false,
        isActive: data.isActive ?? true,
        orderIndex: data.orderIndex ?? 1000,
        categoryId: data.categoryId,
        mainImageUrl: data.mainImageUrl,
        secondaryImages: data.secondaryImages ?? [],
      },
    });
  }

  /**
   * GET ALL (admin) — search + paginação
   */
  async getAllProducts(query: ProductsQueryDTO) {
    const { search, page, limit, categoryId } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      ...(categoryId && { categoryId }),
      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            slug: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }),
    };

    const [items, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ categoryId: "desc" }, { name: "asc" }],
        include: { category: true },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * GET ACTIVE (site) — search + paginação
   */
  async getActiveProducts(query: ProductsQueryDTO) {
    const { search, page, limit, categoryId, categorySlug } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      isActive: true,

      ...(categoryId && { categoryId }),

      ...(categorySlug && {
        category: {
          slug: categorySlug,
          isActive: true,
        },
      }),

      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            slug: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }),
    };

    const [items, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
        include: { category: true },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * GET BY ID
   */
  async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }

    return product;
  }

  /** GET BY SLUG */
  async getProductBySlug(slug: string) {
    const product = await prisma.product.findFirst({
      where: { slug, isActive: true },
      include: { category: true },
    });
    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }
    return product;
  }

  /**
   * UPDATE
   */
  async updateProduct(
    id: string,
    data: Partial<CreateProductDTO> & {
      mainImageUrl?: string;
      secondaryImages?: string[];
    }
  ) {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }

    if (data.categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!categoryExists) {
        throw new AppError("Categoria não encontrada", 404);
      }
    }

    return prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        price: data.price,
        isSale: data.isSale,
        salePrice: data.isSale ? data.salePrice : null,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        material: data.material,
        dimensions: data.dimensions,
        colors: data.colors,
        isFeatured: data.isFeatured,
        isActive: data.isActive,
        orderIndex: data.orderIndex,
        categoryId: data.categoryId,
        mainImageUrl: data.mainImageUrl,
        secondaryImages: data.secondaryImages,
      },
    });
  }

  /**
   * DELETE (soft)
   */
  async deleteProduct(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product || !product.isActive) {
      throw new AppError("Produto não encontrado", 404);
    }

    return prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
