import { getAdminHomeCarousel } from "../../services/carousel.service";
import { useQuery } from "@tanstack/react-query";
import { adminCarouselKeys } from "./queryKeys";

export function useAdminHomeCarousel() {
  return useQuery({
    queryKey: adminCarouselKeys.list(),
    queryFn: async () => {
      const data = await getAdminHomeCarousel();
      return [...data].sort((a, b) => a.orderIndex - b.orderIndex);
    },
  });
}