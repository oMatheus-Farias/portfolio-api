import { describe, it, expect } from "vitest"

import { AuthUserUseCase } from "./auth-user"

import { faker } from "@faker-js/faker"

describe("Auth User UseCase", () => {
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

  class PasswordCompareAdapterStub {
    async execute() {
      return true
    }
  }

  class SignTokenStub {
    execute() {
      return faker.string.uuid()
    }
  }

  const makeSut = () => {
    const postgresGetUserByEmailRepositoryStub =
      new PostgresGetUserByEmailRepositoryStub()
    const passwordCompareAdapterStub = new PasswordCompareAdapterStub()
    const signTokenStub = new SignTokenStub()

    const sut = new AuthUserUseCase(
      postgresGetUserByEmailRepositoryStub,
      passwordCompareAdapterStub,
      signTokenStub,
    )

    return {
      sut,
      postgresGetUserByEmailRepositoryStub,
      passwordCompareAdapterStub,
      signTokenStub,
    }
  }

  it("should successfully authenticate a user", async () => {
    const { sut } = makeSut()

    const result = await sut.execute(user.email, user.password)

    expect(result).not.toBe(null)
  })
})
