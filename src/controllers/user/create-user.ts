import { User } from "@prisma/client"

import { CreateUserUseCase } from "../../use-cases/user/create-user"

import {
  EmailAlreadyExistsError,
  MissingFieldsError,
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
      //FIXME - Refactor, add zod validation
      if (
        !httRequest.firstName ||
        !httRequest.lastName ||
        !httRequest.email ||
        !httRequest.password
      ) {
        throw new MissingFieldsError()
      }

      const user = await this.createUserUseCase.execute({
        params: httRequest,
      })

      return {
        statusCode: 201,
        body: user,
      }
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        return badRequest(error.message)
      }

      console.error(error)
      return internalServerError("Internal server error")
    }
  }
}
