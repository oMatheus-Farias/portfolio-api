import { User } from "@prisma/client"

import { ZodError } from "zod"
import { createUserSquema } from "../../schemas"

import { CreateUserUseCase } from "../../use-cases/user/create-user"

import {
  EmailAlreadyExistsError,
  badRequest,
  internalServerError,
} from "../../errors"

interface CreateUserControllerParams {
  httRequest: User
}

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase
  }

  async execute({ httRequest }: CreateUserControllerParams) {
    try {
      await createUserSquema.parseAsync(httRequest)

      const user = await this.createUserUseCase.execute({
        params: httRequest,
      })

      return {
        statusCode: 201,
        body: user,
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors[0].message)
      }

      if (error instanceof EmailAlreadyExistsError) {
        return badRequest(error.message)
      }

      console.error(error)
      return internalServerError("Internal server error")
    }
  }
}
