import { prisma } from "../../../app"

export class PostgresGetProjectsByUserIdRepository {
  async execute(userId: string) {
    const projects = await prisma.projects.findMany({
      where: {
        userId,
      },
    })

    return projects
  }
}
