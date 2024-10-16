import { describe, it, expect, vitest } from "vitest"

import { GetUserByIdController } from "./get-user-by-id"
import { GetUserByIdUseCase } from "../../use-cases"

import { UserNotFoundError } from "../../errors"
import { faker } from "@faker-js/faker"

describe("Get User By Id Controller", () => {
  const user = {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  class PostgresGetUserByIdRepositoryStub {
    async execute() {
      return user
    }
  }

  const makeSut = () => {
    const postgresGetUserByIdRepositoryStub =
      new PostgresGetUserByIdRepositoryStub()

    const getUserByIdUseCaseStub = new GetUserByIdUseCase(
      postgresGetUserByIdRepositoryStub,
    )

    const sut = new GetUserByIdController(getUserByIdUseCaseStub)

    return {
      sut,
      getUserByIdUseCaseStub,
    }
  }

  it("should return 200 with user by id", async () => {
    const { sut } = makeSut()

    const result = await sut.execute(user.id)

    expect(result).toEqual({
      statusCode: 200,
      body: user,
    })
  })

  it("should return 400 if id is invalid", async () => {
    const { sut } = makeSut()

    const result = await sut.execute("invalid_id")

    expect(result.statusCode).toBe(400)
  })

  it("should return 400 if id is missing", async () => {
    const { sut } = makeSut()

    const result = await sut.execute("")

    expect(result.statusCode).toBe(400)
  })

  it("should return 404 if user is not found", async () => {
    const { sut, getUserByIdUseCaseStub } = makeSut()

    vitest
      .spyOn(getUserByIdUseCaseStub, "execute")
      .mockRejectedValueOnce(new UserNotFoundError())

    const result = await sut.execute(user.id)

    expect(result.statusCode).toBe(404)
  })
})
