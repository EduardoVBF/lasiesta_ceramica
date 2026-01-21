import { FastifyReply, FastifyRequest } from "fastify";
import { uploadBase64ToFirebase } from "../../services/uploadImageBase64";
import { ProductsService } from "./products.service";

const productsService = new ProductsService();

/**
 * CREATE
 */
export async function createProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { mainImageBase64, secondaryImagesBase64, ...productData } =
    request.body as any;

  // upload imagem principal (obrigatória)
  const mainImageUrl = await uploadBase64ToFirebase(
    mainImageBase64,
    "products"
  );

  // upload imagens secundárias
  let secondaryImages: string[] = [];

  if (secondaryImagesBase64?.length) {
    secondaryImages = await Promise.all(
      secondaryImagesBase64.map((base64: string) =>
        uploadBase64ToFirebase(base64, "products")
      )
    );
  }

  const product = await productsService.createProduct({
    ...productData,
    mainImageUrl,
    secondaryImages,
  });

  return reply.status(201).send(product);
}

/**
 * GET ALL (admin) — search + paginação + categoria
 */
export async function getAllProductsController(request: FastifyRequest) {
  const { search, page, limit, categoryId } = request.query as any;

  return productsService.getAllProducts({
    search,
    page,
    limit,
    categoryId,
  });
}

/**
 * GET ACTIVE (site) — search + paginação + categoria
 */
export async function getActiveProductsController(request: FastifyRequest) {
  const { search, page, limit, categoryId, categorySlug } =
    request.query as any;

  return productsService.getActiveProducts({
    search,
    page,
    limit,
    categoryId,
    categorySlug,
  });
}

/**
 * GET BY ID
 */
export async function getProductByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  const product = await productsService.getProductById(id);
  return reply.send(product);
}

/**
 * UPDATE
 */

function isBase64Image(value: string) {
  return value.startsWith("data:image/");
}

export async function updateProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  const {
    mainImageBase64,
    secondaryImagesBase64,
    ...productData
  } = request.body as {
    mainImageBase64?: string;
    secondaryImagesBase64?: string[];
  };

  let mainImageUrl: string | undefined;
  let secondaryImages: string[] | undefined;

  /* ===== IMAGEM PRINCIPAL ===== */
  if (mainImageBase64) {
    mainImageUrl = await uploadBase64ToFirebase(
      mainImageBase64,
      "products"
    );
  }

  /* ===== IMAGENS SECUNDÁRIAS (ESTADO FINAL) ===== */
  if (secondaryImagesBase64) {
    secondaryImages = [];

    for (const image of secondaryImagesBase64) {
      if (isBase64Image(image)) {
        const url = await uploadBase64ToFirebase(image, "products");
        secondaryImages.push(url);
      } else {
        secondaryImages.push(image); // já é URL
      }
    }
  }

  const product = await productsService.updateProduct(id, {
    ...productData,
    ...(mainImageUrl && { mainImageUrl }),
    ...(secondaryImagesBase64 && { secondaryImages }),
  });

  return reply.send(product);
}

/**
 * DELETE (soft)
 */
export async function deleteProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  const product = await productsService.deleteProduct(id);
  return reply.send(product);
}
