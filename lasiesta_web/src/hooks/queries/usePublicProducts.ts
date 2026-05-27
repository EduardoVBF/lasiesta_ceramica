import { getPublicProducts, Product } from "../../services/products.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { productKeys } from "./queryKeys";

type UsePublicProductsParams = {
  search: string;
  page: number;
  limit: number;
  activeCategory: string;
};

export function usePublicProducts(params: UsePublicProductsParams) {
  const { search, page, limit, activeCategory } = params;

  return useQuery({
    queryKey: productKeys.publicList(params),
    queryFn: async () => {
      const res = await getPublicProducts({
        search,
        page,
        limit,
        categorySlug:
          activeCategory !== "all" &&
          activeCategory !== "featured" &&
          activeCategory !== "sale"
            ? activeCategory
            : undefined,
      });

      let items = res.items;

      if (activeCategory === "featured") {
        items = items.filter((p: Product) => p.isFeatured);
      }

      if (activeCategory === "sale") {
        items = items.filter((p: Product) => p.isSale);
      }

      return {
        items,
        totalPages: res.meta.totalPages,
      };
    },
    placeholderData: keepPreviousData,
  });
}
