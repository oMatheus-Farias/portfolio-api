import { GetProjectsByUserIdUseCase } from "../../use-cases"

import {
  badRequest,
  internalServerError,
  notFound,
  UserNotFoundError,
} from "../../errors"
import { ZodError } from "zod"

import { getByIdSchema } from "../../schemas/projects"
import { checkIfIdIsValid } from "../../helpers/validation-id"

export class GetProjectsByUserIdController {
  constructor(private getProjectsByUserIdUseCase: GetProjectsByUserIdUseCase) {
    this.getProjectsByUserIdUseCase = getProjectsByUserIdUseCase
  }

  async execute(userId: string) {
    try {
      await getByIdSchema.parseAsync({ id: userId })

      const isIdValid = checkIfIdIsValid(userId)

      if (!isIdValid) {
        return badRequest(
          "The provided id is not valid. Please provide a valid id.",
        )
      }

      const projects = await this.getProjectsByUserIdUseCase.execute(userId)

      return {
        statusCode: 200,
        body: projects,
      }
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return notFound(error.message)
      }

      if (error instanceof ZodError) {
        return notFound(error.errors[0].message)
      }

      console.log(error)
      return internalServerError("Internal server error")
    }
  }
}
