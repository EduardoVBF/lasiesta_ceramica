import { getActivePlans } from "../../services/plans.service";
import { useQuery } from "@tanstack/react-query";
import { planKeys } from "./queryKeys";

export function useActivePlans() {
  return useQuery({
    queryKey: planKeys.activeList,
    queryFn: getActivePlans,
  });
}