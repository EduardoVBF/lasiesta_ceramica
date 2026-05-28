import { updateBanner, BannerFormData } from "../../services/banner.service";
import { adminBannerKeys, bannerKeys } from "../../hooks/queries/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateBannerParams = {
  id: string;
  data: BannerFormData;
};

export function useUpdateBannerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateBannerParams) => updateBanner(id, data),
    onSuccess: (updatedBanner) => {
      queryClient.invalidateQueries({ queryKey: adminBannerKeys.list() });
      queryClient.invalidateQueries({
        queryKey: bannerKeys.byPage(updatedBanner.page),
      });
    },
  });
}
