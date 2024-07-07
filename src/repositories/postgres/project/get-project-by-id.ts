import { prisma } from "../../../app"

export class PostgresGetProjectByIdRepository {
  async execute(projectId: string) {
    const project = await prisma.projects.findUnique({
      where: {
        id: projectId,
      },
    })

    return project
  }
}
