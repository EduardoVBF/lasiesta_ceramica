import { BannerPage, getPublicBannerByPage } from "../../services/banner.service";
import { useQuery } from "@tanstack/react-query";
import { bannerKeys } from "./queryKeys";

export function usePublicBannerByPage(page: BannerPage) {
  return useQuery({
    queryKey: bannerKeys.byPage(page),
    queryFn: () => getPublicBannerByPage(page),
  });
}