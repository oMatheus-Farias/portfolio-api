import { describe, it, expect, beforeEach } from "vitest"
import { prisma } from "../../../app"

import { PostgresCreateUserRepository } from "./create-user"

import { faker } from "@faker-js/faker"

describe("Postgres Create User Repository", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  const createUserParams = {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 8,
    }),
  }

  const makeSut = () => {
    const sut = new PostgresCreateUserRepository()

    return {
      sut,
    }
  }

  it("should create a user on dstabase", async () => {
    const { sut } = makeSut()

    const user = await sut.execute({ params: createUserParams })

    expect(user).not.toBeUndefined()
    expect(user.firstName).toBe(createUserParams.firstName)
    expect(user.lastName).toBe(createUserParams.lastName)
    expect(user.email).toBe(createUserParams.email)
    expect(user.password).toBe(createUserParams.password)
  })
})
