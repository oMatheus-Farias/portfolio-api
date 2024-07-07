import { CreateProjectController } from "../../controllers"
import { PostgresCreateProjectRepository } from "../../repositories/postgres"
import { CreateProjectUseCase } from "../../use-cases"

export const makeCreateProjectController = () => {
  const postgresCreateProjectRepository = new PostgresCreateProjectRepository()

  const createProjectUseCase = new CreateProjectUseCase(
    postgresCreateProjectRepository,
  )

  const createProjectController = new CreateProjectController(
    createProjectUseCase,
  )

  return createProjectController
}
