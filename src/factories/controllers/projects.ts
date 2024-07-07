import {
  CreateProjectController,
  GetProjectByNameController,
  GetProjectByIdController,
  GetProjectsByUserIdController,
} from "../../controllers"

import {
  PostgresCreateProjectRepository,
  PostgresGetProjectByNameRepository,
  PostgresGetProjectByIdRepository,
  PostgresGetProjectsByUserIdRepository,
} from "../../repositories/postgres"

import {
  CreateProjectUseCase,
  GetProjectByNameUseCase,
  GetProjectByIdUseCase,
  GetProjectsByUserIdUseCase,
} from "../../use-cases"

export const makeCreateProjectController = () => {
  const postgresCreateProjectRepository = new PostgresCreateProjectRepository()
  const postgresGetProjectByNameRepository =
    new PostgresGetProjectByNameRepository()

  const createProjectUseCase = new CreateProjectUseCase(
    postgresCreateProjectRepository,
    postgresGetProjectByNameRepository,
  )

  const createProjectController = new CreateProjectController(
    createProjectUseCase,
  )

  return createProjectController
}

export const makeGetProjectByNameController = () => {
  const postgresGetProjectByNameRepository =
    new PostgresGetProjectByNameRepository()

  const getProjectByNameUseCase = new GetProjectByNameUseCase(
    postgresGetProjectByNameRepository,
  )

  const getProjectByNameController = new GetProjectByNameController(
    getProjectByNameUseCase,
  )

  return getProjectByNameController
}

export const makeGetProjectByIdController = () => {
  const postgresGetProjectByIdRepository =
    new PostgresGetProjectByIdRepository()

  const getProjectByIdUseCase = new GetProjectByIdUseCase(
    postgresGetProjectByIdRepository,
  )

  const getProjectByIdController = new GetProjectByIdController(
    getProjectByIdUseCase,
  )

  return getProjectByIdController
}

export const makeGetProjectsByUserIdController = () => {
  const postgresGetProjectsByUserIdRepository =
    new PostgresGetProjectsByUserIdRepository()

  const getProjectsByUserIdUseCase = new GetProjectsByUserIdUseCase(
    postgresGetProjectsByUserIdRepository,
  )

  const getProjectsByUserIdController = new GetProjectsByUserIdController(
    getProjectsByUserIdUseCase,
  )

  return getProjectsByUserIdController
}
