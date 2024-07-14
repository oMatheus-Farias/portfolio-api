import { describe, it, expect, vitest } from "vitest"

import { CreateUserController } from "./create-user"
import { CreateUserUseCase } from "../../use-cases"

import { faker } from "@faker-js/faker"
import { EmailAlreadyExistsError } from "../../errors"

describe("Create User Controller", () => {
  const user = {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  class PostgresCreateUserRepositoryStub {
    async execute() {
      return user
    }
  }

  class PostgresGetUserByEmailRepositoryStub {
    async execute() {
      return null
    }
  }

  class PasswordHasherAdapterStub {
    async execute() {
      return faker.string.uuid()
    }
  }

  const makeSut = () => {
    const postgresCreateUserRepositoryStub =
      new PostgresCreateUserRepositoryStub()
    const postgresGetUserByEmailRepositoryStub =
      new PostgresGetUserByEmailRepositoryStub()
    const passwordHasherAdapterStub = new PasswordHasherAdapterStub()

    const createUserUseCaseStub = new CreateUserUseCase(
      postgresCreateUserRepositoryStub,
      postgresGetUserByEmailRepositoryStub,
      passwordHasherAdapterStub,
    )

    const sut = new CreateUserController(createUserUseCaseStub)

    return {
      sut,
      createUserUseCaseStub,
    }
  }

  it("should return 201 with created user", async () => {
    const { sut } = makeSut()

    const response = await sut.execute({ httRequest: user })

    expect(response).toEqual({
      statusCode: 201,
      body: user,
    })
  })

  it("should return error 400 if missing fields", async () => {
    const { sut } = makeSut()

    const result = await sut.execute({
      httRequest: null,
    })

    expect(result.statusCode).toBe(400)
  })

  it("should return error 400 if email already exists", async () => {
    const { sut, createUserUseCaseStub } = makeSut()

    vitest
      .spyOn(createUserUseCaseStub, "execute")
      .mockRejectedValueOnce(new EmailAlreadyExistsError(user.email))

    const result = await sut.execute({
      httRequest: user,
    })

    expect(result.statusCode).toBe(400)
  })
})
