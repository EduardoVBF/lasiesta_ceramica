import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export type LoginDTO = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["admin", "editor"]).optional(),
});

export type RegisterDTO = z.infer<typeof registerSchema>;