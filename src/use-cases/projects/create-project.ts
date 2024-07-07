import { PostgresCreateProjectRepository } from "../../repositories/postgres"

import { CreateProjectParams } from "../../@types/create-project"
import { prisma } from "../../app"
import { ProjectNameAlreadyExistsError } from "../../errors/project"

export class CreateProjectUseCase {
  constructor(
    private postgresCreateProjectRepository: PostgresCreateProjectRepository,
  ) {
    this.postgresCreateProjectRepository = postgresCreateProjectRepository
  }

  async execute({ params }: CreateProjectParams) {
    //FIXME: Refactor, add PostgresGetProjectByNameRepository
    const nameProjectAlreadyExists = await prisma.projects.findFirst({
      where: {
        name: params.name,
      },
    })

    if (nameProjectAlreadyExists) {
      throw new ProjectNameAlreadyExistsError(params.name)
    }

    const project = await this.postgresCreateProjectRepository.execute({
      params,
    })

    return project
  }
}
