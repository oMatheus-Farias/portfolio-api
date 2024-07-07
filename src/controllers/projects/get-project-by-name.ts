import { ZodError } from "zod"
import { GetProjectByNameUseCase } from "../../use-cases"
import { badRequest, internalServerError, notFound } from "../../errors"
import { ProjectNotFoundError } from "../../errors/project"
import { getProjectByNameSchema } from "../../schemas/projects"

export class GetProjectByNameController {
  constructor(private getProjectByNameUseCase: GetProjectByNameUseCase) {
    this.getProjectByNameUseCase = getProjectByNameUseCase
  }

  async execute(projectName: string) {
    try {
      await getProjectByNameSchema.parseAsync({ name: projectName })

      const project = await this.getProjectByNameUseCase.execute(projectName)

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
