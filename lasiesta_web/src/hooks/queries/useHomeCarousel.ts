import { getHomeCarousel } from "../../services/carousel.service";
import { useQuery } from "@tanstack/react-query";
import { carouselKeys } from "./queryKeys";

export function useHomeCarousel() {
  return useQuery({
    queryKey: carouselKeys.home,
    queryFn: async () => {
      const data = await getHomeCarousel();

      return [...data]
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .filter((item) => item.isActive);
    },
  });
}
