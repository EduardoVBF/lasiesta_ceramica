import { getAdminProducts, Product } from "../../services/products.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { adminProductKeys } from "./queryKeys";

type UseAdminProductsParams = {
  search: string;
  page: number;
  limit: number;
  categoryFilter?: string;
};

export function useAdminProducts(params: UseAdminProductsParams) {
  const { search, page, limit, categoryFilter } = params;

  return useQuery({
    queryKey: adminProductKeys.list(params),
    queryFn: async () => {
      const res = await getAdminProducts({
        search,
        page,
        limit,
        categoryId:
          categoryFilter !== "promo" && categoryFilter !== "featured"
            ? categoryFilter
            : undefined,
      });

      let items = res.items;

      if (categoryFilter === "featured") {
        items = items.filter((p: Product) => p.isFeatured);
      }

      if (categoryFilter === "promo") {
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
