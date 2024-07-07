import {
  CreateProjectController,
  GetProjectByNameController,
} from "../../controllers"
import {
  PostgresCreateProjectRepository,
  PostgresGetProjectByNameRepository,
} from "../../repositories/postgres"
import { CreateProjectUseCase, GetProjectByNameUseCase } from "../../use-cases"

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
