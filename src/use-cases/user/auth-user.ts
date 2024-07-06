import { PostgresGetUserByEmailRepository } from "../../repositories/postgres"
import { PasswordCompareAdapter } from "../../adapters/password-compare"
import { SignToken } from "../../adapters/sign-token"

import { UserNotFoundError } from "../../errors"

export class AuthUserUseCase {
  constructor(
    private postgresGetUserByEmailRepository: PostgresGetUserByEmailRepository,
    private passwordCompareAdapter: PasswordCompareAdapter,
    private signToken: SignToken,
  ) {
    this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository
    this.passwordCompareAdapter = passwordCompareAdapter
    this.signToken = signToken
  }

  async execute(email: string, password: string) {
    const user = await this.postgresGetUserByEmailRepository.execute(email)

    if (!user) {
      throw new UserNotFoundError(email)
    }

    const passwordMatch = await this.passwordCompareAdapter.execute(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new UserNotFoundError()
    }

    const token = this.signToken.execute({
      payload: {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    })

    const authUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    }

    return authUser
  }
}
