import { PrismaClient, BannerPage } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  /**
   * ======================
   * ADMIN USER
   * ======================
   */
  const email = 'eduardo@lasiesta.com'
  const password = 'Admin@123lasiesta'
  const passwordHash = await bcrypt.hash(password, 10)

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (!existingUser) {
    await prisma.user.create({
      data: {
        firstName: 'Eduardo',
        lastName: 'Freitas',
        email,
        passwordHash,
        role: 'admin',
        isActive: true,
      },
    })

    console.log('✅ Admin user created')
  } else {
    console.log('ℹ️ Admin user already exists')
  }

  /**
   * ======================
   * BANNERS
   * ======================
   */
  const banners = [
    {
      page: BannerPage.CLASSES,
      imageUrl: '',
      title: 'Aulas de Cerâmica',
      isActive: true,
    },
    {
      page: BannerPage.PRODUCTS,
      imageUrl: '',
      title: 'Produtos Lasiesta',
      isActive: true,
    },
    {
      page: BannerPage.ABOUT,
      imageUrl: '',
      title: 'O Ateliê Lasiesta',
      isActive: true,
    },
  ]

  for (const banner of banners) {
    const exists = await prisma.banner.findFirst({
      where: { page: banner.page },
    })

    if (!exists) {
      await prisma.banner.create({ data: banner })
      console.log(`Banner ${banner.page} criado`)
    } else {
      console.log(`Banner ${banner.page} já existe`)
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
