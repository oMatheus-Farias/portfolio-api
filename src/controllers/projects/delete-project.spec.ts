import { describe, it, expect, vitest } from "vitest"

import { DeleteProjectController } from "./delete-project"
import { DeleteProjectUseCase } from "../../use-cases/projects/delete-project"

import { faker } from "@faker-js/faker"

describe("Delete Project Controller", () => {
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

  class PostgresDeleteProjectRepositoryStub {
    async execute() {
      return project
    }
  }

  class PostgresGetProjectByIdRepositoryStub {
    async execute() {
      return project
    }
  }

  const makeSut = () => {
    const postgresDeleteProjectRepositoryStub =
      new PostgresDeleteProjectRepositoryStub()
    const postgresGetProjectByIdRepositoryStub =
      new PostgresGetProjectByIdRepositoryStub()

    const deleteProjectUseCase = new DeleteProjectUseCase(
      postgresDeleteProjectRepositoryStub,
      postgresGetProjectByIdRepositoryStub,
    )

    const sut = new DeleteProjectController(deleteProjectUseCase)

    return {
      sut,
      postgresDeleteProjectRepositoryStub,
      postgresGetProjectByIdRepositoryStub,
    }
  }

  it("should return 200 if project is deleted", async () => {
    const { sut } = makeSut()

    const result = await sut.execute(project.id, project.userId)

    expect(result).toEqual({
      statusCode: 200,
      body: project,
    })
  })

  it("should return 404 if project ID is not valid", async () => {
    const { sut } = makeSut()

    const result = await sut.execute("invalid_id", project.userId)

    expect(result.statusCode).toBe(404)
  })

  it("should return 404 if user ID is not valid", async () => {
    const { sut } = makeSut()

    const result = await sut.execute(project.id, "invalid_id")

    expect(result.statusCode).toBe(404)
  })
})
