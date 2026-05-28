import { getProductBySlug } from "../../services/products.service";
import { useQuery } from "@tanstack/react-query";
import { productKeys } from "./queryKeys";

export function usePublicProduct(slug: string) {
  return useQuery({
    queryKey: productKeys.publicDetail(slug),
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });
}
