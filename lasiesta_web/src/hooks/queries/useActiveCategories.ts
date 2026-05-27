import { getActiveCategories } from "../../services/categories.service";
import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "./queryKeys";

export function useActiveCategories() {
  return useQuery({
    queryKey: categoryKeys.activeList,
    queryFn: getActiveCategories,
  });
}