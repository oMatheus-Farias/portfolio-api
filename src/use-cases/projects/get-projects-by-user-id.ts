import { prisma } from "../../app"
import { UserNotFoundError } from "../../errors"
import { PostgresGetProjectsByUserIdRepository } from "../../repositories/postgres"

export class GetProjectsByUserIdUseCase {
  constructor(
    private postgresGetProjectsByUserIdRepository: PostgresGetProjectsByUserIdRepository,
  ) {
    this.postgresGetProjectsByUserIdRepository =
      postgresGetProjectsByUserIdRepository
  }

  async execute(userId: string) {
    const projects =
      await this.postgresGetProjectsByUserIdRepository.execute(userId)

    // FIXME: Refactor, add PostgresGetUserByIdRepository
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new UserNotFoundError()
    }

    if (!projects) {
      return []
    }

    return projects
  }
}
