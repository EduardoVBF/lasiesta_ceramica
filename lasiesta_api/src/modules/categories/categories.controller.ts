import { createCategorySchema } from "./categories.schemas";
import { CategoriesService } from "./categories.service";
import { FastifyRequest, FastifyReply } from "fastify";

const categoriesService = new CategoriesService();

export async function createCategoryController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsedData = createCategorySchema.safeParse(request.body);

  if (!parsedData.success) {
    return reply.status(400).send({
      message: "Dados de categoria inválidos.",
      errors: parsedData.error,
    });
  }

  const category = await categoriesService.createCategory(parsedData.data);
  return reply.status(201).send(category);
}

export async function getAllCategoriesController() {
  return await categoriesService.getAllCategories();
}

export async function getActiveCategoriesController() {
  return await categoriesService.getActiveCategories();
}

export async function getCategoryByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  try {
    const category = await categoriesService.getCategoryById(id);
    return reply.send(category);
  } catch (err: any) {
    return reply.status(404).send({
      message: err.message ?? "Categoria não encontrada.",
    });
  }
}

export async function updateCategoryController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const parsedData = createCategorySchema.partial().safeParse(request.body);

  if (!parsedData.success) {
    return reply.status(400).send({
      message: "Dados de categoria inválidos.",
      errors: parsedData.error,
    });
  }

  try {
    const updatedCategory = await categoriesService.updateCategory(
      id,
      parsedData.data
    );
    return reply.send(updatedCategory);
  } catch (err: any) {
    return reply.status(404).send({
      message: err.message ?? "Categoria não encontrada.",
    });
  }
}

export async function deleteCategoryController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  try {
    await categoriesService.deleteCategory(id);
    return reply.status(204).send();
  } catch (err: any) {
    return reply.status(404).send({
      message: err.message ?? "Categoria não encontrada.",
    });
  }
}
