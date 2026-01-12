import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateHomeCarouselSchema,
  UpdateHomeCarouselSchema,
} from "./home-carousel.schema";
import { HomeCarouselService } from "./home-carousel.service";
import { uploadBase64ToFirebase } from "../../services/uploadImageBase64";
import { ReorderHomeCarouselSchema } from "./home-carousel.schema";

const service = new HomeCarouselService();

export async function getAllCarouselItemsController() {
  return service.getAll();
}

export async function getActiveCarouselItemsController() {
  return service.getActive();
}

export async function createCarouselItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { imageBase64, ...data } = request.body as any;

  let imageUrl: string | undefined;

  if (imageBase64) {
    imageUrl = await uploadBase64ToFirebase(imageBase64, "home-carousel");
  }

  try {
    const item = await service.create({
      ...data,
      ...(imageUrl && { imageUrl }),
    });

    return reply.status(201).send(item);
  } catch (err) {
    console.error("Erro ao criar item do carrossel:", err);
    throw err;
  }
}

export async function updateCarouselItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };
  const { imageBase64, ...data } = request.body as any;

  let imageUrl: string | undefined;

  if (imageBase64) {
    imageUrl = await uploadBase64ToFirebase(imageBase64, "home-carousel");
  }

  const item = await service.update(id, {
    ...data,
    ...(imageUrl && { imageUrl }),
  });

  return reply.send(item);
}

export async function reorderCarouselController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const items = request.body as any;

  const parsed = ReorderHomeCarouselSchema.safeParse(items);

  if (!parsed.success) {
    return reply.status(400).send({
      error: "Payload inválido para reorder.",
      details: parsed.error,
    });
  }

  await service.reorder(parsed.data);

  return reply.send({
    message: "Ordem do carrossel atualizada com sucesso.",
  });
}
