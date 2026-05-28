import { getAdminPlans } from "../../services/plans.service";
import { useQuery } from "@tanstack/react-query";
import { adminPlanKeys } from "./queryKeys";

export function useAdminPlans() {
  return useQuery({
    queryKey: adminPlanKeys.list(),
    queryFn: getAdminPlans,
  });
}