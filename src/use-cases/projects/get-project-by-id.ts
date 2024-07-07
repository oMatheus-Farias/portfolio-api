import { ProjectNotFoundError } from "../../errors/project"
import { PostgresGetProjectByIdRepository } from "../../repositories/postgres/project/get-project-by-id"

export class GetProjectByIdUseCase {
  constructor(
    private postgresGetProjectByIdRepository: PostgresGetProjectByIdRepository,
  ) {
    this.postgresGetProjectByIdRepository = postgresGetProjectByIdRepository
  }

  async execute(projectId: string) {
    const project =
      await this.postgresGetProjectByIdRepository.execute(projectId)

    if (!project) {
      throw new ProjectNotFoundError()
    }

    return project
  }
}
