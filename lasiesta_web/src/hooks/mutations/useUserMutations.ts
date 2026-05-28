import {
  CreateUserPayload,
  UpdateUserPayload,
  User,
  createUser,
  resetUserPassword,
  updateUser,
} from "../../services/users.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUserKeys } from "../queries/queryKeys";

type UpdateUserParams = {
  id: string;
  data: UpdateUserPayload;
};

type UpdateUserStatusParams = {
  id: string;
  isActive: boolean;
};

type ResetUserPasswordParams = {
  id: string;
  newPassword: string;
};

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserPayload) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminUserKeys.list() });
    },
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateUserParams) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminUserKeys.list() });
    },
  });
}

export function useUpdateUserStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: UpdateUserStatusParams) =>
      updateUser(id, { isActive }),

    onMutate: async ({ id, isActive }) => {
      await queryClient.cancelQueries({
        queryKey: adminUserKeys.list(),
      });

      const previousUsers = queryClient.getQueryData<User[]>(
        adminUserKeys.list(),
      );

      queryClient.setQueryData<User[]>(
        adminUserKeys.list(),
        (oldUsers) =>
          oldUsers?.map((user) =>
            user.id === id
              ? {
                  ...user,
                  isActive,
                }
              : user,
          ) ?? [],
      );

      return { previousUsers };
    },

    onError: (_error, _variables, context) => {
      queryClient.setQueryData<User[]>(
        adminUserKeys.list(),
        context?.previousUsers,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: adminUserKeys.list(),
      });
    },
  });
}

export function useResetUserPasswordMutation() {
  return useMutation({
    mutationFn: ({ id, newPassword }: ResetUserPasswordParams) =>
      resetUserPassword(id, { newPassword }),
  });
}
