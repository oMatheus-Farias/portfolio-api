import { CreateProjectUseCase } from "../../use-cases"

import { ZodError } from "zod"
import { badRequest, internalServerError } from "../../errors"
import { ProjectNameAlreadyExistsError } from "../../errors/project"

import { createProjectsSchema } from "../../schemas/projects"
import { Projects } from "@prisma/client"

interface CreateProjectControllerParams {
  httpRequest: Projects
}
export class CreateProjectController {
  constructor(private createProjectUseCase: CreateProjectUseCase) {
    this.createProjectUseCase = createProjectUseCase
  }

  async execute({ httpRequest }: CreateProjectControllerParams) {
    try {
      await createProjectsSchema.parseAsync(httpRequest)

      const project = await this.createProjectUseCase.execute({
        params: httpRequest,
      })

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

      console.log(error)
      return internalServerError("Internal server error")
    }
  }
}
