import { prisma } from "../../../app"

export class PostgresGetUserByIdRepository {
  async execute(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return user
  }
}
