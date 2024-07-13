import { describe, it, expect, beforeEach } from "vitest"
import { prisma } from "../../../app"

import { PostgresGetUserByIdRepository } from "./get-user-by-id"

import { faker } from "@faker-js/faker"

describe("Postgres Get User By Id Repository", () => {
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
    const sut = new PostgresGetUserByIdRepository()

    return {
      sut,
    }
  }

  it("should get user by id on database", async () => {
    const { sut } = makeSut()

    const user = await prisma.user.create({
      data: createUserParams,
    })

    const response = await sut.execute(user.id)

    expect(response).not.toBeUndefined()
    expect(response.firstName).toBe(user.firstName)
    expect(response.lastName).toBe(user.lastName)
    expect(response.email).toBe(user.email)
  })
})
