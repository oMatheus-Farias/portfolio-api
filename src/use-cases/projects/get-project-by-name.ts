import { ProjectNotFoundError } from "../../errors/project"
import { PostgresGetProjectByNameRepository } from "../../repositories/postgres"

export class GetProjectByNameUseCase {
  constructor(
    private postgresGetProjectByNameRepository: PostgresGetProjectByNameRepository,
  ) {
    this.postgresGetProjectByNameRepository = postgresGetProjectByNameRepository
  }

  async execute(projectName: string) {
    const project =
      await this.postgresGetProjectByNameRepository.execute(projectName)

    if (!project) {
      throw new ProjectNotFoundError(projectName)
    }

    return project
  }
}
