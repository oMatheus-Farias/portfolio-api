import { prisma } from "../../../app"
import { CreateUserUseCaseParams } from "../../../types/create-user"

export class PostgresCreateUserRepository {
  async execute({ params }: CreateUserUseCaseParams) {
    const user = await prisma.user.create({
      data: {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        password: params.password,
      },
    })

    return user
  }
}
