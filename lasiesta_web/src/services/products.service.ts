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
  categorySlug?: string;
  slug?: string;
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

export type ProductsResponse = {
  items: Product[];
  meta: {
    totalPages: number;
  };
};

export async function getAdminProducts(
  query?: ProductsQuery,
): Promise<ProductsResponse> {
  const response = await api.get<ProductsResponse>("/products", {
    params: query,
  });
  return response.data;
}

export async function getPublicProducts(
  query?: ProductsQuery,
): Promise<ProductsResponse> {
  const response = await api.get<ProductsResponse>("/products/active", {
    params: query,
  });
  return response.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const response = await api.get<Product>(`/products/slug/${slug}`);
  return response.data;
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  const response = await api.post<Product>("/products", data);
  return response.data;
}

export async function updateProduct(
  id: string,
  data: ProductFormData,
): Promise<Product> {
  const response = await api.put<Product>(`/products/${id}`, data);
  return response.data;
}

export async function updateProductStatus(
  id: string,
  isActive: boolean,
): Promise<Product> {
  const response = await api.put<Product>(`/products/${id}`, {
    isActive,
  });

  return response.data;
}
