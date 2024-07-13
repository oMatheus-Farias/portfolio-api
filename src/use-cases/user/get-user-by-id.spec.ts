import { describe, it, expect, vitest } from "vitest"

import { GetUserByIdUseCase } from "./get-user-by-id"

import { faker } from "@faker-js/faker"
import { UserNotFoundError } from "../../errors"

describe("Get User By Id UseCase", () => {
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

    const sut = new GetUserByIdUseCase(postgresGetUserByIdRepositoryStub)

    return {
      sut,
      postgresGetUserByIdRepositoryStub,
    }
  }

  it("should successfully get a user by id", async () => {
    const { sut } = makeSut()

    const result = await sut.execute(user.id)

    expect(result).not.toBeNull()
    expect(result).toEqual(user)
  })

  it("should throw UserNotFoundError if user is not found", async () => {
    const { sut, postgresGetUserByIdRepositoryStub } = makeSut()

    vitest
      .spyOn(postgresGetUserByIdRepositoryStub, "execute")
      .mockRejectedValueOnce(new UserNotFoundError())

    const result = sut.execute(user.id)

    await expect(result).rejects.toThrowError(new UserNotFoundError())
  })
})
