import { describe, it, expect, vitest } from "vitest"

import { GetUserByEmailController } from "./get-user-by-email"
import { GetUserByEmailUseCase } from "../../use-cases"

import { faker } from "@faker-js/faker"

describe("Get User By Email Controller", () => {
  const user = {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  class PostgresGetUserByEmailRepositoryStub {
    async execute() {
      return user
    }
  }

  const makeSut = () => {
    const postgresGetUserByEmailRepositoryStub =
      new PostgresGetUserByEmailRepositoryStub()

    const getUserByEmailUseCaseStub = new GetUserByEmailUseCase(
      postgresGetUserByEmailRepositoryStub,
    )

    const sut = new GetUserByEmailController(getUserByEmailUseCaseStub)

    return {
      sut,
      getUserByEmailUseCaseStub,
    }
  }

  it("should return 200 with user by email", async () => {
    const { sut } = makeSut()

    const response = await sut.execute(user.email)

    expect(response).toEqual({
      statusCode: 200,
      body: user,
    })
  })
})
