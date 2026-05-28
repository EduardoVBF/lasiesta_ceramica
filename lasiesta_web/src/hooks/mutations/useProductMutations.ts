import {
  Product,
  ProductFormData,
  ProductsResponse,
  createProduct,
  updateProduct,
  updateProductStatus,
} from "../../services/products.service";
import { adminProductKeys, productKeys } from "../queries/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateProductParams = {
  id: string;
  data: ProductFormData;
};

type UpdateProductStatusParams = {
  id: string;
  isActive: boolean;
};

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminProductKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateProductParams) => updateProduct(id, data),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminProductKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: adminProductKeys.detail(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.publicDetail(variables.data.slug),
      });
    },
  });
}

export function useUpdateProductStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: UpdateProductStatusParams) =>
      updateProductStatus(id, isActive),

    onMutate: async ({ id, isActive }) => {
      await queryClient.cancelQueries({
        queryKey: adminProductKeys.all,
      });

      const previousQueries = queryClient.getQueriesData<ProductsResponse>({
        queryKey: adminProductKeys.all,
      });

      previousQueries.forEach(([queryKey, data]) => {
        if (!data) return;

        queryClient.setQueryData<ProductsResponse>(queryKey, {
          ...data,
          items: data.items.map((product: Product) =>
            product.id === id
              ? {
                  ...product,
                  isActive,
                }
              : product,
          ),
        });
      });

      return { previousQueries };
    },

    onError: (_error, _variables, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: adminProductKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });
}
