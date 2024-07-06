import { PasswordHasherAdapter } from "../../adapters/password-hasher"
import {
  CreateUserController,
  GetUserByEmailController,
} from "../../controllers"
import {
  PostgresCreateUserRepository,
  PostgresGetUserByEmailRepository,
} from "../../repositories/postgres"
import { CreateUserUseCase, GetUserByEmailUseCase } from "../../use-cases"

export const makeCreateUserController = () => {
  const createUserRepository = new PostgresCreateUserRepository()
  const passwordHasherAdapter = new PasswordHasherAdapter()

  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    passwordHasherAdapter,
  )

  const createUserController = new CreateUserController(createUserUseCase)

  return createUserController
}

export const makeGetUserByEmailController = () => {
  const postgresGetUserByEmailRepository =
    new PostgresGetUserByEmailRepository()

  const getUserByEmailUseCase = new GetUserByEmailUseCase(
    postgresGetUserByEmailRepository,
  )

  const getUserByEmailController = new GetUserByEmailController(
    getUserByEmailUseCase,
  )

  return getUserByEmailController
}
