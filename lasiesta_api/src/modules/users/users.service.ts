import {
  UserResponseDTO,
  UserParamsDTO,
  UsersListResponseDTO,
  ResetPasswordBodyDTO,
  UpdateUserBodyDTO,
} from "./users.schema";
import { prisma } from "../../shared/database/prisma";
import bcrypt from "bcrypt";

export class UsersService {
  async getAllUsers() {
    return prisma.user.findMany({
      orderBy: { firstName: "asc" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isActive: true,
      },
    }) as Promise<UsersListResponseDTO>;
  }

  async getUserById(id: UserParamsDTO["id"]) {
    const user = (await prisma.user.findUnique({
      where: { id },
    })) as UserResponseDTO | null;

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isActive: true,
      },
    }) as Promise<UserResponseDTO>;
  }

  async updateUser(
    id: UserParamsDTO["id"],
    data: Partial<UpdateUserBodyDTO>,
    requesterRole: "admin" | "editor",
    requesterId: string
  ) {
    const user = (await prisma.user.findUnique({
      where: { id },
    })) as UserResponseDTO | null;

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    // Editor nunca altera role
    if (data.role && requesterRole !== "admin") {
      throw new Error("Sem permissão para alterar função.");
    }

    // Admin não pode se auto-rebaixar
    if (data.role && requesterId === id && data.role !== user.role) {
      throw new Error("Você não pode alterar sua própria função.");
    }

    return prisma.user.update({
      where: { id },
      data: {
        firstName: data.firstName ?? user.firstName,
        lastName: data.lastName ?? user.lastName,
        role: data.role ?? user.role,
        isActive: data.isActive ?? true,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        isActive: true,
      },
    }) as Promise<UserResponseDTO>;
  }

  async resetPassword(id: UserParamsDTO["id"], data: ResetPasswordBodyDTO) {
    const user = (await prisma.user.findUnique({
      where: { id },
    })) as UserResponseDTO | null;

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    return prisma.user.update({
      where: { id },
      data: { passwordHash: hashedPassword },
    }) as Promise<UserResponseDTO>;
  }
}
