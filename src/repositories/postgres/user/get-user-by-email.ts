import { prisma } from "../../../app"

export class PostgresGetUserByEmailRepository {
  async execute(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
