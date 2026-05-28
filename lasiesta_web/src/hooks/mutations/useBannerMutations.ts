import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminBannerKeys } from "../../hooks/queries/queryKeys";
import { updateBanner } from "../../services/banner.service";

export function useUpdateBannerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateBanner>[1] }) =>
      updateBanner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminBannerKeys.list() });
    },
  });
}