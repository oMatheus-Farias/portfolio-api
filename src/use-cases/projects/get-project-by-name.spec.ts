import { describe, it, expect, vitest } from "vitest"

import { GetProjectByNameUseCase } from "./get-project-by-name"

import { faker } from "@faker-js/faker"

describe("Get Project By Name UseCase", () => {
  const project = {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    description: faker.lorem.paragraph(),
    imagesUrl: [faker.internet.url()],
    repositoryUrl: faker.internet.url(),
    projectUrl: faker.internet.url(),
    technologies: [faker.lorem.word()],
    userId: faker.string.uuid(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  }

  class PostgresGetProjectByNameRepositoryStub {
    async execute() {
      return project
    }
  }

  const makeSut = () => {
    const postgresGetProjectByNameRepositoryStub =
      new PostgresGetProjectByNameRepositoryStub()

    const sut = new GetProjectByNameUseCase(
      postgresGetProjectByNameRepositoryStub,
    )

    return {
      sut,
      postgresGetProjectByNameRepositoryStub,
    }
  }

  it("should successfully get a project by name", async () => {
    const { sut } = makeSut()

    const result = await sut.execute(project.name)

    expect(result).not.toBeNull()
    expect(result).toEqual(project)
  })
})
