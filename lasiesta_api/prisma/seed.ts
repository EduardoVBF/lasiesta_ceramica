import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'eduardo@lasiesta.com';
  const password = 'Admin@123lasiesta';

  const passwordHash = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log('Admin user already exists. Skipping seed.');
    return;
  }

  await prisma.user.create({
    data: {
      firstName: 'Eduardo',
      lastName: 'Freitas',
      email,
      passwordHash,
      role: 'admin',
      isActive: true,
    },
  });

  console.log('Admin user created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
