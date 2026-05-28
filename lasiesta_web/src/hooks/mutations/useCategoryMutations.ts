import {
  Category,
  CategoryFormData,
  createCategory,
  updateCategory,
  updateCategoryStatus,
} from "../../services/categories.service";
import { adminCategoryKeys, categoryKeys } from "../../hooks/queries/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateCategoryParams = {
  id: string;
  data: CategoryFormData;
};

type UpdateCategoryStatusParams = {
  id: string;
  isActive: boolean;
};

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminCategoryKeys.list() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.activeList });
    },
  });
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCategoryParams) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminCategoryKeys.list() });
      queryClient.invalidateQueries({ queryKey: categoryKeys.activeList });
    },
  });
}

export function useUpdateCategoryStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: UpdateCategoryStatusParams) =>
      updateCategoryStatus(id, isActive),

    onMutate: async ({ id, isActive }) => {
      await queryClient.cancelQueries({
        queryKey: adminCategoryKeys.list(),
      });

      const previousCategories = queryClient.getQueryData<Category[]>(
        adminCategoryKeys.list(),
      );

      queryClient.setQueryData<Category[]>(
        adminCategoryKeys.list(),
        (oldCategories) =>
          oldCategories?.map((category) =>
            category.id === id
              ? {
                  ...category,
                  isActive,
                }
              : category,
          ) ?? [],
      );

      return { previousCategories };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        adminCategoryKeys.list(),
        context?.previousCategories,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: adminCategoryKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: categoryKeys.activeList,
      });
    },
  });
}
