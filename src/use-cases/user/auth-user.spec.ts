import { describe, it, expect, vitest } from "vitest"

import { AuthUserUseCase } from "./auth-user"

import { faker } from "@faker-js/faker"

import { UserNotFoundError } from "../../errors"

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

  it("should token is returned when user is authenticated", async () => {
    const { sut } = makeSut()

    const result = await sut.execute(user.email, user.password)

    const userAuth = {
      ...user,
      password: undefined,
      token: result.token,
    }

    expect(result).toEqual(userAuth)
    expect(result.token).not.toBe(null)
  })

  it("should throw UserNotFoundError if user is not found", async () => {
    const { sut, postgresGetUserByEmailRepositoryStub } = makeSut()

    vitest
      .spyOn(postgresGetUserByEmailRepositoryStub, "execute")
      .mockResolvedValueOnce(null)

    const result = sut.execute(user.email, user.password)

    await expect(result).rejects.toThrow(new UserNotFoundError(user.email))
  })

  it("should throw UserNotFoundError if password not match", async () => {
    const { sut, passwordCompareAdapterStub } = makeSut()

    vitest
      .spyOn(passwordCompareAdapterStub, "execute")
      .mockResolvedValueOnce(false)

    const result = sut.execute(user.email, user.password)

    await expect(result).rejects.toThrow(new UserNotFoundError())
  })
})
