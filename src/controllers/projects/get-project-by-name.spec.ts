import { describe, it, expect, vitest } from "vitest"

import { GetProjectByNameController } from "./get-project-by-name"
import { GetProjectByNameUseCase } from "../../use-cases/projects/get-project-by-name"

import { faker } from "@faker-js/faker"

describe("Get Project By Name Controller", () => {
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

    const getProjectByNameUseCase = new GetProjectByNameUseCase(
      postgresGetProjectByNameRepositoryStub,
    )

    const sut = new GetProjectByNameController(getProjectByNameUseCase)

    return {
      sut,
      postgresGetProjectByNameRepositoryStub,
    }
  }

  it("should return 200 if project is found", async () => {
    const { sut } = makeSut()

    const result = await sut.execute(project.name)

    expect(result).toEqual({
      statusCode: 200,
      body: project,
    })
  })

  it("should return 400 if project name missing", async () => {
    const { sut } = makeSut()

    const result = await sut.execute("")

    expect(result.statusCode).toBe(400)
  })

  it("should return 404 if project not found", async () => {
    const { sut, postgresGetProjectByNameRepositoryStub } = makeSut()

    vitest
      .spyOn(postgresGetProjectByNameRepositoryStub, "execute")
      .mockResolvedValueOnce(null)

    const result = await sut.execute(project.name)

    expect(result.statusCode).toBe(404)
  })

  it("should return 500 if any error occurs", async () => {
    const { sut, postgresGetProjectByNameRepositoryStub } = makeSut()

    vitest
      .spyOn(postgresGetProjectByNameRepositoryStub, "execute")
      .mockRejectedValueOnce(new Error())

    const result = await sut.execute(project.name)

    expect(result.statusCode).toBe(500)
  })
})
