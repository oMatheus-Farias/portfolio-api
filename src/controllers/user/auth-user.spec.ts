import { describe, it, expect } from "vitest"

import { AuthUserController } from "./auth-user"
import { AuthUserUseCase } from "../../use-cases"

import { faker } from "@faker-js/faker"

describe("Auth User Controller", () => {
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

    const authUserUseCaseStub = new AuthUserUseCase(
      postgresGetUserByEmailRepositoryStub,
      passwordCompareAdapterStub,
      signTokenStub,
    )

    const sut = new AuthUserController(authUserUseCaseStub)

    return {
      sut,
      authUserUseCaseStub,
    }
  }

  it("should return 200 with auth user", async () => {
    const { sut } = makeSut()

    const response = await sut.execute(user.email, user.password)

    expect(response).toEqual({
      statusCode: 200,
      body: {
        ...user,
        password: undefined,
        token: expect.any(String),
      },
    })
  })
})
