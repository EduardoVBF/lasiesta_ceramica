import {
  HomeCarouselFormData,
  HomeCarouselItem,
  createHomeCarouselItem,
  reorderHomeCarousel,
  updateHomeCarouselItem,
} from "../../services/carousel.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminCarouselKeys } from "../queries/queryKeys";

type UpdateHomeCarouselItemParams = {
  id: string;
  data: HomeCarouselFormData;
};

type UpdateHomeCarouselStatusParams = {
  id: string;
  isActive: boolean;
};

type ReorderHomeCarouselParams = {
  reorderedItems: HomeCarouselItem[];
};

export function useCreateHomeCarouselItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHomeCarouselItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminCarouselKeys.list() });
    },
  });
}

export function useUpdateHomeCarouselItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateHomeCarouselItemParams) =>
      updateHomeCarouselItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminCarouselKeys.list() });
    },
  });
}

export function useUpdateHomeCarouselStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: UpdateHomeCarouselStatusParams) =>
      updateHomeCarouselItem(id, { isActive }),

    onMutate: async ({ id, isActive }) => {
      await queryClient.cancelQueries({
        queryKey: adminCarouselKeys.list(),
      });

      const previousItems = queryClient.getQueryData<HomeCarouselItem[]>(
        adminCarouselKeys.list(),
      );

      queryClient.setQueryData<HomeCarouselItem[]>(
        adminCarouselKeys.list(),
        (oldItems) =>
          oldItems?.map((item) =>
            item.id === id
              ? {
                  ...item,
                  isActive,
                }
              : item,
          ) ?? [],
      );

      return { previousItems };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData<HomeCarouselItem[]>(
        adminCarouselKeys.list(),
        context?.previousItems,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: adminCarouselKeys.list(),
      });
    },
  });
}

export function useReorderHomeCarouselMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reorderedItems }: ReorderHomeCarouselParams) =>
      reorderHomeCarousel(
        reorderedItems
          .filter((item) => item.isActive)
          .map(({ id, orderIndex }) => ({
            id,
            orderIndex,
          })),
      ),

    onMutate: async ({ reorderedItems }) => {
      await queryClient.cancelQueries({
        queryKey: adminCarouselKeys.list(),
      });

      const previousItems = queryClient.getQueryData<HomeCarouselItem[]>(
        adminCarouselKeys.list(),
      );

      queryClient.setQueryData<HomeCarouselItem[]>(
        adminCarouselKeys.list(),
        reorderedItems,
      );

      return { previousItems };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData<HomeCarouselItem[]>(
        adminCarouselKeys.list(),
        context?.previousItems,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: adminCarouselKeys.list(),
      });
    },
  });
}
