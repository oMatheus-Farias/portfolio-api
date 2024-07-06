import { PostgresGetUserByEmailRepository } from "../../repositories/postgres"

import { UserNotFoundError } from "../../errors"

export class GetUserByEmailUseCase {
  constructor(
    private postgresGetUserByEmailRepository: PostgresGetUserByEmailRepository,
  ) {
    this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository
  }

  async execute(email: string) {
    const user = await this.postgresGetUserByEmailRepository.execute(email)

    if (!user) {
      throw new UserNotFoundError(email)
    }

    return user
  }
}
