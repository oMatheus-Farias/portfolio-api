import { PasswordHasherAdapter } from "../../adapters/password-hasher"
import { CreateUserController } from "../../controllers"
import { PostgresCreateUserRepository } from "../../repositories/postgres"
import { CreateUserUseCase } from "../../use-cases"

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
