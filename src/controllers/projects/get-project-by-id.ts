import { GetProjectByIdUseCase } from "../../use-cases/projects/get-project-by-id"

import { checkIfIdIsValid } from "../../helpers/validation-id"

import { ZodError } from "zod"
import { ProjectNotFoundError } from "../../errors/project"
import { badRequest, internalServerError, notFound } from "../../errors"

import { getByIdSchema } from "../../schemas/projects"

export class GetProjectByIdController {
  constructor(private getProjectByIdUseCase: GetProjectByIdUseCase) {
    this.getProjectByIdUseCase = getProjectByIdUseCase
  }

  async execute(projectId: string) {
    try {
      const isIdValid = checkIfIdIsValid(projectId)

      if (!isIdValid) {
        return badRequest(
          "The provided id is not valid. Please provide a valid id.",
        )
      }

      await getByIdSchema.parseAsync({ id: projectId })

      const project = await this.getProjectByIdUseCase.execute(projectId)

      return {
        statusCode: 200,
        body: project,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors[0].message)
      }

      if (error instanceof ProjectNotFoundError) {
        return notFound(error.message)
      }

      console.log(error)
      return internalServerError("Internal server error")
    }
  }
}
