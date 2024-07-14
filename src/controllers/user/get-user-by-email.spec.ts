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

    const result = await sut.execute(user.email)

    expect(result).toEqual({
      statusCode: 200,
      body: user,
    })
  })

  it("should return 400 if email is invalid", async () => {
    const { sut } = makeSut()

    const result = await sut.execute("invalid_email")

    expect(result.statusCode).toBe(400)
  })

  it("should return 400 if email is missing", async () => {
    const { sut } = makeSut()

    const result = await sut.execute("")

    expect(result.statusCode).toBe(400)
  })
})
