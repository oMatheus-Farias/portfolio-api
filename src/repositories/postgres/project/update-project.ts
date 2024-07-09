import { prisma } from "../../../app"

import { UpdateProjectParams } from "../../../@types/update-project"

export class PostgresUpdateProjectRepository {
  async execute(updateParams: UpdateProjectParams) {
    const updatedProject = await prisma.projects.update({
      where: {
        userId: updateParams.userId,
        id: updateParams.projectId,
      },
      data: {
        ...updateParams.updateParams,
      },
    })

    return updatedProject
  }
}
