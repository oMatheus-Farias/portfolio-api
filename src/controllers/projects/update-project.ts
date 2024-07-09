import { UpdateProjectUseCase } from "../../use-cases/projects/update-project"

import {
  badRequest,
  internalServerError,
  notFound,
  ProjectNameAlreadyExistsError,
  ProjectNotFoundError,
  UserNotFoundError,
} from "../../errors"
import { ZodError } from "zod"

import { updateProjectSchema } from "../../schemas/projects"
import { checkIfIdIsValid } from "../../helpers/validation-id"
import { UpdateProjectParams } from "../../@types/update-project"

export class UpdateProjectController {
  constructor(private updateProjectUseCase: UpdateProjectUseCase) {
    this.updateProjectUseCase = updateProjectUseCase
  }

  async execute(updateParams: UpdateProjectParams) {
    try {
      await updateProjectSchema.parseAsync(updateParams)

      const userIdIsValid = checkIfIdIsValid(updateParams.userId)
      const projectIdIsValid = checkIfIdIsValid(updateParams.projectId)

      if (!userIdIsValid || !projectIdIsValid) {
        return badRequest(
          "ID provided is not a valid UUID. Please provide a valid UUID.",
        )
      }

      const updatedProject =
        await this.updateProjectUseCase.execute(updateParams)

      return {
        statusCode: 200,
        body: updatedProject,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors[0].message)
      }

      if (error instanceof UserNotFoundError) {
        return notFound(error.message)
      }

      if (error instanceof ProjectNotFoundError) {
        return notFound(error.message)
      }

      if (error instanceof ProjectNameAlreadyExistsError) {
        return badRequest(error.message)
      }

      console.log(error)
      return internalServerError("Internal server error")
    }
  }
}
