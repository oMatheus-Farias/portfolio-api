import { DeleteProjectUseCase } from "../../use-cases"

import {
  badRequest,
  internalServerError,
  notFound,
  ProjectNotFoundError,
  unauthorized,
  UserUnauthorizedError,
} from "../../errors"
import { ZodError } from "zod"

import { checkIfIdIsValid } from "../../helpers/validation-id"
import { updateAndDeleteProjectSchema } from "../../schemas/projects"

export class DeleteProjectController {
  constructor(private deleteProjectUseCase: DeleteProjectUseCase) {
    this.deleteProjectUseCase = deleteProjectUseCase
  }

  async execute(projectId: string, userId: string) {
    try {
      await updateAndDeleteProjectSchema.parseAsync({ projectId, userId })

      const projectIdIsValid = checkIfIdIsValid(projectId)
      const userIdIsValid = checkIfIdIsValid(userId)

      if (!projectIdIsValid) {
        return notFound(
          "Project ID is not valid. Please provide a valid project ID.",
        )
      }

      if (!userIdIsValid) {
        return notFound("User ID is not valid. Please provide a valid user ID.")
      }

      const projectDeleted = await this.deleteProjectUseCase.execute(
        projectId,
        userId,
      )

      return {
        statusCode: 200,
        body: projectDeleted,
      }
    } catch (error) {
      if (error instanceof ProjectNotFoundError) {
        return notFound(error.message)
      }

      if (error instanceof UserUnauthorizedError) {
        return unauthorized(error.message)
      }

      if (error instanceof ZodError) {
        return badRequest(error.errors[0].message)
      }

      console.log(error)
      return internalServerError("Internal server error.")
    }
  }
}
