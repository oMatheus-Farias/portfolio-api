import { describe, it, expect, vitest } from "vitest"

import { GetUserByEmailUseCase } from "./get-user-by-email"

import { faker } from "@faker-js/faker"
import { UserNotFoundError } from "../../errors"

describe("Get User By Email UseCase", () => {
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

    const sut = new GetUserByEmailUseCase(postgresGetUserByEmailRepositoryStub)

    return {
      sut,
      postgresGetUserByEmailRepositoryStub,
    }
  }

  it("should successfully get a user by email", async () => {
    const { sut } = makeSut()

    const result = await sut.execute(user.email)

    expect(result).not.toBeNull()
    expect(result).toEqual(user)
  })

  it("should throw UserNotFoundError if user is not found", async () => {
    const { sut, postgresGetUserByEmailRepositoryStub } = makeSut()

    vitest
      .spyOn(postgresGetUserByEmailRepositoryStub, "execute")
      .mockResolvedValueOnce(null)

    const result = sut.execute(user.email)

    await expect(result).rejects.toThrowError(new UserNotFoundError(user.email))
  })
})
