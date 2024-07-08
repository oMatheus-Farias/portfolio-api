import { prisma } from "../../../app"

export class PostgresGetUserByIdRepository {
  async execute(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    })

    return user
  }
}
