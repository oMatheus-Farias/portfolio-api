import { prisma } from "../../../app"

export class PostgresDeleteProjectRepository {
  async execute(projectId: string, userId: string) {
    const projectDeleted = await prisma.projects.delete({
      where: {
        id: projectId,
        userId,
      },
    })

    return projectDeleted
  }
}
