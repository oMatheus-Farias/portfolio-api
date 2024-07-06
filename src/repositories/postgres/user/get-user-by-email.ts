import { prisma } from "../../../app"

export class PostgresGetUserByEmailRepository {
  async execute(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
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
