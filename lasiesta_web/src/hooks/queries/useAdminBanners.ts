import { getAdminBanners } from "../../services/banner.service";
import { useQuery } from "@tanstack/react-query";
import { adminBannerKeys } from "./queryKeys";

export function useAdminBanners() {
  return useQuery({
    queryKey: adminBannerKeys.list(),
    queryFn: getAdminBanners,
  });
}