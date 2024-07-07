import { prisma } from "../../../app"

export class PostgresGetProjectByNameRepository {
  async execute(projectName: string) {
    const project = await prisma.projects.findFirst({
      where: {
        name: projectName,
      },
    })

    return project
  }
}
