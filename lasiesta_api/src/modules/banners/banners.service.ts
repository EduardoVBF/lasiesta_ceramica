import { prisma } from "../../shared/database/prisma";
import { BannerPage, UpdateBannerDTO } from "./banners.schema";

export class BannersService {

  async getAllBanners() {
    return prisma.banner.findMany({
      orderBy: { page: "asc" },
    });
  }

  async getActiveBannerByPage(page: BannerPage) {
    return prisma.banner.findFirst({
      where: {
        page,
        isActive: true,
      },
    });
  }

  async getBannerById(id: string) {
    const banner = await prisma.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      throw new Error("Banner não encontrado.");
    }

    return banner;
  }

  async updateBanner(id: string, data: UpdateBannerDTO) {
    const banner = await prisma.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      throw new Error("Banner não encontrado.");
    }

    return prisma.$transaction(async (tx) => {

      // ✅ Regra: se ativar, desativa outros da mesma página
      if (data.isActive === true) {
        await tx.banner.updateMany({
          where: {
            page: banner.page,
            isActive: true,
            NOT: { id },
          },
          data: { isActive: false },
        });
      }

      return tx.banner.update({
        where: { id },
        data,
      });
    });
  }
}
