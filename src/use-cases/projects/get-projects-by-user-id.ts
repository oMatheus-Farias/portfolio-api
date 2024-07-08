import {
  PostgresGetProjectsByUserIdRepository,
  PostgresGetUserByIdRepository,
} from "../../repositories/postgres"

import { UserNotFoundError } from "../../errors"

export class GetProjectsByUserIdUseCase {
  constructor(
    private postgresGetProjectsByUserIdRepository: PostgresGetProjectsByUserIdRepository,
    private postgresGetUserByIdRepository: PostgresGetUserByIdRepository,
  ) {
    this.postgresGetProjectsByUserIdRepository =
      postgresGetProjectsByUserIdRepository
    this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
  }

  async execute(userId: string) {
    const projects =
      await this.postgresGetProjectsByUserIdRepository.execute(userId)

    const user = await this.postgresGetUserByIdRepository.execute(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    if (!projects) {
      return []
    }

    return projects
  }
}
