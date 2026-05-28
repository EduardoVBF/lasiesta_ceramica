import { getProductById } from "../../services/products.service";
import { useQuery } from "@tanstack/react-query";
import { adminProductKeys } from "./queryKeys";

export function useAdminProduct(id: string) {
  return useQuery({
    queryKey: adminProductKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}
