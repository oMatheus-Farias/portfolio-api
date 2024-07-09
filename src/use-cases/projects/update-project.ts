import {
  PostgresUpdateProjectRepository,
  PostgresGetProjectByIdRepository,
  PostgresGetUserByIdRepository,
  PostgresGetProjectsByUserIdRepository,
} from "../../repositories/postgres"

import {
  UserNotFoundError,
  ProjectNotFoundError,
  ProjectNameAlreadyExistsError,
} from "../../errors"

import { checkProjectExists } from "../../helpers/check-project-exists"

import { UpdateProjectParams } from "../../@types/update-project"

export class UpdateProjectUseCase {
  constructor(
    private postgresUpdateProjectRepository: PostgresUpdateProjectRepository,
    private postgresGetProjectByIdRepository: PostgresGetProjectByIdRepository,
    private postgresGetUserByIdRepository: PostgresGetUserByIdRepository,
    private postgresGetProjectsByUserIdRepository: PostgresGetProjectsByUserIdRepository,
  ) {
    this.postgresUpdateProjectRepository = postgresUpdateProjectRepository
    this.postgresGetProjectByIdRepository = postgresGetProjectByIdRepository
    this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
    this.postgresGetProjectsByUserIdRepository =
      postgresGetProjectsByUserIdRepository
  }

  async execute(updateParams: UpdateProjectParams) {
    const userAlreadyExists = await this.postgresGetUserByIdRepository.execute(
      updateParams.userId,
    )
    const projectAlreadyExists =
      await this.postgresGetProjectByIdRepository.execute(
        updateParams.projectId,
      )

    if (!userAlreadyExists) {
      throw new UserNotFoundError()
    }

    if (!projectAlreadyExists) {
      throw new ProjectNotFoundError()
    }

    const registeredProjects =
      await this.postgresGetProjectsByUserIdRepository.execute(
        updateParams.userId,
      )

    const projectAlreadyExistsWithSameName = checkProjectExists(
      {
        project: registeredProjects,
      },
      updateParams.updateParams.name,
    )

    if (projectAlreadyExistsWithSameName) {
      throw new ProjectNameAlreadyExistsError(updateParams.updateParams.name)
    }

    const updatedProject =
      await this.postgresUpdateProjectRepository.execute(updateParams)

    return updatedProject
  }
}
