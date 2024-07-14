import { describe, it, expect, beforeEach } from "vitest"
import { prisma } from "../../../app"

import { PostgresGetProjectByIdRepository } from "./get-project-by-id"

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
    const sut = new PostgresGetProjectByIdRepository()

    return {
      sut,
    }
  }

  it("should get project by id on database", async () => {
    const { sut } = makeSut()
    await prisma.user.create({
      data: createUserParams,
    })

    await prisma.projects.create({
      data: createProjectParams,
    })

    const result = await sut.execute(createProjectParams.id)

    expect(result).not.toBeUndefined()
    expect(result.name).toBe(createProjectParams.name)
    expect(result.description).toBe(createProjectParams.description)
    expect(result.imagesUrl).toStrictEqual(createProjectParams.imagesUrl)
    expect(result.repositoryUrl).toBe(createProjectParams.repositoryUrl)
    expect(result.projectUrl).toBe(createProjectParams.projectUrl)
    expect(result.technologies).toStrictEqual(createProjectParams.technologies)
    expect(result.userId).toBe(createProjectParams.userId)
  })
})
