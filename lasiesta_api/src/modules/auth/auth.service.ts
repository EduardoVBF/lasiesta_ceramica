import { prisma } from "../../shared/database/prisma";
import { RegisterDTO } from "./auth.schemas";
import { LoginDTO } from "./auth.schemas";
import bcrypt from "bcrypt";

export class AuthService {
  // Lógica de login
  async login({ email, password }: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      throw new Error("Credenciais inválidas.");
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      throw new Error("Credenciais inválidas.");
    }

    return user;
  }

  // Lógica de registro
  async register(data: RegisterDTO) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Usuário com este email já existe.");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        passwordHash,
        role: data.role || "admin",
      },
    });

    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
    };
  }
}
