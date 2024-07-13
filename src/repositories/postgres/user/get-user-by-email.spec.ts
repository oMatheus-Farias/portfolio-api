import { describe, it, expect, beforeEach } from "vitest"
import { prisma } from "../../../app"

import { PostgresGetUserByEmailRepository } from "./get-user-by-email"

import { faker } from "@faker-js/faker"

describe("Postgres Get User By Email Repository", () => {
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
    const sut = new PostgresGetUserByEmailRepository()

    return {
      sut,
    }
  }

  it("should get user by email on database", async () => {
    const { sut } = makeSut()

    const user = await prisma.user.create({
      data: createUserParams,
    })

    const response = await sut.execute(user.email)

    expect(response).not.toBeUndefined()
    expect(response).toStrictEqual(user)
  })
})
