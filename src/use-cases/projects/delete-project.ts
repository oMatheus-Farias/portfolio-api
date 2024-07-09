import {
  PostgresDeleteProjectRepository,
  PostgresGetProjectByIdRepository,
} from "../../repositories/postgres"

import { ProjectNotFoundError, UserUnauthorizedError } from "../../errors"

export class DeleteProjectUseCase {
  constructor(
    private postgresDeleteProjectRepository: PostgresDeleteProjectRepository,
    private postgresGetProjectByIdRepository: PostgresGetProjectByIdRepository,
  ) {
    this.postgresDeleteProjectRepository = postgresDeleteProjectRepository
    this.postgresGetProjectByIdRepository = postgresGetProjectByIdRepository
  }

  async execute(projectId: string, userId: string) {
    const projectAlreadyExists =
      await this.postgresGetProjectByIdRepository.execute(projectId)

    if (!projectAlreadyExists) {
      throw new ProjectNotFoundError()
    }

    const userAuthorized = projectAlreadyExists.userId === userId

    if (!userAuthorized) {
      throw new UserUnauthorizedError()
    }

    const projectDeleted = await this.postgresDeleteProjectRepository.execute(
      projectId,
      userId,
    )

    return projectDeleted
  }
}
