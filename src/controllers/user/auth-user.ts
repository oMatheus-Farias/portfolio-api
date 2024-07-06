import { ZodError } from "zod"
import {
  badRequest,
  internalServerError,
  notFound,
  UserNotFoundError,
} from "../../errors"
import { authUserSchema } from "../../schemas"
import { AuthUserUseCase } from "../../use-cases/user/auth-user"

export class AuthUserController {
  constructor(private authUserUseCase: AuthUserUseCase) {
    this.authUserUseCase = authUserUseCase
  }

  async execute(email: string, password: string) {
    try {
      await authUserSchema.parseAsync({ email, password })

      const authUser = await this.authUserUseCase.execute(email, password)

      return {
        statusCode: 200,
        body: authUser,
      }
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return notFound(error.message)
      }

      if (error instanceof ZodError) {
        return badRequest(error.errors[0].message)
      }

      console.error(error)
      return internalServerError("Internal server error")
    }
  }
}
