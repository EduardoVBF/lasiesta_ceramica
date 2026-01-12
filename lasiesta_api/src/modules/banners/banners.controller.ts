import { uploadBase64ToFirebase } from "../../services/uploadImageBase64";
import { FastifyReply, FastifyRequest } from "fastify";
import { BannerPage, updateBannerSchema } from "./banners.schema";
import { BannersService } from "./banners.service";

const bannersService = new BannersService();

export async function getAllBannersController() {
  return await bannersService.getAllBanners();
}

export async function getActiveBannerByPageController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { page } = request.params as { page: BannerPage };

  const banner = await bannersService.getActiveBannerByPage(page);

  if (!banner) {
    return reply.status(404).send({
      message: "Banner não encontrado.",
    });
  }

  return reply.send(banner);
}

export async function updateBannerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  const { imageBase64, ...bannerData } = request.body as any;

  let imageUrl: string | undefined;

  // ✅ upload só se base64 existir
  if (imageBase64) {
    imageUrl = await uploadBase64ToFirebase(imageBase64, "banners");
  }

  const banner = await bannersService.updateBanner(id, {
    ...bannerData,
    ...(imageUrl && { imageUrl }),
  });

  return reply.send(banner);
}
