import { describe, it, expect, beforeEach } from "vitest"
import { prisma } from "../../../app"

import { PostgresUpdateProjectRepository } from "./update-project"

import { faker } from "@faker-js/faker"

describe("Postgres Update Project Repository", () => {
  beforeEach(async () => {
    await prisma.projects.deleteMany()
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
    const sut = new PostgresUpdateProjectRepository()

    return {
      sut,
    }
  }

  it("should update project on database", async () => {
    const { sut } = makeSut()
    await prisma.user.create({
      data: createUserParams,
    })

    await prisma.projects.create({
      data: createProjectParams,
    })

    const updatedProject = {
      name: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      imagesUrl: [faker.internet.url()],
      repositoryUrl: faker.internet.url(),
      projectUrl: faker.internet.url(),
      technologies: [faker.lorem.word()],
    }

    const result = await sut.execute({
      userId: createProjectParams.userId,
      projectId: createProjectParams.id,
      updateParams: updatedProject,
    })

    expect(result).not.toBeUndefined()
    expect(result.name).toBe(updatedProject.name)
    expect(result.description).toBe(updatedProject.description)
    expect(result.imagesUrl).toStrictEqual(updatedProject.imagesUrl)
  })
})
