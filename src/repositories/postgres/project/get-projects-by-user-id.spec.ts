import { describe, it, expect, beforeEach } from "vitest"
import { prisma } from "../../../app"

import { PostgresGetProjectsByUserIdRepository } from "./get-projects-by-user-id"

import { faker } from "@faker-js/faker"

describe("Postgres Get Project By Id Repository", () => {
  const createUserParams = {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 8,
    }),
  }

  const createProjectParams = {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    imagesUrl: [faker.internet.url()],
    repositoryUrl: faker.internet.url(),
    projectUrl: faker.internet.url(),
    technologies: [faker.lorem.word()],
    userId: createUserParams.id,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  }

  const makeSut = () => {
    const sut = new PostgresGetProjectsByUserIdRepository()

    return {
      sut,
    }
  }

  it("should get projects by user id on database", async () => {
    const { sut } = makeSut()
    await prisma.user.create({
      data: createUserParams,
    })

    await prisma.projects.create({
      data: createProjectParams,
    })

    const result = await sut.execute(createProjectParams.userId)

    expect(result).not.toBeUndefined()
    expect(result[0].name).toBe(createProjectParams.name)
    expect(result[0].description).toBe(createProjectParams.description)
    expect(result[0].imagesUrl).toStrictEqual(createProjectParams.imagesUrl)
    expect(result[0].repositoryUrl).toBe(createProjectParams.repositoryUrl)
    expect(result[0].projectUrl).toBe(createProjectParams.projectUrl)
    expect(result[0].technologies).toStrictEqual(
      createProjectParams.technologies,
    )
    expect(result[0].userId).toBe(createProjectParams.userId)
  })
})
