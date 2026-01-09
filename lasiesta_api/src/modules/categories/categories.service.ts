import { app } from "firebase-admin";
import { AppError } from "../../infra/errors/app-error";
import { prisma } from "../../shared/database/prisma";
import { CreateCategoryDTO } from "./categories.schemas";

export class CategoriesService {
  // CREATE
  async createCategory(data: CreateCategoryDTO) {
    return await prisma.category.create({
      data,
    });
  }

  // GET ALL
  async getAllCategories() {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  }

  // GET ACTIVE CATEGORIES
  async getActiveCategories() {
    return await prisma.category.findMany({
      where: { isActive: true }, // Apenas categorias ativas
      orderBy: { name: "asc" },
    });
  }

  // GET BY ID
  async getCategoryById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }
    return category;
  }

  // UPDATE
  async updateCategory(id: string, data: Partial<CreateCategoryDTO>) {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    return await prisma.category.update({
      where: { id },
      data,
    });
  }

  // DELETE (soft delete)
  async deleteCategory(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category || !category.isActive) {
      throw new AppError("Categoria não encontrada", 404);
    }

    return await prisma.category.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
