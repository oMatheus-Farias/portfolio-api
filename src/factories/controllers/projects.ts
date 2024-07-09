import {
  CreateProjectController,
  GetProjectByNameController,
  GetProjectByIdController,
  GetProjectsByUserIdController,
  UpdateProjectController,
} from "../../controllers"

import {
  PostgresCreateProjectRepository,
  PostgresGetProjectByNameRepository,
  PostgresGetProjectByIdRepository,
  PostgresGetProjectsByUserIdRepository,
  PostgresGetUserByIdRepository,
  PostgresUpdateProjectRepository,
} from "../../repositories/postgres"

import {
  CreateProjectUseCase,
  GetProjectByNameUseCase,
  GetProjectByIdUseCase,
  GetProjectsByUserIdUseCase,
  UpdateProjectUseCase,
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
  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()

  const getProjectsByUserIdUseCase = new GetProjectsByUserIdUseCase(
    postgresGetProjectsByUserIdRepository,
    postgresGetUserByIdRepository,
  )

  const getProjectsByUserIdController = new GetProjectsByUserIdController(
    getProjectsByUserIdUseCase,
  )

  return getProjectsByUserIdController
}

export const makeUpdateProjectController = () => {
  const postgresUpdateProjectRepository = new PostgresUpdateProjectRepository()
  const postgresGetProjectByIdRepository =
    new PostgresGetProjectByIdRepository()
  const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()
  const postgresGetProjectByUserIdRepository =
    new PostgresGetProjectsByUserIdRepository()

  const updateProjectUseCase = new UpdateProjectUseCase(
    postgresUpdateProjectRepository,
    postgresGetProjectByIdRepository,
    postgresGetUserByIdRepository,
    postgresGetProjectByUserIdRepository,
  )

  const updateProjectController = new UpdateProjectController(
    updateProjectUseCase,
  )

  return updateProjectController
}
