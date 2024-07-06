import { GetUserByEmailUseCase } from "../../use-cases"

import { ZodError } from "zod"
import {
  badRequest,
  internalServerError,
  notFound,
  UserNotFoundError,
} from "../../errors"

import { getUserByEmailSchema } from "../../schemas"

export class GetUserByEmailController {
  constructor(private getUserByEmailUseCase: GetUserByEmailUseCase) {
    this.getUserByEmailUseCase = getUserByEmailUseCase
  }

  async execute(email: string) {
    try {
      await getUserByEmailSchema.parseAsync({ email })

      const user = await this.getUserByEmailUseCase.execute(email)

      return {
        statusCode: 200,
        body: user,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors[0].message)
      }

      if (error instanceof UserNotFoundError) {
        return notFound(error.message)
      }

      console.error(error)
      return internalServerError("Internal server error")
    }
  }
}
