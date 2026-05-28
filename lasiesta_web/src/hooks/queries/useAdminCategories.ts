import { getAdminCategories } from "../../services/categories.service";
import { useQuery } from "@tanstack/react-query";
import { adminCategoryKeys } from "./queryKeys";

export function useAdminCategories() {
  return useQuery({
    queryKey: adminCategoryKeys.list(),
    queryFn: getAdminCategories,
  });
}