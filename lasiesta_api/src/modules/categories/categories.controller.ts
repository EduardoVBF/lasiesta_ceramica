import { uploadBase64ToFirebase } from "../../services/uploadImageBase64";
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

  // ✅ SEMPRE usar o parsedBody
  const { imageBase64, ...categoryData } = parsedData.data;

  let imageUrl: string | undefined;

  // ✅ upload só se base64 existir
  if (imageBase64) {
    imageUrl = await uploadBase64ToFirebase(imageBase64, "plans");
  }
  // ✅ Prisma recebe só dados finais
  const categoryFinal = {
    ...categoryData,
    imageUrl,
  };

  const category = await categoriesService.createCategory(categoryFinal);
  return reply.status(201).send(categoryFinal);
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

  // ✅ Sempre usar parsedBody
  const { imageBase64, ...categoryData } = parsedData.data;

  let imageUrl: string | undefined;

  // ✅ Se veio base64, faz upload e troca imagem
  if (imageBase64) {
    imageUrl = await uploadBase64ToFirebase(imageBase64, "plans");
  }

  try {
    const updatedCategory = await categoriesService.updateCategory(id, {
      ...categoryData,
      ...(imageUrl && { imageUrl }),
    });

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
