import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  role: z.string(),
});

export type UserResponseDTO = z.infer<typeof userResponseSchema>;

// Lista de usuários
export const usersListResponseSchema = z.array(userResponseSchema);
export type UsersListResponseDTO = z.infer<typeof usersListResponseSchema>;

export const userParamsSchema = z.object({
  id: z.uuid(),
});
export type UserParamsDTO = z.infer<typeof userParamsSchema>;

export const updateUserBodySchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  role: z.enum(["admin", "editor"]).optional(),
});
export type UpdateUserBodyDTO = z.infer<typeof updateUserBodySchema>;

export const resetPasswordBodySchema = z.object({
  newPassword: z.string().min(8),
});
export type ResetPasswordBodyDTO = z.infer<typeof resetPasswordBodySchema>;
