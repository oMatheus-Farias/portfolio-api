import {
  PostgresCreateProjectRepository,
  PostgresGetProjectByNameRepository,
} from "../../repositories/postgres"

import { CreateProjectParams } from "../../@types/create-project"
import { ProjectNameAlreadyExistsError } from "../../errors/project"

export class CreateProjectUseCase {
  constructor(
    private postgresCreateProjectRepository: PostgresCreateProjectRepository,
    private postgresGetProjectByNameRepository: PostgresGetProjectByNameRepository,
  ) {
    this.postgresCreateProjectRepository = postgresCreateProjectRepository
  }

  async execute({ params }: CreateProjectParams) {
    const nameProjectAlreadyExists =
      await this.postgresGetProjectByNameRepository.execute(params.name)

    if (nameProjectAlreadyExists) {
      throw new ProjectNameAlreadyExistsError(params.name)
    }

    const project = await this.postgresCreateProjectRepository.execute({
      params,
    })

    return project
  }
}
