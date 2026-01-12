import { prisma } from "../../shared/database/prisma";
import {
  CreateHomeCarouselDTO,
  UpdateHomeCarouselDTO,
} from "./home-carousel.schema";
import { AppError } from "../../infra/errors/app-error";
import { ReorderHomeCarouselDTO } from "./home-carousel.schema";

export class HomeCarouselService {
  async getAll() {
    return prisma.homeCarouselItem.findMany({
      orderBy: { orderIndex: "asc" },
    });
  }

  async getActive() {
    console.log("Fetching active carousel items");
    return prisma.homeCarouselItem.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: "asc" },
    });
  }

  async getById(id: string) {
    const item = await prisma.homeCarouselItem.findUnique({
      where: { id },
    });

    if (!item) {
      throw new AppError("Item do carrossel não encontrado.", 404);
    }

    return item;
  }

  async create(data: CreateHomeCarouselDTO) {
    console.log("Creating carousel item with data:", data);
    let orderIndex = data.orderIndex;

    if (!orderIndex) {
      const last = await prisma.homeCarouselItem.findFirst({
        orderBy: { orderIndex: "desc" },
      });

      orderIndex = last ? last.orderIndex + 1000 : 1000;
    }

    const { imageUrl, title, subtitle, linkUrl, isActive, imageBase64 } = data;

    if (!imageUrl) {
      throw new AppError("O campo 'imageUrl' é obrigatório.", 400);
    }

    return prisma.homeCarouselItem.create({
      data: {
        imageUrl,
        title: title ?? null,
        subtitle: subtitle ?? null,
        linkUrl: linkUrl ?? null,
        isActive: isActive ?? true,
        orderIndex,
      },
    });
  }

  async update(id: string, data: UpdateHomeCarouselDTO) {
    await this.getById(id);

    return prisma.homeCarouselItem.update({
      where: { id },
      data,
    });
  }

  async reorder(items: ReorderHomeCarouselDTO) {
    return prisma.$transaction(
      items.map((item) =>
        prisma.homeCarouselItem.update({
          where: { id: item.id },
          data: { orderIndex: item.orderIndex },
        })
      )
    );
  }
}
