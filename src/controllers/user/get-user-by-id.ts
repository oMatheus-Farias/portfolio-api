import { ZodError } from "zod"
import {
  badRequest,
  internalServerError,
  notFound,
  UserNotFoundError,
} from "../../errors"
import { checkIfIdIsValid } from "../../helpers/validation-id"
import { getUserByIdSchema } from "../../schemas"
import { GetUserByIdUseCase } from "../../use-cases/user/get-user-by-id"

export class GetUserByIdController {
  constructor(private getUserByIdUseCase: GetUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase
  }

  async execute(userId: string) {
    try {
      await getUserByIdSchema.parseAsync({ userId })

      const idIsValid = checkIfIdIsValid(userId)

      if (!idIsValid) {
        return badRequest("Invalid user ID.")
      }

      const user = await this.getUserByIdUseCase.execute(userId)

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

      console.log(error)
      return internalServerError("Internal server error.")
    }
  }
}
