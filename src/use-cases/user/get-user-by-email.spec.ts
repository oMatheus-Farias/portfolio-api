import { describe, it, expect } from "vitest"

import { GetUserByEmailUseCase } from "./get-user-by-email"

import { faker } from "@faker-js/faker"

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
})
