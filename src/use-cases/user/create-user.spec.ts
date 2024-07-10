import { describe, it, expect } from "vitest"

import { CreateUserUseCase } from "./create-user"

import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"

describe("Create User UseCase", () => {
  const user = {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  class PostgresCreateUserRepositoryStub {
    async execute(_user: any) {
      return _user
    }
  }

  class PostgresGetUserByEmailRepositoryStub {
    async execute() {
      return null
    }
  }

  class PasswordHasherAdapterStub {
    async execute(password: string) {
      return bcrypt.hash(password, 10)
    }
  }

  const makeSut = () => {
    const postgresCreateUserRepositoryStub =
      new PostgresCreateUserRepositoryStub()
    const postgresGetUserByEmailRepositoryStub =
      new PostgresGetUserByEmailRepositoryStub()
    const passwordHasherAdapterStub = new PasswordHasherAdapterStub()

    const sut = new CreateUserUseCase(
      postgresCreateUserRepositoryStub,
      postgresGetUserByEmailRepositoryStub,
      passwordHasherAdapterStub,
    )

    return {
      sut,
      postgresCreateUserRepositoryStub,
      postgresGetUserByEmailRepositoryStub,
      passwordHasherAdapterStub,
    }
  }

  it("should successfully create a user", () => {
    const { sut } = makeSut()

    const response = sut.execute({ params: user })

    expect(response).toBeTruthy()
  })
})
