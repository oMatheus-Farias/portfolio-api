import { prisma } from "../../../app"
import { CreateUserParams } from "../../../types/create-user"

export class PostgresCreateUserRepository {
  async execute({ params }: CreateUserParams) {
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
