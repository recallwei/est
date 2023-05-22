import { randAvatar, randFullAddress, randPastDate, randPhoneNumber } from '@ngneat/falso'
import { Gender, Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CURRENT_DATE = new Date().toISOString()
const SEED_USER = 'Admin'

const users: Prisma.UserCreateInput[] = [
  {
    uuid: randomUUID(),
    gender: Gender.UNDEFINED,
    firstName: 'Jane',
    lastName: 'Doe',
    birthDate: randPastDate(),
    username: 'janedoe',
    email: 'hello@janedoe.com',
    phoneNumber: randPhoneNumber(),
    address: randFullAddress(),
    profilePicUrl: randAvatar(),
    passwordHash: '$argon2id$v=19$m=4096,t=3,p=1$SnlvMThQRzN5cWhoWnkySQ$YOsVi7+r5v8ngtUmfBNCJpv3Nx/Om6s2nvfEOgSqgKs',
    verified: true,
    enabled: true,
    roles: Array.of(Role.ADMIN),
    createdAt: CURRENT_DATE,
    createdBy: SEED_USER,
    updatedAt: CURRENT_DATE,
    updatedBy: SEED_USER
  }
]

const main = async (): Promise<void> => {
  try {
    users.forEach(async (user) => {
      await prisma.user.create({
        data: user
      })
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
