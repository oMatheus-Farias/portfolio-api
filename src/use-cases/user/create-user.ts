import {
  PostgresCreateUserRepository,
  PostgresGetUserByEmailRepository,
} from "../../repositories/postgres"
import { PasswordHasherAdapter } from "../../adapters/password-hasher"

import { EmailAlreadyExistsError } from "../../errors"

import { CreateUserParams } from "../../@types/create-user"

export class CreateUserUseCase {
  constructor(
    private postgresCreateUserRepository: PostgresCreateUserRepository,
    private postgresGetUserByEmailRepository: PostgresGetUserByEmailRepository,
    private passwordHasherAdapter: PasswordHasherAdapter,
  ) {
    this.postgresCreateUserRepository = postgresCreateUserRepository
    this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository
    this.passwordHasherAdapter = passwordHasherAdapter
  }

  async execute({ params }: CreateUserParams) {
    const emailAlreadyExists =
      await this.postgresGetUserByEmailRepository.execute(params.email)

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError(params.email)
    }

    const hashedPassword = await this.passwordHasherAdapter.execute(
      params.password,
    )

    const user = await this.postgresCreateUserRepository.execute({
      params: {
        ...params,
        password: hashedPassword,
      },
    })

    return user
  }
}
