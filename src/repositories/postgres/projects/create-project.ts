import { prisma } from "../../../app"

import { CreateProjectParams } from "../../../@types/create-project"

export class PostgresCreateProjectRepository {
  async execute({ params }: CreateProjectParams) {
    const project = await prisma.projects.create({
      data: {
        name: params.name,
        description: params.description,
        imagesUrl: params.imagesUrl,
        repositoryUrl: params.repositoryUrl,
        projectUrl: params.projectUrl,
        technologies: params.technologies,
        userId: params.userId,
      },
    })

    return project
  }
}
