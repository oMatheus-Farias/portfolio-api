import { describe, it, expect, vitest } from "vitest"

import { GetUserByIdUseCase } from "./get-user-by-id"

import { faker } from "@faker-js/faker"

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
})
