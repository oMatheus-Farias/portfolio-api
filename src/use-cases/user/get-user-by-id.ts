import { PostgresGetUserByIdRepository } from "../../repositories/postgres/user/get-user-by-id"

import { UserNotFoundError } from "../../errors"

export class GetUserByIdUseCase {
  constructor(
    private postgresGetUserByIdRepository: PostgresGetUserByIdRepository,
  ) {
    this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
  }

  async execute(userId: string) {
    const user = await this.postgresGetUserByIdRepository.execute(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  }
}
