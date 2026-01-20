import { api } from "./api";

export type Product = {
    id: string;
    name: string;
    slug: string;
    price: number;
    shortDescription?: string | null;
    longDescription?: string | null;
    material?: string | null;
    dimensions?: string | null;
    colors?: string[];
    isActive: boolean;
    isFeatured: boolean;
    isSale?: boolean;
    salePrice?: number | null;
    category?: {
      id: string;
      name: string;
    } | null;
    categoryId?: string | null;
    mainImageUrl?: string | null;
    secondaryImages?: string[];
    createdAt: string;
    updatedAt: string;
};

export type ProductsQuery = {
  search?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
};

export type ProductFormData = {
  name: string;
  slug: string;
  price: number;

  shortDescription?: string | null;
  longDescription?: string | null;
  material?: string | null;
  dimensions?: string | null;

  colors?: string[];

  isActive: boolean;
  isFeatured: boolean;

  isSale?: boolean;
  salePrice?: number | null;

  categoryId?: string | null;

  mainImageBase64?: string | null;
  secondaryImagesBase64?: string[];
  mainImageUrl?: string | null;
  secondaryImages?: string[];
};

export async function getAdminProducts(query?: ProductsQuery) {
  const response = await api.get("/products", { params: query });
  return response.data;
}

export async function createProduct(data: ProductFormData) {
  const response = await api.post("/products", data);
  return response.data;
}

export async function updateProduct(id: string, data: ProductFormData) {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
}

export async function updateProductStatus(
  id: string,
  isActive: boolean
) {
  const response = await api.put(`/products/${id}`, {
    isActive,
  });

  return response.data;
}
