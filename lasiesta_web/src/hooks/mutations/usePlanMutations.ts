import {
  Plan,
  PlanFormData,
  createPlan,
  updatePlan,
  updatePlanStatus,
} from "../../services/plans.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminPlanKeys, planKeys } from "../queries/queryKeys";

type UpdatePlanParams = {
  id: string;
  data: PlanFormData;
};

type UpdatePlanStatusParams = {
  id: string;
  isActive: boolean;
};

export function useCreatePlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminPlanKeys.list() });
      queryClient.invalidateQueries({ queryKey: planKeys.activeList });
    },
  });
}

export function useUpdatePlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdatePlanParams) => updatePlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminPlanKeys.list() });
      queryClient.invalidateQueries({ queryKey: planKeys.activeList });
    },
  });
}

export function useUpdatePlanStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: UpdatePlanStatusParams) =>
      updatePlanStatus(id, isActive),

    onMutate: async ({ id, isActive }) => {
      await queryClient.cancelQueries({
        queryKey: adminPlanKeys.list(),
      });

      const previousPlans = queryClient.getQueryData<Plan[]>(
        adminPlanKeys.list(),
      );

      queryClient.setQueryData<Plan[]>(
        adminPlanKeys.list(),
        (oldPlans) =>
          oldPlans?.map((plan) =>
            plan.id === id
              ? {
                  ...plan,
                  isActive,
                }
              : plan,
          ) ?? [],
      );

      return { previousPlans };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData(adminPlanKeys.list(), context?.previousPlans);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: adminPlanKeys.list() });
      queryClient.invalidateQueries({ queryKey: planKeys.activeList });
    },
  });
}
