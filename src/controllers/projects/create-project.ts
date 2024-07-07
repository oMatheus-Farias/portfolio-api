import { CreateProjectUseCase } from "../../use-cases"

import { ZodError } from "zod"
import { badRequest, internalServerError } from "../../errors"
import { ProjectNameAlreadyExistsError } from "../../errors/project"

import { createProjectsSchema } from "../../schemas/projects"
import { CreateProjectParams } from "../../@types/create-project"

export class CreateProjectController {
  constructor(private createProjectUseCase: CreateProjectUseCase) {
    this.createProjectUseCase = createProjectUseCase
  }

  async execute({ params }: CreateProjectParams) {
    try {
      await createProjectsSchema.parseAsync(params)

      const project = await this.createProjectUseCase.execute({ params })

      return {
        statusCode: 201,
        body: project,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors[0].message)
      }

      if (error instanceof ProjectNameAlreadyExistsError) {
        return badRequest(error.message)
      }

      return internalServerError("Internal server error")
    }
  }
}
