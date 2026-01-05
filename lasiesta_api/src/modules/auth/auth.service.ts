import { prisma } from '../../shared/database/prisma';
import { LoginDTO } from './auth.schemas';
import bcrypt from 'bcrypt';

export class AuthService {
  async login({ email, password }: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      throw new Error('Credenciais inválidas.');
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatch) {
      throw new Error('Credenciais inválidas.');
    }

    return user;
  }
}