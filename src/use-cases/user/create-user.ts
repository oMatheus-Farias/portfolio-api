import { prisma } from "../../app"

import { PostgresCreateUserRepository } from "../../repositories/postgres/user/create-user"
import { PasswordHasherAdapter } from "../../adapters/password-hasher"

import { CreateUserUseCaseParams } from "../../types/create-user"

import { MissingFieldsError, EmailAlreadyExistsError } from "../../errors"

export class CreateUserUseCase {
  constructor(
    private postgresCreateUserRepository: PostgresCreateUserRepository,
    private passwordHasherAdapter: PasswordHasherAdapter,
  ) {
    this.postgresCreateUserRepository = postgresCreateUserRepository
    this.passwordHasherAdapter = passwordHasherAdapter
  }

  async execute({ params }: CreateUserUseCaseParams) {
    if (
      !params.firstName ||
      !params.lastName ||
      !params.email ||
      !params.password
    ) {
      throw new MissingFieldsError()
    }

    //FIXME - Refactor, add PostgresGetUserByEmailRepository
    const emailAlreadyExists = await prisma.user.findUnique({
      where: {
        email: params.email,
      },
    })

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
